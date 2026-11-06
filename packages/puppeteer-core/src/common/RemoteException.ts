/**
 * @license
 * Copyright 2026 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import type {Protocol} from 'devtools-protocol';

import type {JSHandle} from '../api/JSHandle.js';

/**
 * A single location in the JavaScript stack.
 *
 * @remarks
 * Line and column numbers are 0-based and refer to the raw (possibly
 * minified) script coordinates as reported by the browser.
 *
 * @public
 */
export interface CallFrame {
  url?: string;
  /**
   * 0-based line number.
   */
  lineNumber?: number;
  /**
   * 0-based column number.
   */
  columnNumber?: number;
  functionName?: string;
}

/**
 * @internal
 */
export interface RemoteExceptionOptions {
  text: string;
  name: string | null;
  stackTrace: CallFrame[];
  location?: CallFrame;
  handle?: JSHandle;
  rawExceptionDetails?: Protocol.Runtime.ExceptionDetails;
}

/**
 * A protocol-agnostic description of an uncaught exception thrown in a page
 * or worker. Dispatched via the `exception` event on {@link Page} and
 * {@link WebWorker}.
 *
 * @remarks
 * Unlike the deprecated `pageerror` event, `RemoteException` does not
 * reconstruct a Node.js `Error`. When the protocol supports it (CDP), it
 * exposes the live remote exception value through {@link RemoteException.handle}.
 *
 * @example
 *
 * ```ts
 * page.on('exception', exception => {
 *   console.log(exception.name(), exception.text());
 *   console.log(exception.location());
 * });
 * ```
 *
 * @public
 */
export class RemoteException {
  #text: string;
  #name: string | null;
  #stackTrace: CallFrame[];
  #location: CallFrame;
  #handle?: JSHandle;
  #rawExceptionDetails?: Protocol.Runtime.ExceptionDetails;

  /**
   * @internal
   */
  constructor(options: RemoteExceptionOptions) {
    this.#text = options.text;
    this.#name = options.name;
    this.#stackTrace = options.stackTrace;
    this.#location = options.stackTrace[0] ?? options.location ?? {};
    this.#handle = options.handle;
    this.#rawExceptionDetails = options.rawExceptionDetails;
  }

  /**
   * The text of the exception as reported by the browser, for example
   * `TypeError: x is undefined`.
   */
  text(): string {
    return this.#text;
  }

  /**
   * The name of the exception, for example `Error`, `TypeError` or
   * `SyntaxError`.
   *
   * @remarks
   * Empty string if the thrown value is a primitive rather than an object.
   *
   * Always `null` with WebDriver BiDi, which does not report the name of the
   * exception.
   */
  name(): string | null {
    return this.#name;
  }

  /**
   * The call frames on the stack at the time the exception was thrown,
   * innermost first.
   *
   * @remarks
   * Empty for compilation and syntax errors.
   */
  stackTrace(): CallFrame[] {
    return this.#stackTrace;
  }

  /**
   * The primary location where the exception occurred.
   *
   * @remarks
   * For runtime errors this is `stackTrace()[0]`. For compilation and syntax
   * errors (where `stackTrace()` is empty), it falls back to the top-level
   * coordinates reported for the exception.
   */
  location(): CallFrame {
    return this.#location;
  }

  /**
   * The live remote exception value, if available.
   *
   * @remarks
   * Only available with CDP and only when the thrown value is an object. It
   * is `undefined` for thrown primitives and always `undefined` with
   * WebDriver BiDi.
   *
   * It is also `undefined` for exceptions thrown by code that Puppeteer
   * injected, for example from a callback scheduled inside
   * {@link Page.evaluate}, because the browser does not report a remote
   * exception object for them.
   *
   * The handle is **disposed automatically right after the `exception` event
   * has been dispatched** so that the browser can release the exception. To
   * keep using it beyond the synchronous part of your listener, call
   * {@link JSHandle.move} synchronously inside the listener and dispose of
   * the handle yourself once you are done with it:
   *
   * ```ts
   * page.on('exception', async exception => {
   *   // Must be called before the first `await`.
   *   const handle = exception.handle()?.move();
   *   if (!handle) {
   *     return;
   *   }
   *   try {
   *     const code = await handle.evaluate(error => {
   *       return (error as {code?: string}).code;
   *     });
   *     console.log(code);
   *   } finally {
   *     await handle.dispose();
   *   }
   * });
   * ```
   *
   * Using the handle after an `await` without calling `move()` first will
   * throw because the handle has already been disposed.
   */
  handle(): JSHandle | undefined {
    return this.#handle;
  }

  /**
   * The raw CDP exception details. `undefined` with WebDriver BiDi.
   *
   * @internal
   */
  _rawExceptionDetails(): Protocol.Runtime.ExceptionDetails | undefined {
    return this.#rawExceptionDetails;
  }
}
