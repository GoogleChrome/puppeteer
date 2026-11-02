/**
 * @license
 * Copyright 2026 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {afterEach, describe, it} from 'node:test';

import type {Protocol} from 'devtools-protocol';
import expect from 'expect';
import sinon from 'sinon';

import type {TargetFilterCallback} from '../api/Browser.js';
import {
  CDPSessionEvent,
  type CDPSessionEvents,
  type CommandOptions,
} from '../api/CDPSession.js';
import {PageEvent, type Page} from '../api/Page.js';
import type {ConnectionTransport} from '../common/ConnectionTransport.js';
import {EventEmitter} from '../common/EventEmitter.js';
import {Deferred} from '../util/Deferred.js';

import {CdpBrowser} from './Browser.js';
import {Connection} from './Connection.js';
import type {CdpTarget} from './Target.js';

class MockConnection extends EventEmitter<CDPSessionEvents> {
  rejectEmulateNetworkConditionsCalls = false;
  readonly command = Deferred.create<{targetId: string}>();
  commandTimeout?: number;

  send(
    _method: string,
    _params: unknown,
    options?: CommandOptions,
  ): Promise<{targetId: string}> {
    this.commandTimeout = options?.timeout;
    return this.command.valueOrThrow();
  }

  dispose(): void {
    this.disposed = true;
  }

  disposed = false;
}

describe('CdpBrowser', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('launchPWA', function () {
    it('should apply the timeout while waiting for the page target', async () => {
      const connection = new MockConnection();
      const browser = new CdpBrowser(
        connection as unknown as Connection,
        [],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        () => {
          return undefined;
        },
      );
      const page = {} as Page;
      const target = {
        page: async () => {
          return page;
        },
      } as unknown as CdpTarget;
      const waitForTarget = sinon
        .stub(browser, 'waitForTarget')
        .resolves(target);
      connection.command.resolve({targetId: 'tab'});

      const result = await browser.launchPWA({
        manifestId: 'https://example.com/',
        timeout: 123,
      });

      expect(result).toBe(page);
      expect(connection.commandTimeout).toBeUndefined();
      expect(waitForTarget.calledOnce).toBe(true);
      expect(waitForTarget.firstCall.args[1]).toEqual({timeout: 123});
    });
  });

  describe('close', function () {
    it('should disconnect even when the close callback throws', async () => {
      const connection = new MockConnection();
      const browser = new CdpBrowser(
        connection as unknown as Connection,
        [],
        undefined,
        undefined,
        async () => {
          throw new Error('closeBrowser failed');
        },
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        () => {
          return undefined;
        },
      );

      await expect(browser.close()).resolves.toBeUndefined();
      expect(connection.disposed).toBe(true);
    });
  });

  describe('installExtension', function () {
    it('should destroy pre-existing service_worker target for the same extension id', async () => {
      const connection = new MockConnection() as MockConnection & {
        isAutoAttached: (targetId: string) => boolean;
        _session: (sessionId: string) => unknown;
        _createSession: () => Promise<unknown>;
      };
      connection.isAutoAttached = () => {
        return true;
      };
      connection._session = (sessionId: string) => {
        return {
          id: () => {
            return sessionId;
          },
          send: async () => {
            return {};
          },
        };
      };
      connection._createSession = async () => {
        return {};
      };

      const browser = new CdpBrowser(
        connection as unknown as Connection,
        [],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        () => {
          return undefined;
        },
      );
      const extId = 'abcdefghijklmnopabcdefghijklmnop';
      sinon.stub(connection, 'send').callsFake(async (method: string) => {
        if (method === 'Extensions.loadUnpacked') {
          const newTargetInfo = {
            targetId: 'new-sw',
            type: 'service_worker',
            title: '',
            url: `chrome-extension://${extId}/background.js`,
            attached: true,
            canAccessOpener: false,
          };
          connection.emit('Target.targetCreated', {targetInfo: newTargetInfo});
          connection.emit('Target.attachedToTarget', {
            sessionId: 'session-new',
            targetInfo: newTargetInfo,
            waitingForDebugger: false,
          });
          return {id: extId} as unknown as {targetId: string};
        }
        return {targetId: ''};
      });

      await browser._attach(undefined);

      const oldTargetInfo = {
        targetId: 'old-sw',
        type: 'service_worker',
        title: '',
        url: `chrome-extension://${extId}/background.js`,
        attached: true,
        canAccessOpener: false,
      };
      connection.emit('Target.targetCreated', {targetInfo: oldTargetInfo});
      connection.emit('Target.attachedToTarget', {
        sessionId: 'session-old',
        targetInfo: oldTargetInfo,
        waitingForDebugger: false,
      });

      const oldTarget = await browser.waitForTarget(target => {
        return target.type() === 'service_worker';
      });
      expect(browser.targets()).toContain(oldTarget);

      const destroyedTargets: CdpTarget[] = [];
      browser.on('targetdestroyed', target => {
        destroyedTargets.push(target as CdpTarget);
      });

      const returnedId = await browser.installExtension('/path/to/ext');
      expect(returnedId).toBe(extId);
      expect(destroyedTargets).toEqual([oldTarget]);
      expect(
        browser.targets().map(target => {
          return target._targetId;
        }),
      ).toEqual(['new-sw']);
    });
  });

  describe('discarded tabs', function () {
    class MockTransport implements ConnectionTransport {
      onmessage?: (message: string) => void;
      onclose?: () => void;
      sentMessages: Array<{
        id: number;
        method: string;
        params?: unknown;
        sessionId?: string;
      }> = [];
      onBrowserAutoAttach?: () => void;

      send(message: string): void {
        const msg = JSON.parse(message) as {
          id: number;
          method: string;
          params?: unknown;
          sessionId?: string;
        };
        this.sentMessages.push(msg);
        queueMicrotask(() => {
          if (msg.method === 'Target.setAutoAttach' && !msg.sessionId) {
            this.onBrowserAutoAttach?.();
          }
          let result: Record<string, unknown> = {};
          if (msg.method === 'Page.getFrameTree') {
            result = {
              frameTree: {
                frame: {
                  id: 'main-frame',
                  loaderId: 'loader-1',
                  url: 'https://example.com/',
                  domainAndRegistry: 'example.com',
                  securityOrigin: 'https://example.com',
                  mimeType: 'text/html',
                  secureContextType: 'Secure',
                  crossOriginIsolatedContextType: 'NotIsolated',
                  gatedAPIFeatures: [],
                },
              },
            };
          } else if (msg.method === 'Runtime.createIsolatedWorld') {
            result = {executionContextId: 1};
          }
          this.onmessage?.(
            JSON.stringify({
              id: msg.id,
              sessionId: msg.sessionId,
              result,
            }),
          );
        });
      }

      emitEvent(method: string, params: unknown, sessionId?: string): void {
        this.onmessage?.(
          JSON.stringify({
            method,
            params,
            sessionId,
          }),
        );
      }

      close(): void {
        this.onclose?.();
      }
    }

    async function flushEvents(): Promise<void> {
      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });
    }

    function createBrowserWithTransport(options?: {
      targetFilter?: TargetFilterCallback;
    }) {
      const transport = new MockTransport();
      const connection = new Connection(
        'ws://127.0.0.1:9222/devtools/browser/test',
        transport,
        0,
        undefined,
        false,
        undefined,
        () => {
          return undefined;
        },
      );
      const browser = new CdpBrowser(
        connection,
        [],
        undefined,
        undefined,
        undefined,
        options?.targetFilter,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        () => {
          return undefined;
        },
      );
      return {browser, connection, transport};
    }

    it('should exclude pre-existing discarded tabs by default and expose them with includeDiscarded', async () => {
      const seenInFilter: Array<{type: string; discarded: boolean}> = [];
      const {browser, transport} = createBrowserWithTransport({
        targetFilter: target => {
          seenInFilter.push({
            type: target.type(),
            discarded: target.isDiscarded(),
          });
          return true;
        },
      });

      const createdTargets: CdpTarget[] = [];
      browser.on('targetcreated', target => {
        createdTargets.push(target as CdpTarget);
      });

      const tabTargetInfo: Protocol.Target.TargetInfo = {
        targetId: 'tab-discarded',
        type: 'tab',
        subtype: 'discarded',
        title: 'Discarded Tab',
        url: 'https://example.com/discarded',
        attached: true,
        canAccessOpener: false,
      };
      const activeTabInfo: Protocol.Target.TargetInfo = {
        targetId: 'tab-active',
        type: 'tab',
        title: 'Active Tab',
        url: 'https://example.com/active',
        attached: true,
        canAccessOpener: false,
      };
      const activePageInfo: Protocol.Target.TargetInfo = {
        targetId: 'page-active',
        type: 'page',
        title: 'Active Tab',
        url: 'https://example.com/active',
        attached: true,
        canAccessOpener: false,
      };
      const prerenderPageInfo: Protocol.Target.TargetInfo = {
        targetId: 'page-prerender',
        type: 'page',
        subtype: 'prerender',
        title: 'Prerender',
        url: 'https://example.com/prerender',
        attached: true,
        canAccessOpener: false,
      };

      transport.onBrowserAutoAttach = () => {
        // Discarded tabs attach only a `tab` target with no child `page` target.
        transport.emitEvent('Target.targetCreated', {
          targetInfo: tabTargetInfo,
        });
        transport.emitEvent('Target.attachedToTarget', {
          sessionId: 'session-tab-discarded',
          targetInfo: tabTargetInfo,
          waitingForDebugger: false,
        });

        transport.emitEvent('Target.targetCreated', {
          targetInfo: activeTabInfo,
        });
        transport.emitEvent('Target.attachedToTarget', {
          sessionId: 'session-tab-active',
          targetInfo: activeTabInfo,
          waitingForDebugger: false,
        });
        transport.emitEvent(
          'Target.attachedToTarget',
          {
            sessionId: 'session-page-active',
            targetInfo: activePageInfo,
            waitingForDebugger: false,
          },
          'session-tab-active',
        );
        transport.emitEvent(
          'Target.attachedToTarget',
          {
            sessionId: 'session-page-prerender',
            targetInfo: prerenderPageInfo,
            waitingForDebugger: false,
          },
          'session-tab-active',
        );
      };

      await browser._attach(undefined);
      await flushEvents();

      expect(seenInFilter).toContainEqual({type: 'tab', discarded: true});
      expect(seenInFilter).toContainEqual({type: 'tab', discarded: false});
      expect(seenInFilter).toContainEqual({type: 'page', discarded: false});

      expect(
        createdTargets.map(target => {
          return target._targetId;
        }),
      ).toEqual(['page-active']);

      expect(
        browser.targets().map(target => {
          return target._targetId;
        }),
      ).toEqual(['page-active']);
      expect(
        browser
          .defaultBrowserContext()
          .targets()
          .map(target => {
            return (target as CdpTarget)._targetId;
          }),
      ).toEqual(['page-active']);

      const allTargets = browser.targets({includeDiscarded: true});
      expect(
        allTargets.map(target => {
          return target._targetId;
        }),
      ).toEqual(['tab-discarded', 'page-active']);
      expect(
        browser
          .defaultBrowserContext()
          .targets({includeDiscarded: true})
          .map(target => {
            return (target as CdpTarget)._targetId;
          }),
      ).toEqual(['tab-discarded', 'page-active']);

      const discardedTarget = allTargets.find(target => {
        return target._targetId === 'tab-discarded';
      })!;
      const activeTarget = allTargets.find(target => {
        return target._targetId === 'page-active';
      })!;

      expect(discardedTarget.type()).toBe('tab');
      expect(discardedTarget.isDiscarded()).toBe(true);
      expect(activeTarget.type()).toBe('page');
      expect(activeTarget.isDiscarded()).toBe(false);

      const messageCountBeforePageCall = transport.sentMessages.length;
      await expect(discardedTarget.page()).resolves.toBeNull();
      expect(
        transport.sentMessages.slice(messageCountBeforePageCall).filter(msg => {
          return msg.sessionId === 'session-tab-discarded';
        }),
      ).toEqual([]);
      await expect(discardedTarget.asPage()).rejects.toThrow(
        'Cannot create a page for a discarded target.',
      );

      const pages = await browser.pages();
      expect(pages).toHaveLength(1);
      expect((pages[0]!.target() as CdpTarget)._targetId).toBe('page-active');
    });

    it('should handle active-to-discarded and discarded-to-active runtime transitions', async () => {
      const {browser, connection, transport} = createBrowserWithTransport();
      await browser._attach(undefined);

      const createdTargets: CdpTarget[] = [];
      const destroyedTargets: CdpTarget[] = [];
      const destroyedDiscardedFlags: boolean[] = [];
      const changedTargets: CdpTarget[] = [];
      const contextCreatedTargets: CdpTarget[] = [];
      const contextDestroyedTargets: CdpTarget[] = [];

      browser.on('targetcreated', target => {
        createdTargets.push(target as CdpTarget);
      });
      browser.on('targetdestroyed', target => {
        destroyedTargets.push(target as CdpTarget);
        destroyedDiscardedFlags.push(target.isDiscarded());
      });
      browser.on('targetchanged', target => {
        changedTargets.push(target as CdpTarget);
      });
      browser.defaultBrowserContext().on('targetcreated', target => {
        contextCreatedTargets.push(target as CdpTarget);
      });
      browser.defaultBrowserContext().on('targetdestroyed', target => {
        contextDestroyedTargets.push(target as CdpTarget);
      });

      const tabTargetInfo: Protocol.Target.TargetInfo = {
        targetId: 'tab-1',
        type: 'tab',
        title: 'Example',
        url: 'https://example.com/',
        attached: true,
        canAccessOpener: false,
      };
      const pageTargetInfo: Protocol.Target.TargetInfo = {
        targetId: 'page-1',
        type: 'page',
        title: 'Example',
        url: 'https://example.com/',
        attached: true,
        canAccessOpener: false,
      };

      transport.emitEvent('Target.targetCreated', {targetInfo: tabTargetInfo});
      transport.emitEvent('Target.attachedToTarget', {
        sessionId: 'session-tab-1',
        targetInfo: tabTargetInfo,
        waitingForDebugger: false,
      });
      transport.emitEvent(
        'Target.attachedToTarget',
        {
          sessionId: 'session-page-1',
          targetInfo: pageTargetInfo,
          waitingForDebugger: false,
        },
        'session-tab-1',
      );
      await flushEvents();

      expect(createdTargets).toHaveLength(1);
      expect(contextCreatedTargets).toHaveLength(1);
      const pageTarget = createdTargets[0]!;
      expect(pageTarget.isDiscarded()).toBe(false);

      const initialPage = (await pageTarget.page())!;
      expect(initialPage).not.toBeNull();
      expect(initialPage.isClosed()).toBe(false);

      let closeCount = 0;
      let loadCountOnClosedPage = 0;
      initialPage.on(PageEvent.Close, () => {
        closeCount++;
      });
      initialPage.on(PageEvent.Load, () => {
        loadCountOnClosedPage++;
      });

      const tabSession = connection._session('session-tab-1')!;
      let swappedCount = 0;
      tabSession.on(CDPSessionEvent.Swapped, () => {
        swappedCount++;
      });

      // Transition active -> discarded: Chrome updates tab subtype first
      // and then detaches the page target.
      transport.emitEvent('Target.targetInfoChanged', {
        targetInfo: {
          ...tabTargetInfo,
          subtype: 'discarded',
        },
      });
      // Before Target.detachedFromTarget arrives, includeDiscarded exposes
      // only the tab target.
      expect(
        browser.targets({includeDiscarded: true}).map(target => {
          return target._targetId;
        }),
      ).toEqual(['tab-1']);

      transport.emitEvent(
        'Target.detachedFromTarget',
        {sessionId: 'session-page-1'},
        'session-tab-1',
      );
      await flushEvents();

      expect(closeCount).toBe(1);
      expect(initialPage.isClosed()).toBe(true);
      expect(pageTarget.isDiscarded()).toBe(true);
      expect(destroyedTargets).toEqual([pageTarget]);
      expect(destroyedDiscardedFlags).toEqual([true]);
      expect(contextDestroyedTargets).toEqual([pageTarget]);
      expect(browser.targets()).toEqual([]);

      const discardedTargets = browser.targets({includeDiscarded: true});
      expect(discardedTargets).toHaveLength(1);
      const discardedTabTarget = discardedTargets[0]!;
      expect(discardedTabTarget._targetId).toBe('tab-1');
      expect(discardedTabTarget.type()).toBe('tab');
      expect(discardedTabTarget.isDiscarded()).toBe(true);
      await expect(discardedTabTarget.page()).resolves.toBeNull();
      await expect(browser.pages()).resolves.toEqual([]);

      // URL change while discarded should not emit TargetChanged.
      transport.emitEvent('Target.targetInfoChanged', {
        targetInfo: {
          ...tabTargetInfo,
          subtype: 'discarded',
          url: 'https://example.com/updated-while-discarded',
        },
      });
      await flushEvents();
      expect(changedTargets).toEqual([]);

      // Transition discarded -> active: reload clears subtype on tab target
      // and attaches a new page target.
      const reloadedPageInfo: Protocol.Target.TargetInfo = {
        targetId: 'page-2',
        type: 'page',
        title: 'Example',
        url: 'https://example.com/',
        attached: true,
        canAccessOpener: false,
      };
      transport.emitEvent('Target.targetInfoChanged', {
        targetInfo: {
          ...tabTargetInfo,
          subtype: undefined,
        },
      });
      transport.emitEvent(
        'Target.attachedToTarget',
        {
          sessionId: 'session-page-2',
          targetInfo: reloadedPageInfo,
          waitingForDebugger: false,
        },
        'session-tab-1',
      );
      await flushEvents();

      expect(swappedCount).toBe(0);
      expect(discardedTabTarget.isDiscarded()).toBe(false);
      expect(createdTargets).toHaveLength(2);
      const reloadedPageTarget = createdTargets[1]!;
      expect(reloadedPageTarget._targetId).toBe('page-2');
      expect(reloadedPageTarget.type()).toBe('page');
      expect(reloadedPageTarget.isDiscarded()).toBe(false);
      expect(contextCreatedTargets).toEqual([pageTarget, reloadedPageTarget]);
      expect(browser.targets()).toEqual([reloadedPageTarget]);
      expect(browser.targets({includeDiscarded: true})).toEqual([
        reloadedPageTarget,
      ]);

      // Events on the old session do not fire on the closed initialPage.
      transport.emitEvent(
        'Page.loadEventFired',
        {timestamp: 1},
        'session-page-1',
      );
      await flushEvents();
      expect(loadCountOnClosedPage).toBe(0);

      const reloadedPage = (await reloadedPageTarget.page())!;
      expect(reloadedPage).not.toBeNull();
      expect(reloadedPage).not.toBe(initialPage);
      expect(reloadedPage.isClosed()).toBe(false);

      // Discard again and then close the tab: no duplicate Close or TargetDestroyed.
      let reloadedCloseCount = 0;
      reloadedPage.on(PageEvent.Close, () => {
        reloadedCloseCount++;
      });
      transport.emitEvent('Target.targetInfoChanged', {
        targetInfo: {
          ...tabTargetInfo,
          subtype: 'discarded',
        },
      });
      transport.emitEvent(
        'Target.detachedFromTarget',
        {sessionId: 'session-page-2'},
        'session-tab-1',
      );
      await flushEvents();

      expect(reloadedCloseCount).toBe(1);
      expect(destroyedTargets).toEqual([pageTarget, reloadedPageTarget]);
      expect(destroyedDiscardedFlags).toEqual([true, true]);

      transport.emitEvent('Target.detachedFromTarget', {
        sessionId: 'session-tab-1',
      });
      await flushEvents();

      expect(closeCount).toBe(1);
      expect(reloadedCloseCount).toBe(1);
      expect(destroyedTargets).toHaveLength(2);
      expect(browser.targets({includeDiscarded: true})).toEqual([]);
    });

    it('should finish initialization if an active tab becomes discarded before attaching a page', async () => {
      const {browser, transport} = createBrowserWithTransport();

      const tabTargetInfo: Protocol.Target.TargetInfo = {
        targetId: 'tab-discarded-during-init',
        type: 'tab',
        title: 'Tab',
        url: 'https://example.com/',
        attached: true,
        canAccessOpener: false,
      };

      transport.onBrowserAutoAttach = () => {
        transport.emitEvent('Target.targetCreated', {
          targetInfo: tabTargetInfo,
        });
        transport.emitEvent('Target.attachedToTarget', {
          sessionId: 'session-tab-init',
          targetInfo: tabTargetInfo,
          waitingForDebugger: false,
        });
        transport.emitEvent('Target.targetInfoChanged', {
          targetInfo: {
            ...tabTargetInfo,
            subtype: 'discarded',
          },
        });
      };

      await browser._attach(undefined);
      await flushEvents();

      expect(browser.targets()).toEqual([]);
      expect(
        browser.targets({includeDiscarded: true}).map(target => {
          return target._targetId;
        }),
      ).toEqual(['tab-discarded-during-init']);
    });

    it('should expose a page target with subtype "discarded" when includeDiscarded is true', async () => {
      const {browser, transport} = createBrowserWithTransport();
      await browser._attach(undefined);

      const directDiscardedPageInfo: Protocol.Target.TargetInfo = {
        targetId: 'page-direct-discarded',
        type: 'page',
        subtype: 'discarded',
        title: 'Direct Discarded Page',
        url: 'https://example.com/direct-discarded',
        attached: true,
        canAccessOpener: false,
      };

      transport.emitEvent('Target.targetCreated', {
        targetInfo: directDiscardedPageInfo,
      });
      transport.emitEvent('Target.attachedToTarget', {
        sessionId: 'session-direct-discarded',
        targetInfo: directDiscardedPageInfo,
        waitingForDebugger: false,
      });
      await flushEvents();

      expect(browser.targets()).toEqual([]);
      const allTargets = browser.targets({includeDiscarded: true});
      expect(
        allTargets.map(target => {
          return target._targetId;
        }),
      ).toEqual(['page-direct-discarded']);
      expect(allTargets[0]!.isDiscarded()).toBe(true);
    });
  });
});
