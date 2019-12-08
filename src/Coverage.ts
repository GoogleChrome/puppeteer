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

import { helper, debugError, assert } from './helper';
import { EVALUATION_SCRIPT_URL } from './ExecutionContext';
import { CDPSession } from './Connection';
import { AnyFunction } from './types';
import { Protocol } from './protocol';

export interface CoverageEntry {
  url: string;
  text: string;
  ranges: Array<{
    start: number;
    end: number;
  }>;
}

export class Coverage {
  private _jsCoverage: JSCoverage;
  private _cssCoverage: CSSCoverage;

  constructor(client: CDPSession) {
    this._jsCoverage = new JSCoverage(client);
    this._cssCoverage = new CSSCoverage(client);
  }

  async startJSCoverage(options: { resetOnNavigation?: boolean; reportAnonymousScripts?: boolean }) {
    return await this._jsCoverage.start(options);
  }

  async stopJSCoverage(): Promise<Array<CoverageEntry>> {
    return await this._jsCoverage.stop();
  }

  async startCSSCoverage(options?: { resetOnNavigation?: boolean }) {
    return await this._cssCoverage.start(options);
  }

  async stopCSSCoverage(): Promise<Array<CoverageEntry>> {
    return await this._cssCoverage.stop();
  }
}

class JSCoverage {
  private _enabled = false;
  private _scriptURLs = new Map<string, string>();
  private _scriptSources = new Map<string, string>();
  private _eventListeners: Array<{
    emitter: NodeJS.EventEmitter;
    eventName: string | symbol;
    handler: AnyFunction;
  }> = [];
  private _resetOnNavigation = false;
  private _reportAnonymousScripts?: boolean;

  constructor(private client: CDPSession) {}

  async start(options: { resetOnNavigation?: boolean; reportAnonymousScripts?: boolean } = {}) {
    assert(!this._enabled, 'JSCoverage is already enabled');
    const { resetOnNavigation = true, reportAnonymousScripts = false } = options;
    this._resetOnNavigation = resetOnNavigation;
    this._reportAnonymousScripts = reportAnonymousScripts;
    this._enabled = true;
    this._scriptURLs.clear();
    this._scriptSources.clear();
    this._eventListeners = [
      helper.addEventListener(this.client, 'Debugger.scriptParsed', this._onScriptParsed.bind(this)),
      helper.addEventListener(
          this.client,
          'Runtime.executionContextsCleared',
          this._onExecutionContextsCleared.bind(this)
      )
    ];
    await Promise.all([
      this.client.send('Profiler.enable'),
      this.client.send('Profiler.startPreciseCoverage', { callCount: false, detailed: true }),
      this.client.send('Debugger.enable'),
      this.client.send('Debugger.setSkipAllPauses', { skip: true })
    ]);
  }

  private _onExecutionContextsCleared() {
    if (!this._resetOnNavigation) return;
    this._scriptURLs.clear();
    this._scriptSources.clear();
  }

  async _onScriptParsed(event: Protocol.Debugger.scriptParsedPayload) {
    // Ignore puppeteer-injected scripts
    if (event.url === EVALUATION_SCRIPT_URL) return;
    // Ignore other anonymous scripts unless the reportAnonymousScripts option is true.
    if (!event.url && !this._reportAnonymousScripts) return;
    try {
      const response = await this.client.send('Debugger.getScriptSource', { scriptId: event.scriptId });
      this._scriptURLs.set(event.scriptId, event.url);
      this._scriptSources.set(event.scriptId, response.scriptSource);
    } catch (e) {
      // This might happen if the page has already navigated away.
      debugError(e);
    }
  }

  async stop(): Promise<Array<CoverageEntry>> {
    assert(this._enabled, 'JSCoverage is not enabled');
    this._enabled = false;
    const [profileResponse] = await Promise.all([
      this.client.send('Profiler.takePreciseCoverage'),
      this.client.send('Profiler.stopPreciseCoverage'),
      this.client.send('Profiler.disable'),
      this.client.send('Debugger.disable')
    ] as const);
    helper.removeEventListeners(this._eventListeners);

    const coverage = [];
    for (const entry of profileResponse.result) {
      let url = this._scriptURLs.get(entry.scriptId);
      if (!url && this._reportAnonymousScripts) url = 'debugger://VM' + entry.scriptId;
      const text = this._scriptSources.get(entry.scriptId);
      if (text === undefined || url === undefined) continue;
      const flattenRanges = [];
      for (const func of entry.functions) flattenRanges.push(...func.ranges);
      const ranges = convertToDisjointRanges(flattenRanges);
      coverage.push({ url, ranges, text });
    }
    return coverage;
  }
}

