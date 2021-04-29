/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CDPSession } from './Connection.js';
import { Frame } from './FrameManager.js';
import { HTTPResponse } from './HTTPResponse.js';
import { assert } from './assert.js';
import { helper, debugError } from './helper.js';
import { Protocol } from 'devtools-protocol';

/**
 * @public
 */
export interface ContinueRequestOverrides {
  /**
   * If set, the request URL will change. This is not a redirect.
   */
  url?: string;
  method?: string;
  postData?: string;
  headers?: Record<string, string>;
}

/**
 * Required response data to fulfill a request with.
 *
 * @public
 */
export interface ResponseForRequest {
  status: number;
  /**
   * Optional response headers. All values are converted to strings.
   */
  headers: Record<string, unknown>;
  contentType: string;
  body: string | Buffer;
}

/**
 * Resource types for HTTPRequests as perceived by the rendering engine.
 *
 * @public
 */
export type ResourceType = Lowercase<Protocol.Network.ResourceType>;

/**
 *
 * Represents an HTTP request sent by a page.
 * @remarks
 *
 * Whenever the page sends a request, such as for a network resource, the
 * following events are emitted by Puppeteer's `page`:
 *
 * - `request`:  emitted when the request is issued by the page.
 * - `requestfinished` - emitted when the response body is downloaded and the
 *   request is complete.
 *
 * If request fails at some point, then instead of `requestfinished` event the
 * `requestfailed` event is emitted.
 *
 * All of these events provide an instance of `HTTPRequest` representing the
 * request that occurred:
 *
 * ```
 * page.on('request', request => ...)
 * ```
 *
 * NOTE: HTTP Error responses, such as 404 or 503, are still successful
 * responses from HTTP standpoint, so request will complete with
 * `requestfinished` event.
 *
 * If request gets a 'redirect' response, the request is successfully finished
 * with the `requestfinished` event, and a new request is issued to a
 * redirected url.
 *
 * @public
 */
export class HTTPRequest {
  /**
   * @internal
   */
  _requestId: string;
  /**
   * @internal
   */
  _interceptionId: string;
  /**
   * @internal
   */
  _failureText = null;
  /**
   * @internal
   */
  _response: HTTPResponse | null = null;
  /**
   * @internal
   */
  _fromMemoryCache = false;
  /**
   * @internal
   */
  _redirectChain: HTTPRequest[];

  private _client: CDPSession;
  private _isNavigationRequest: boolean;
  private _allowInterception: boolean;
  private _interceptionHandled = false;
  private _url: string;
  private _resourceType: ResourceType;

  private _method: string;
  private _postData?: string;
  private _headers: Record<string, string> = {};
  private _frame: Frame;
  private _continueRequestOverrides: ContinueRequestOverrides;
  private _responseForRequest: Partial<ResponseForRequest>;
  private _abortErrorReason: Protocol.Network.ErrorReason;
  private _continueRequested: boolean;
  private _continuePriority: number;
  private _actionCallbacks: Array<(result: ActionResult) => void>;
  private _respondRequested: boolean;
  private _respondPriority: number;
  private _abortRequested: boolean;
  private _abortPriority: number;
  private _pendingInterceptActions: Array<() => void | PromiseLike<any>>;

  /**
   * @internal
   */
  constructor(
    client: CDPSession,
    frame: Frame,
    interceptionId: string,
    allowInterception: boolean,
    event: Protocol.Network.RequestWillBeSentEvent,
    redirectChain: HTTPRequest[]
  ) {
    this._client = client;
    this._requestId = event.requestId;
    this._isNavigationRequest =
      event.requestId === event.loaderId && event.type === 'Document';
    this._interceptionId = interceptionId;
    this._allowInterception = allowInterception;
    this._url = event.request.url;
    this._resourceType = event.type.toLowerCase() as ResourceType;
    this._method = event.request.method;
    this._postData = event.request.postData;
    this._frame = frame;
    this._redirectChain = redirectChain;
    this._continueRequestOverrides = {};
    this._continueRequested = false;
    this._continuePriority = 10;
    this._respondRequested = false;
    this._respondPriority = 10;
    this._abortRequested = false;
    this._abortPriority = 10;
    this._actionCallbacks = [];
    this._pendingInterceptActions = [];

    for (const key of Object.keys(event.request.headers))
      this._headers[key.toLowerCase()] = event.request.headers[key];
  }

