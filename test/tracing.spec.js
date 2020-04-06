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

const fs = require('fs');
const path = require('path');
const expect = require('expect');
const {getTestState} = require('./mocha-utils');

describe('Tracing', function() {
  let outputFile;
  let browser;
  let page;

  /* we manually manage the browser here as we want a new browser for each
   * individual test, which isn't the default behaviour of getTestState()
   */

  beforeEach(async() => {
    const {defaultBrowserOptions, puppeteer} = getTestState();
    browser = await puppeteer.launch(defaultBrowserOptions);
    page = await browser.newPage();
    outputFile = path.join(__dirname, 'assets', 'trace.json');
  });

  afterEach(async() => {
    await browser.close();
    browser = null;
    page = null;
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
      outputFile = null;
    }
  });
  it('should output a trace', async() => {
    const { server} = getTestState();

    await page.tracing.start({screenshots: true, path: outputFile});
    await page.goto(server.PREFIX + '/grid.html');
    await page.tracing.stop();
    expect(fs.existsSync(outputFile)).toBe(true);
  });

  it('should run with custom categories if provided', async() => {
    await page.tracing.start({path: outputFile, categories: ['disabled-by-default-v8.cpu_profiler.hires']});
    await page.tracing.stop();

    const traceJson = JSON.parse(fs.readFileSync(outputFile));
    expect(traceJson.metadata['trace-config']).toContain('disabled-by-default-v8.cpu_profiler.hires');
  });
  it('should throw if tracing on two pages', async() => {
    await page.tracing.start({path: outputFile});
    const newPage = await browser.newPage();
    let error = null;
    await newPage.tracing.start({path: outputFile}).catch(e => error = e);
    await newPage.close();
    expect(error).toBeTruthy();
    await page.tracing.stop();
  });
  it('should return a buffer', async() => {
    const { server } = getTestState();

    await page.tracing.start({screenshots: true, path: outputFile});
    await page.goto(server.PREFIX + '/grid.html');
    const trace = await page.tracing.stop();
    const buf = fs.readFileSync(outputFile);
    expect(trace.toString()).toEqual(buf.toString());
  });
  it('should work without options', async() => {
    const { server } = getTestState();

    await page.tracing.start();
    await page.goto(server.PREFIX + '/grid.html');
    const trace = await page.tracing.stop();
    expect(trace).toBeTruthy();
  });

  it('should return null in case of Buffer error', async() => {
    const { server } = getTestState();

    await page.tracing.start({screenshots: true});
    await page.goto(server.PREFIX + '/grid.html');
    const oldBufferConcat = Buffer.concat;
    Buffer.concat = bufs => {
      throw 'error';
    };
    const trace = await page.tracing.stop();
    expect(trace).toEqual(null);
    Buffer.concat = oldBufferConcat;
  });

  it('should support a buffer without a path', async() => {
    const { server } = getTestState();

    await page.tracing.start({screenshots: true});
    await page.goto(server.PREFIX + '/grid.html');
    const trace = await page.tracing.stop();
    expect(trace.toString()).toContain('screenshot');
  });
});
