/**
 * @license
 * Copyright 2018 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import expect from 'expect';
import type {HTTPRequest} from 'puppeteer-core/internal/api/HTTPRequest.js';
import type {WebWorker} from 'puppeteer-core/internal/api/WebWorker.js';

import {getTestState, launch, setupTestBrowserHooks} from './mocha-utils.js';
import {waitEvent} from './utils.js';

describe('Browser specs', function () {
  setupTestBrowserHooks();

  describe('Browser.version', function () {
    it('should return version', async () => {
      const {browser} = await getTestState();

      const version = await browser.version();
      expect(version.length).toBeGreaterThan(0);
      expect(version.toLowerCase()).atLeastOneToContain(['firefox', 'chrome']);
    });
  });

  describe('Browser.userAgent', function () {
    it('should include Browser engine', async () => {
      const {browser, isChrome} = await getTestState();

      const userAgent = await browser.userAgent();
      expect(userAgent.length).toBeGreaterThan(0);
      if (isChrome) {
        expect(userAgent).toContain('WebKit');
      } else {
        expect(userAgent).toContain('Gecko');
      }
    });
    it('should include Browser name', async () => {
      const {browser, isChrome} = await getTestState();

      const userAgent = await browser.userAgent();
      expect(userAgent.length).toBeGreaterThan(0);
      if (isChrome) {
        expect(userAgent).toContain('Chrome');
      } else {
        expect(userAgent).toContain('Firefox');
      }
    });
  });

  describe('Browser.target', function () {
    it('should return browser target', async () => {
      const {browser} = await getTestState();

      const target = browser.target();
      expect(target.type()).toBe('browser');
    });
  });

  describe('Browser.process', function () {
    it('should return child_process instance', async () => {
      const {browser} = await getTestState();

      const process = await browser.process();
      expect(process!.pid).toBeGreaterThan(0);
    });
    it('should not return child_process for remote browser', async () => {
      const {browser, puppeteer} = await getTestState({
        skipContextCreation: true,
      });

      const browserWSEndpoint = browser.wsEndpoint();
      using remoteBrowser = await puppeteer.connect({
        browserWSEndpoint,
        protocol: browser.protocol,
      });
      expect(remoteBrowser.process()).toBe(null);
    });
    it('should keep connected after the last page is closed', async () => {
      const {browser, close} = await launch({});
      try {
        const pages = await browser.pages();
        await Promise.all(
          pages.map(page => {
            return page.close();
          }),
        );
        // Verify the browser is still connected.
        expect(browser.connected).toBe(true);
        // Verify the browser can open a new page.
        await browser.newPage();
      } finally {
        await close();
      }
    });
  });

  describe('Browser.connected', () => {
    it('should set the browser connected state', async () => {
      const {browser, puppeteer} = await getTestState({
        skipContextCreation: true,
      });

      const browserWSEndpoint = browser.wsEndpoint();
      using newBrowser = await puppeteer.connect({
        browserWSEndpoint,
        protocol: browser.protocol,
      });
      expect(newBrowser.connected).toBe(true);
      await newBrowser.disconnect();
      expect(newBrowser.connected).toBe(false);
    });
  });

  describe('Browser.screens', function () {
    it('should return default screen info', async () => {
      const {browser, isHeadless} = await getTestState();

      if (!isHeadless) {
        // In headful mode 'Browser.screens' returns the real
        // platform screens info which is not stable enough
        // for matching.
        throw new Error('Not testable in headful');
      }

      const screenInfos = await browser.screens();
      expect(screenInfos).toMatchObject([
        {
          availHeight: 600,
          availLeft: 0,
          availTop: 0,
          availWidth: 800,
          colorDepth: 24,
          devicePixelRatio: 1,
          height: 600,
          id: expect.any(String),
          isExtended: false,
          isInternal: false,
          isPrimary: true,
          label: '',
          left: 0,
          orientation: {angle: 0, type: 'landscapePrimary'},
          top: 0,
          width: 800,
        },
      ]);
    });
  });

  describe('Browser.add|removeScreen', function () {
    it('should add and remove a screen', async () => {
      const {browser} = await getTestState();
      const screenInfo = await browser.addScreen({
        left: 800,
        top: 0,
        width: 1600,
        height: 1200,
        colorDepth: 32,
        workAreaInsets: {bottom: 80},
        label: 'secondary',
      });
      expect(screenInfo).toMatchObject({
        availHeight: 1120,
        availLeft: 800,
        availTop: 0,
        availWidth: 1600,
        colorDepth: 32,
        devicePixelRatio: 1,
        height: 1200,
        id: expect.any(String),
        isExtended: true,
        isInternal: false,
        isPrimary: false,
        label: 'secondary',
        left: 800,
        orientation: {angle: 0, type: 'landscapePrimary'},
        top: 0,
        width: 1600,
      });
      expect((await browser.screens()).length).toBe(2);

      await browser.removeScreen(screenInfo.id);
      expect((await browser.screens()).length).toBe(1);
    });
  });

  describe('Browser.get|setWindowBounds', function () {
    it('should get and set browser window bounds', async () => {
      const {browser, context} = await getTestState();

      const initialBounds = {
        left: 10,
        top: 20,
        width: 800,
        height: 600,
      };
      const page = await context.newPage({
        type: 'window',
        windowBounds: initialBounds,
      });

      const windowId = await page.windowId();
      expect(await browser.getWindowBounds(windowId)).toMatchObject(
        initialBounds,
      );

      const setBounds = {
        left: 100,
        top: 200,
        width: 1600,
        height: 1200,
      };
      await browser.setWindowBounds(windowId, setBounds);
      expect(await browser.getWindowBounds(windowId)).toMatchObject(setBounds);
    });

    it('should set and get browser window maximized state', async () => {
      const {browser, context} = await getTestState();

      // Add a secondary screen.
      const screenInfo = await browser.addScreen({
        left: 800,
        top: 0,
        width: 1600,
        height: 1200,
      });

      // Open a window on the secondary screen.
      const page = await context.newPage({
        type: 'window',
        windowBounds: {
          left: screenInfo.availLeft + 50,
          top: screenInfo.availTop + 50,
          width: screenInfo.availWidth - 100,
          height: screenInfo.availHeight - 100,
        },
      });

      // Maximize the created window.
      const windowId = await page.windowId();
      await browser.setWindowBounds(windowId, {windowState: 'maximized'});

      // Expect the maximized window to be maximized.
      expect(await browser.getWindowBounds(windowId)).toMatchObject({
        windowState: 'maximized',
      });

      // Cleanup.
      await browser.removeScreen(screenInfo.id);
    });
  });

  describe('Browser.on("request")', function () {
    it('should report requests from pages', async () => {
      const {browser, page, server} = await getTestState();

      const [request] = await Promise.all([
        waitEvent<HTTPRequest>(browser, 'request', request => {
          return request.url() === server.EMPTY_PAGE;
        }),
        page.goto(server.EMPTY_PAGE),
      ]);

      expect(request.page()).toBe(page);
      expect(request.frame()).toBe(page.mainFrame());
    });

    it('should emit context events before browser events', async () => {
      const {browser, context, page, server} = await getTestState();

      const order: string[] = [];
      const record = (source: string) => {
        return (request: HTTPRequest) => {
          if (request.url() === server.EMPTY_PAGE) {
            order.push(source);
          }
        };
      };
      const onBrowser = record('browser');
      const onContext = record('context');
      const onPage = record('page');
      browser.on('request', onBrowser);
      context.on('request', onContext);
      page.on('request', onPage);
      try {
        await page.goto(server.EMPTY_PAGE);

        // Page listeners are deferred via the intercept action queue, so
        // context and browser listeners run first.
        expect(order).toEqual(['context', 'browser', 'page']);
      } finally {
        browser.off('request', onBrowser);
        context.off('request', onContext);
        page.off('request', onPage);
      }
    });

    it('should report requests from dedicated workers', async () => {
      const {browser, page, server} = await getTestState();

      const [worker] = await Promise.all([
        waitEvent<WebWorker>(page, 'workercreated'),
        page.goto(server.PREFIX + '/worker/worker.html'),
      ]);
      const [request] = await Promise.all([
        waitEvent<HTTPRequest>(browser, 'request', request => {
          return request.url() === server.PREFIX + '/one-style.css';
        }),
        worker.evaluate((url: string) => {
          return fetch(url);
        }, server.PREFIX + '/one-style.css'),
      ]);

      expect(request.worker()).toBe(worker);
      expect(request.page()).toBeNull();
    });

    it('should not interfere with request interception', async () => {
      const {browser, page, server} = await getTestState();

      await page.setRequestInterception(true);
      page.on('request', request => {
        void request.continue();
      });

      const requests: HTTPRequest[] = [];
      const listener = (request: HTTPRequest) => {
        if (request.url() === server.EMPTY_PAGE) {
          requests.push(request);
        }
      };
      browser.on('request', listener);
      try {
        const response = await page.goto(server.EMPTY_PAGE);

        expect(response!.ok()).toBe(true);
        expect(requests).toHaveLength(1);
        expect(requests[0]!.page()).toBe(page);
        expect(requests[0]!.isInterceptResolutionHandled()).toBe(true);
      } finally {
        browser.off('request', listener);
      }
    });

    it('should not block request interception when a listener throws', async () => {
      const {browser, context, page, server} = await getTestState();

      await page.setRequestInterception(true);
      page.on('request', request => {
        void request.continue();
      });

      let contextCalls = 0;
      let browserCalls = 0;
      const throwingContext = () => {
        contextCalls++;
        throw new Error('listener error');
      };
      const throwingBrowser = () => {
        browserCalls++;
        throw new Error('listener error');
      };
      context.on('request', throwingContext);
      browser.on('request', throwingBrowser);
      try {
        const response = await page.goto(server.EMPTY_PAGE);

        expect(response!.ok()).toBe(true);
        expect(contextCalls).toBeGreaterThan(0);
        expect(browserCalls).toBeGreaterThan(0);
      } finally {
        context.off('request', throwingContext);
        browser.off('request', throwingBrowser);
      }
    });
  });
});