  /**
   * @returns the URL of the request
   */
  url(): string {
    return this._url;
  }

  /**
   * @remarks
   * Available only in Cooperative Intercept Mode.
   *
   * @returns the `ContinueRequestOverrides` that will be used
   * if the interception is allowed to continue (ie, `abort()` and
   * `respond()` aren't called).
   */
  continueRequestOverrides(): ContinueRequestOverrides {
    return this._continueRequestOverrides;
  }

  /**
   * @remarks
   * Available only in Cooperative Intercept Mode.
   *
   * @returns the `ResponseForRequest` that will be used
   * if the interception is allowed to respond (ie, `abort()` is not
   * called).
   */
  responseForRequest(): Partial<ResponseForRequest> {
    return this._responseForRequest;
  }

  /**
   * @remarks
   * Available only in Cooperative Intercept Mode.
   *
   * @returns the most recent reason for aborting the request
   */
  abortErrorReason(): Protocol.Network.ErrorReason {
    return this._abortErrorReason;
  }

  /**
   * @returns `true` if `continue()` has been called at least once.
   */
  shouldContinue(): boolean {
    if (this._interceptionHandled) return false;
    if (!this._continueRequested) return false;
    if (this._abortRequested && this._abortPriority <= this._continuePriority)
      return false;
    if (
      this._respondRequested &&
      this._respondPriority <= this._continuePriority
    )
      return false;
    return true;
  }

  /**
   * @returns `true` if `respond()` has been called at least once.
   */
  shouldRespond(): boolean {
    if (this._interceptionHandled) return false;
    if (!this._respondRequested) return false;
    if (
      this._continueRequested &&
      this._continuePriority < this._respondPriority
    )
      return false;
    if (this._abortRequested && this._abortPriority <= this._respondPriority)
      return false;
    return true;
  }

  /**
   * @returns `true` if `abort()` has been called at least once.
   */
  shouldAbort(): boolean {
    if (this._interceptionHandled) return false;
    if (!this._abortRequested) return false;
    if (this._respondRequested && this._respondPriority < this._abortPriority)
      return false;
    if (this._continueRequested && this._continuePriority < this._abortPriority)
      return false;
    return true;
  }

  /**
   * @remarks
   * Available only in Cooperative Intercept Mode.

   * Adds an async request handler to the processing queue.
   * Deferred handlers are not guaranteed to execute in any particular order,
   * but they are guarnateed to resolve before the request interception
   * is finalized.
   */
  enqueueInterceptAction(pendingHandler: () => void | PromiseLike<any>): void {
    this._pendingInterceptActions.push(pendingHandler);
  }

  /**
   * @remarks
   * Available only in Cooperative Intercept Mode.

   * Awaits pending interception handlers and then decides how to fulfill
   * the request interception.
   */
  async finalizeInterceptions(): Promise<void> {
    await this._pendingInterceptActions.reduce(
      (p, x) =>
        p.then(x).catch((error) => {
          // This is here so cooperative handlers that fail do not stop other handlers
          // from running
          console.error(error);
          debugError(error);
        }),
      Promise.resolve()
    );
    if (this.shouldAbort()) {
      await this._abort(this._abortErrorReason);
      this._actionCallbacks.forEach((resolve) => resolve('abort'));
    }
    if (this.shouldRespond()) {
      await this._respond(this._responseForRequest);
      this._actionCallbacks.forEach((resolve) => resolve('respond'));
    }
    if (this.shouldContinue()) {
      await this._continue(this._continueRequestOverrides);
      this._actionCallbacks.forEach((resolve) => resolve('continue'));
    }
  }