class CSSCoverage {
  private _enabled = false;
  private _stylesheetURLs = new Map<string, string>();
  private _stylesheetSources = new Map<string, string>();
  private _eventListeners: Array<{
    emitter: NodeJS.EventEmitter;
    eventName: string | symbol;
    handler: AnyFunction;
  }> = [];
  private _resetOnNavigation = false;

  constructor(private client: CDPSession) {}

  async start(options: { resetOnNavigation?: boolean } = {}) {
    assert(!this._enabled, 'CSSCoverage is already enabled');
    const { resetOnNavigation = true } = options;
    this._resetOnNavigation = resetOnNavigation;
    this._enabled = true;
    this._stylesheetURLs.clear();
    this._stylesheetSources.clear();
    this._eventListeners = [
      helper.addEventListener(this.client, 'CSS.styleSheetAdded', this._onStyleSheet.bind(this)),
      helper.addEventListener(
          this.client,
          'Runtime.executionContextsCleared',
          this._onExecutionContextsCleared.bind(this)
      )
    ];
    await Promise.all([
      this.client.send('DOM.enable'),
      this.client.send('CSS.enable'),
      this.client.send('CSS.startRuleUsageTracking')
    ]);
  }

  private _onExecutionContextsCleared() {
    if (!this._resetOnNavigation) return;
    this._stylesheetURLs.clear();
    this._stylesheetSources.clear();
  }

  private async _onStyleSheet(event: Protocol.CSS.styleSheetAddedPayload) {
    const header = event.header;
    // Ignore anonymous scripts
    if (!header.sourceURL) return;
    try {
      const response = await this.client.send('CSS.getStyleSheetText', { styleSheetId: header.styleSheetId });
      this._stylesheetURLs.set(header.styleSheetId, header.sourceURL);
      this._stylesheetSources.set(header.styleSheetId, response.text);
    } catch (e) {
      // This might happen if the page has already navigated away.
      debugError(e);
    }
  }

  async stop(): Promise<Array<CoverageEntry>> {
    assert(this._enabled, 'CSSCoverage is not enabled');
    this._enabled = false;
    const ruleTrackingResponse = await this.client.send('CSS.stopRuleUsageTracking');
    await Promise.all([this.client.send('CSS.disable'), this.client.send('DOM.disable')]);
    helper.removeEventListeners(this._eventListeners);

    // aggregate by styleSheetId
    const styleSheetIdToCoverage = new Map();
    for (const entry of ruleTrackingResponse.ruleUsage) {
      let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
      if (!ranges) {
        ranges = [];
        styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
      }
      ranges.push({
        startOffset: entry.startOffset,
        endOffset: entry.endOffset,
        count: entry.used ? 1 : 0
      });
    }

    const coverage: Array<CoverageEntry> = [];
    for (const styleSheetId of this._stylesheetURLs.keys()) {
      const url = this._stylesheetURLs.get(styleSheetId)!;
      const text = this._stylesheetSources.get(styleSheetId)!;
      const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
      coverage.push({ url, ranges, text });
    }

    return coverage;
  }
}

function convertToDisjointRanges(
  nestedRanges: Array<{ startOffset: number; endOffset: number; count: number }>
): Array<{ start: number; end: number }> {
  const points: Array<{
    offset: number;
    type: number;
    range: { startOffset: number; endOffset: number; count: number };
  }> = [];
  for (const range of nestedRanges) {
    points.push({ offset: range.startOffset, type: 0, range });
    points.push({ offset: range.endOffset, type: 1, range });
  }
  // Sort points to form a valid parenthesis sequence.
  points.sort((a, b) => {
    // Sort with increasing offsets.
    if (a.offset !== b.offset) return a.offset - b.offset;
    // All "end" points should go before "start" points.
    if (a.type !== b.type) return b.type - a.type;
    const aLength = a.range.endOffset - a.range.startOffset;
    const bLength = b.range.endOffset - b.range.startOffset;
    // For two "start" points, the one with longer range goes first.
    if (a.type === 0) return bLength - aLength;
    // For two "end" points, the one with shorter range goes first.
    return aLength - bLength;
  });

  const hitCountStack: number[] = [];
  const results: Array<{ start: number; end: number }> = [];
  let lastOffset = 0;
  // Run scanning line to intersect all ranges.
  for (const point of points) {
    if (hitCountStack.length && lastOffset < point.offset && hitCountStack[hitCountStack.length - 1] > 0) {
      const lastResult = results.length ? results[results.length - 1] : null;
      if (lastResult && lastResult.end === lastOffset) lastResult.end = point.offset;
      else results.push({ start: lastOffset, end: point.offset });
    }
    lastOffset = point.offset;
    if (point.type === 0) hitCountStack.push(point.range.count);
    else hitCountStack.pop();
  }
  // Filter out empty ranges.
  return results.filter(range => range.end - range.start > 1);
}
