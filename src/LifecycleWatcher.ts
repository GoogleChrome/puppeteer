/**
 * Copyright 2019 Google Inc. All rights reserved.
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

import {helper, assert} from './helper';
import {Events} from './Events';
import {TimeoutError} from './Errors';

class LifecycleWatcher {
  _frameManager: FrameManager
  _frame: Frame
  _timeout: number
  /**
   * @param {!Puppeteer.FrameManager} frameManager
   * @param {!Puppeteer.Frame} frame
   * @param {string|!Array<string>} waitUntil
   * @param {number} timeout
   */
  constructor(frameManager: FrameManager, frame: Frame, waitUntil: string|Array<string>, timeout: number) {
    if (Array.isArray(waitUntil))
      waitUntil = waitUntil.slice();
    else if (typeof waitUntil === 'string')
      waitUntil = [waitUntil];
    this._expectedLifecycle = waitUntil.map(value => {
      const protocolEvent = puppeteerToProtocolLifecycle.get(value);
      assert(protocolEvent, 'Unknown value for options.waitUntil: ' + value);
      return protocolEvent;
    });

    this._frameManager = frameManager;
    this._frame = frame;
    this._initialLoaderId = frame._loaderId;
    this._timeout = timeout;
    /** @type {?Puppeteer.Request} */
    this._navigationRequest = null;
    this._eventListeners = [
      helper.addEventListener(frameManager._client, Events.CDPSession.Disconnected, () => this._terminate(new Error('Navigation failed because browser has disconnected!'))),
      helper.addEventListener(this._frameManager, Events.FrameManager.LifecycleEvent, this._checkLifecycleComplete.bind(this)),
      helper.addEventListener(this._frameManager, Events.FrameManager.FrameNavigatedWithinDocument, this._navigatedWithinDocument.bind(this)),
      helper.addEventListener(this._frameManager, Events.FrameManager.FrameDetached, this._onFrameDetached.bind(this)),
      helper.addEventListener(this._frameManager.networkManager(), Events.NetworkManager.Request, this._onRequest.bind(this)),
    ];

    this._sameDocumentNavigationPromise = new Promise(fulfill => {
      this._sameDocumentNavigationCompleteCallback = fulfill;
    });

    this._lifecyclePromise = new Promise(fulfill => {
      this._lifecycleCallback = fulfill;
    });

    this._newDocumentNavigationPromise = new Promise(fulfill => {
      this._newDocumentNavigationCompleteCallback = fulfill;
    });

    this._timeoutPromise = this._createTimeoutPromise();
    this._terminationPromise = new Promise(fulfill => {
      this._terminationCallback = fulfill;
    });
    this._checkLifecycleComplete();
  }

  /**
   * @param {!Puppeteer.Request} request
   */
  _onRequest(request: Request) {
    if (request.frame() !== this._frame || !request.isNavigationRequest())
      return;
    this._navigationRequest = request;
  }

  /**
   * @param {!Puppeteer.Frame} frame
   */
  _onFrameDetached(frame: Frame) {
    if (this._frame === frame) {
      this._terminationCallback.call(null, new Error('Navigating frame was detached'));
      return;
    }
    this._checkLifecycleComplete();
  }

  /**
   * @return {?Puppeteer.Response}
   */
  navigationResponse(): Response | undefined {
    return this._navigationRequest ? this._navigationRequest.response() : null;
  }

  /**
   * @param {!Error} error
   */
  _terminate(error: Error) {
    this._terminationCallback.call(null, error);
  }

  /**
   * @return {!Promise<?Error>}
   */
  sameDocumentNavigationPromise(): Promise<?Error> {
    return this._sameDocumentNavigationPromise;
  }

  /**
   * @return {!Promise<?Error>}
   */
  newDocumentNavigationPromise(): Promise<?Error> {
    return this._newDocumentNavigationPromise;
  }

  /**
   * @return {!Promise}
   */
  lifecyclePromise(): Promise<void> {
    return this._lifecyclePromise;
  }

  /**
   * @return {!Promise<?Error>}
   */
  timeoutOrTerminationPromise(): Promise<?Error> {
    return Promise.race([this._timeoutPromise, this._terminationPromise]);
  }

  /**
   * @return {!Promise<?Error>}
   */
  _createTimeoutPromise(): Promise<?Error> {
    if (!this._timeout)
      return new Promise(() => {});
    const errorMessage = 'Navigation timeout of ' + this._timeout + ' ms exceeded';
    return new Promise(fulfill => this._maximumTimer = setTimeout(fulfill, this._timeout))
        .then(() => new TimeoutError(errorMessage));
  }

  /**
   * @param {!Puppeteer.Frame} frame
   */
  _navigatedWithinDocument(frame: Frame) {
    if (frame !== this._frame)
      return;
    this._hasSameDocumentNavigation = true;
    this._checkLifecycleComplete();
  }

  _checkLifecycleComplete() {
    // We expect navigation to commit.
    if (!checkLifecycle(this._frame, this._expectedLifecycle))
      return;
    this._lifecycleCallback();
    if (this._frame._loaderId === this._initialLoaderId && !this._hasSameDocumentNavigation)
      return;
    if (this._hasSameDocumentNavigation)
      this._sameDocumentNavigationCompleteCallback();
    if (this._frame._loaderId !== this._initialLoaderId)
      this._newDocumentNavigationCompleteCallback();

    /**
     * @param {!Puppeteer.Frame} frame
     * @param {!Array<string>} expectedLifecycle
     * @return {boolean}
     */
    function checkLifecycle(frame: Frame, expectedLifecycle: Array<string>): boolean {
      for (const event of expectedLifecycle) {
        if (!frame._lifecycleEvents.has(event))
          return false;
      }
      for (const child of frame.childFrames()) {
        if (!checkLifecycle(child, expectedLifecycle))
          return false;
      }
      return true;
    }
  }

  dispose() {
    helper.removeEventListeners(this._eventListeners);
    clearTimeout(this._maximumTimer);
  }
}

const puppeteerToProtocolLifecycle = new Map([
  ['load', 'load'],
  ['domcontentloaded', 'DOMContentLoaded'],
  ['networkidle0', 'networkIdle'],
  ['networkidle2', 'networkAlmostIdle'],
]);

export {LifecycleWatcher};