  /**
   * Contains the request's resource type as it was perceived by the rendering
   * engine.
   */
  resourceType(): ResourceType {
    return this._resourceType;
  }

  /**
   * @returns the method used (`GET`, `POST`, etc.)
   */
  method(): string {
    return this._method;
  }

  /**
   * @returns the request's post body, if any.
   */
  postData(): string | undefined {
    return this._postData;
  }

  /**
   * @returns an object with HTTP headers associated with the request. All
   * header names are lower-case.
   */
  headers(): Record<string, string> {
    return this._headers;
  }

  /**
   * @returns the response for this request, if a response has been received.
   */
  response(): HTTPResponse | null {
    return this._response;
  }

  /**
   * @returns the frame that initiated the request.
   */
  frame(): Frame | null {
    return this._frame;
  }

  /**
   * @returns true if the request is the driver of the current frame's navigation.
   */
  isNavigationRequest(): boolean {
    return this._isNavigationRequest;
  }

  /**
   * @remarks
   *
   * `redirectChain` is shared between all the requests of the same chain.
   *
   * For example, if the website `http://example.com` has a single redirect to
   * `https://example.com`, then the chain will contain one request:
   *
   * ```js
   * const response = await page.goto('http://example.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 1
   * console.log(chain[0].url()); // 'http://example.com'
   * ```
   *
   * If the website `https://google.com` has no redirects, then the chain will be empty:
   *
   * ```js
   * const response = await page.goto('https://google.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 0
   * ```
   *
   * @returns the chain of requests - if a server responds with at least a
   * single redirect, this chain will contain all requests that were redirected.
   */
  redirectChain(): HTTPRequest[] {
    return this._redirectChain.slice();
  }

  /**
   * Access information about the request's failure.
   *
   * @remarks
   *
   * @example
   *
   * Example of logging all failed requests:
   *
   * ```js
   * page.on('requestfailed', request => {
   *   console.log(request.url() + ' ' + request.failure().errorText);
   * });
   * ```
   *
   * @returns `null` unless the request failed. If the request fails this can
   * return an object with `errorText` containing a human-readable error
   * message, e.g. `net::ERR_FAILED`. It is not guaranteeded that there will be
   * failure text if the request fails.
   */
  failure(): { errorText: string } | null {
    if (!this._failureText) return null;
    return {
      errorText: this._failureText,
    };
  }

  /**
   * Requests to continue the request with optional request overrides.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled or
   * interception has already been handled.
   *
   * @example
   * ```js
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   // Override headers
   *   const headers = Object.assign({}, request.headers(), {
   *     foo: 'bar', // set "foo" header
   *     origin: undefined, // remove "origin" header
   *   });
   *   request.requestContinue({
   *    ...request.continueRequestOverrides(),
   *    headers
   *   });
   * });
   * ```
   *
   * @param overrides - optional overrides to apply to the request.
   */
  async requestContinue(
    overrides: ContinueRequestOverrides = {},
    priority = 10
  ): Promise<ActionResult> {
    // Request interception is not supported for data: urls.
    if (this._url.startsWith('data:')) return;
    assert(this._allowInterception, 'Request Interception is not enabled!');
    assert(!this._interceptionHandled, 'Request is already handled!');
    this._continueRequestOverrides = overrides;
    this._continueRequested = true;
    this._continuePriority = Math.min(this._continuePriority, priority);
    return new Promise<ActionResult>((resolve) => {
      this._actionCallbacks.push(resolve);
    });
  }

  /**
   * Continues request with optional request overrides.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   *
   * @example
   * ```js
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   // Override headers
   *   const headers = Object.assign({}, request.headers(), {
   *     foo: 'bar', // set "foo" header
   *     origin: undefined, // remove "origin" header
   *   });
   *   request.continue({headers});
   * });
   * ```
   *
   * @param overrides - optional overrides to apply to the request.
   */
  async continue(overrides: ContinueRequestOverrides = {}): Promise<void> {
    // Request interception is not supported for data: urls.
    if (this._url.startsWith('data:')) return;
    assert(this._allowInterception, 'Request Interception is not enabled!');
    return this._continue(overrides);
  }

