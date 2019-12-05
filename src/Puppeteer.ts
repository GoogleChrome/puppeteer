/**
 * Copyright 2017 Google Inc. All rights reserved.
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
import Launcher from './Launcher';
import BrowserFetcher from './BrowserFetcher';
import Errors from './Errors';
import DeviceDescriptors from './DeviceDescriptors';

export default class {
  _projectRoot: string
  _preferredRevision: string
  _isPuppeteerCore: boolean
  /**
   * @param {string} projectRoot
   * @param {string} preferredRevision
   * @param {boolean} isPuppeteerCore
   */
  constructor(projectRoot: string, preferredRevision: string, isPuppeteerCore: boolean) {
    this._projectRoot = projectRoot;
    this._preferredRevision = preferredRevision;
    this._isPuppeteerCore = isPuppeteerCore;
  }

  /**
   * @param {!(Launcher.LaunchOptions & Launcher.ChromeArgOptions & Launcher.BrowserOptions & {product?: string, extraPrefsFirefox?: !object})=} options
   * @return {!Promise<!Puppeteer.Browser>}
   */
  launch(options?: (Launcher.LaunchOptions & Launcher.ChromeArgOptions & Launcher.BrowserOptions & {product?: string, extraPrefsFirefox?: object})): Promise<Browser> {
    if (!this._productName && options)
      this._productName = options.product;
    return this._launcher.launch(options);
  }

  /**
   * @param {!(Launcher.BrowserOptions & {browserWSEndpoint?: string, browserURL?: string, transport?: !Puppeteer.ConnectionTransport})} options
   * @return {!Promise<!Puppeteer.Browser>}
   */
  connect(options: (Launcher.BrowserOptions & {browserWSEndpoint?: string, browserURL?: string, transport?: ConnectionTransport})): Promise<Browser> {
    return this._launcher.connect(options);
  }

  /**
   * @return {string}
   */
  executablePath(): string {
    return this._launcher.executablePath();
  }

  /**
   * @return {!Puppeteer.ProductLauncher}
   */
  get _launcher(): ProductLauncher {
    if (!this._lazyLauncher)
      this._lazyLauncher = Launcher(this._projectRoot, this._preferredRevision, this._isPuppeteerCore, this._productName);
    return this._lazyLauncher;

  }

  /**
   * @return {string}
   */
  get product(): string {
    return this._launcher.product;
  }

  /**
   * @return {Object}
   */
  get devices(): object {
    return DeviceDescriptors;
  }

  /**
   * @return {Object}
   */
  get errors(): object {
    return Errors;
  }

  /**
   * @param {!Launcher.ChromeArgOptions=} options
   * @return {!Array<string>}
   */
  defaultArgs(options?: Launcher.ChromeArgOptions): Array<string> {
    return this._launcher.defaultArgs(options);
  }

  /**
   * @param {!BrowserFetcher.Options=} options
   * @return {!BrowserFetcher}
   */
  createBrowserFetcher(options?: BrowserFetcher.Options): BrowserFetcher {
    return new BrowserFetcher(this._projectRoot, options);
  }
};

