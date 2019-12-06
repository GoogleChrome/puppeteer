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

import { Events } from './Events';
import { Page } from './Page';
import { Worker } from './Worker';
import { BrowserContext, Browser } from './Browser';
import { CDPSession } from './Connection';
import { Viewport } from './types';
import { TaskQueue } from './TaskQueue';
import { Protocol } from './protocol';

export class Target {
  _targetInfo: Protocol.Target.TargetInfo
  _targetId: string
  _browserContext: BrowserContext
  _sessionFactory: () => Promise<CDPSession>
  _ignoreHTTPSErrors: boolean
  _defaultViewport?: Viewport | null
  _screenshotTaskQueue: TaskQueue
  _pagePromise: Promise<Page> | null = null;
  _workerPromise: Promise<Worker> | null = null;
  _initializedPromise: Promise<Worker | boolean>
  _initializedCallback!: (value: Worker | PromiseLike<Worker> | boolean) => void
  _isClosedPromise: Promise<void>
  _closedCallback!: () => void
  _isInitialized: boolean;

  constructor(targetInfo: Protocol.Target.TargetInfo, browserContext: BrowserContext, sessionFactory: () => Promise<CDPSession>, ignoreHTTPSErrors: boolean, defaultViewport: Viewport | undefined | null, screenshotTaskQueue: TaskQueue) {
    this._targetInfo = targetInfo;
    this._browserContext = browserContext;
    this._targetId = targetInfo.targetId;
    this._sessionFactory = sessionFactory;
    this._ignoreHTTPSErrors = ignoreHTTPSErrors;
    this._defaultViewport = defaultViewport;
    this._screenshotTaskQueue = screenshotTaskQueue;

    this._initializedPromise = new Promise(fulfill => this._initializedCallback = fulfill).then(async success => {
      if (!success)
        return false;
      const opener = this.opener();
      if (!opener || !opener._pagePromise || this.type() !== 'page')
        return true;
      const openerPage = await opener._pagePromise;
      if (!openerPage.listenerCount(Events.Page.Popup))
        return true;
      const popupPage = await this.page();
      openerPage.emit(Events.Page.Popup, popupPage);
      return true;
    });
    this._isClosedPromise = new Promise(fulfill => this._closedCallback = fulfill);
    this._isInitialized = this._targetInfo.type !== 'page' || this._targetInfo.url !== '';
    if (this._isInitialized)
      this._initializedCallback(true);
  }

  createCDPSession(): Promise<CDPSession> {
    return this._sessionFactory();
  }

  async page(): Promise<Page> {
    if ((this._targetInfo.type === 'page' || this._targetInfo.type === 'background_page') && !this._pagePromise) {
      this._pagePromise = this._sessionFactory()
          .then(client => Page.create(client, this, this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue));
    }
    return this._pagePromise!;
  }

  async worker(): Promise<Worker | null> {
    if (this._targetInfo.type !== 'service_worker' && this._targetInfo.type !== 'shared_worker')
      return null;
    if (!this._workerPromise) {
      // TODO(einbinder): Make workers send their console logs.
      this._workerPromise = this._sessionFactory()
          .then(client => new Worker(client, this._targetInfo.url, () => {} /* consoleAPICalled */, () => {} /* exceptionThrown */));
    }
    return this._workerPromise;
  }

  url(): string {
    return this._targetInfo.url;
  }

  type(): "page"|"background_page"|"service_worker"|"shared_worker"|"other"|"browser" {
    const type = this._targetInfo.type;
    if (type === 'page' || type === 'background_page' || type === 'service_worker' || type === 'shared_worker' || type === 'browser')
      return type;
    return 'other';
  }

  browser(): Browser {
    return this._browserContext.browser();
  }

  browserContext(): BrowserContext {
    return this._browserContext;
  }

  opener(): Target | null {
    const { openerId } = this._targetInfo;
    if (!openerId)
      return null;
    return this.browser()._targets.get(openerId) || null;
  }

  /*@internal*/
  public _targetInfoChanged(targetInfo: Protocol.Target.TargetInfo) {
    this._targetInfo = targetInfo;

    if (!this._isInitialized && (this._targetInfo.type !== 'page' || this._targetInfo.url !== '')) {
      this._isInitialized = true;
      this._initializedCallback(true);
      return;
    }
  }
}