  private async _continue(
    overrides: ContinueRequestOverrides = {}
  ): Promise<void> {
    assert(!this._interceptionHandled, 'Request is already handled!');
    const { url, method, postData, headers } = overrides;
    this._interceptionHandled = true;

    const postDataBinaryBase64 = postData
      ? Buffer.from(postData).toString('base64')
      : undefined;

    await this._client
      .send('Fetch.continueRequest', {
        requestId: this._interceptionId,
        url,
        method,
        postData: postDataBinaryBase64,
        headers: headers ? headersArray(headers) : undefined,
      })
      .catch((error) => {
        // In certain cases, protocol will return error if the request was
        // already canceled or the page was closed. We should tolerate these
        // errors.
        debugError(error);
      });
  }

  /**
   * Requests to fulfill a request with the given response.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled
   * or the interception has already been handled.
   *
   * @example
   * An example of fulfilling all requests with 404 responses:
   * ```js
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   request.requestRespond({
   *     ...request.responseForRequest(),
   *     status: 404,
   *     contentType: 'text/plain',
   *     body: 'Not Found!'
   *   });
   * });
   * ```
   *
   * NOTE: Mocking responses for dataURL requests is not supported.
   * Calling `request.respond` for a dataURL request is a noop.
   *
   * @param response - the response to fulfill the request with.
   */
  async requestRespond(
    response: Partial<ResponseForRequest>,
    priority = 10
  ): Promise<ActionResult> {
    // Mocking responses for dataURL requests is not currently supported.
    if (this._url.startsWith('data:')) return;
    assert(this._allowInterception, 'Request Interception is not enabled!');
    assert(!this._interceptionHandled, 'Request is already handled!');
    this._responseForRequest = response;
    this._respondRequested = true;
    this._respondPriority = Math.min(this._respondPriority, priority);
    return new Promise<ActionResult>((resolve) => {
      this._actionCallbacks.push(resolve);
    });
  }

  /**
   * Fulfills a request with the given response.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   *
   * @example
   * An example of fulfilling all requests with 404 responses:
   * ```js
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   request.respond({
   *     status: 404,
   *     contentType: 'text/plain',
   *     body: 'Not Found!'
   *   });
   * });
   * ```
   *
   * NOTE: Mocking responses for dataURL requests is not supported.
   * Calling `request.respond` for a dataURL request is a noop.
   *
   * @param response - the response to fulfill the request with.
   */
  async respond(response: Partial<ResponseForRequest>): Promise<void> {
    // Mocking responses for dataURL requests is not currently supported.
    if (this._url.startsWith('data:')) return;
    assert(this._allowInterception, 'Request Interception is not enabled!');
    return this._respond(response);
  }

  private async _respond(response: Partial<ResponseForRequest>): Promise<void> {
    assert(!this._interceptionHandled, 'Request is already handled!');
    this._interceptionHandled = true;
    const responseBody: Buffer | null =
      response.body && helper.isString(response.body)
        ? Buffer.from(response.body)
        : (response.body as Buffer) || null;

    const responseHeaders: Record<string, string> = {};
    if (response.headers) {
      for (const header of Object.keys(response.headers))
        responseHeaders[header.toLowerCase()] = String(
          response.headers[header]
        );
    }
    if (response.contentType)
      responseHeaders['content-type'] = response.contentType;
    if (responseBody && !('content-length' in responseHeaders))
      responseHeaders['content-length'] = String(
        Buffer.byteLength(responseBody)
      );

    await this._client
      .send('Fetch.fulfillRequest', {
        requestId: this._interceptionId,
        responseCode: response.status || 200,
        responsePhrase: STATUS_TEXTS[response.status || 200],
        responseHeaders: headersArray(responseHeaders),
        body: responseBody ? responseBody.toString('base64') : undefined,
      })
      .catch((error) => {
        // In certain cases, protocol will return error if the request was
        // already canceled or the page was closed. We should tolerate these
        // errors.
        debugError(error);
      });
  }

  /**
   * Requests to abort a request.
   *
   * @remarks
   * To use this, request interception should be enabled with
   * {@link Page.setRequestInterception}. If it is not enabled, this method will
   * throw an exception immediately.
   *
   * An exception will also be thrown if the intercept has already been handled.
   *
   * @param errorCode - optional error code to provide.
   */
  async requestAbort(
    errorCode: ErrorCode = 'failed',
    priority = 10
  ): Promise<ActionResult> {
    // Request interception is not supported for data: urls.
    if (this._url.startsWith('data:')) return;
    const errorReason = errorReasons[errorCode];
    this._abortErrorReason = errorReason;
    assert(this._abortErrorReason, 'Unknown error code: ' + errorCode);
    assert(this._allowInterception, 'Request Interception is not enabled!');
    assert(!this._interceptionHandled, 'Request is already handled!');
    this._abortRequested = true;
    this._abortPriority = Math.min(this._abortPriority, priority);
    return new Promise<ActionResult>((resolve) => {
      this._actionCallbacks.push(resolve);
    });
  }

  /**
   * Aborts a request.
   *
   * @remarks
   * To use this, request interception should be enabled with
   * {@link Page.setRequestInterception}. If it is not enabled, this method will
   * throw an exception immediately.
   *
   * @param errorCode - optional error code to provide.
   */
  async abort(errorCode: ErrorCode = 'failed'): Promise<void> {
    // Request interception is not supported for data: urls.
    if (this._url.startsWith('data:')) return;
    const errorReason = errorReasons[errorCode];
    assert(errorReason, 'Unknown error code: ' + errorCode);
    assert(this._allowInterception, 'Request Interception is not enabled!');
    return this._abort(errorReason);
  }

  private async _abort(
    errorReason: Protocol.Network.ErrorReason
  ): Promise<void> {
    assert(!this._interceptionHandled, 'Request is already handled!');
    this._interceptionHandled = true;
    await this._client
      .send('Fetch.failRequest', {
        requestId: this._interceptionId,
        errorReason,
      })
      .catch((error) => {
        // In certain cases, protocol will return error if the request was
        // already canceled or the page was closed. We should tolerate these
        // errors.
        debugError(error);
      });
  }
}

/**
 * @public
 */
export type ErrorCode =
  | 'aborted'
  | 'accessdenied'
  | 'addressunreachable'
  | 'blockedbyclient'
  | 'blockedbyresponse'
  | 'connectionaborted'
  | 'connectionclosed'
  | 'connectionfailed'
  | 'connectionrefused'
  | 'connectionreset'
  | 'internetdisconnected'
  | 'namenotresolved'
  | 'timedout'
  | 'failed';

const errorReasons: Record<ErrorCode, Protocol.Network.ErrorReason> = {
  aborted: 'Aborted',
  accessdenied: 'AccessDenied',
  addressunreachable: 'AddressUnreachable',
  blockedbyclient: 'BlockedByClient',
  blockedbyresponse: 'BlockedByResponse',
  connectionaborted: 'ConnectionAborted',
  connectionclosed: 'ConnectionClosed',
  connectionfailed: 'ConnectionFailed',
  connectionrefused: 'ConnectionRefused',
  connectionreset: 'ConnectionReset',
  internetdisconnected: 'InternetDisconnected',
  namenotresolved: 'NameNotResolved',
  timedout: 'TimedOut',
  failed: 'Failed',
} as const;

export type ActionResult = 'continue' | 'abort' | 'respond';

function headersArray(
  headers: Record<string, string>
): Array<{ name: string; value: string }> {
  const result = [];
  for (const name in headers) {
    if (!Object.is(headers[name], undefined))
      result.push({ name, value: headers[name] + '' });
  }
  return result;
}

// List taken from
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
// with extra 306 and 418 codes.
const STATUS_TEXTS = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '103': 'Early Hints',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '306': 'Switch Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': "I'm a teapot",
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Too Early',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '510': 'Not Extended',
  '511': 'Network Authentication Required',
} as const;
