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
const path = require('path');
const {TestServer} = require('../utils/testserver/');
const {TestRunner, Reporter} = require('../utils/testrunner/');
const utils = require('./utils');

const headless = (process.env.HEADLESS || 'true').trim().toLowerCase() === 'true';
const slowMo = parseInt((process.env.SLOW_MO || '0').trim(), 10);

let parallel = 1;
if (process.env.PPTR_PARALLEL_TESTS)
  parallel = parseInt(process.env.PPTR_PARALLEL_TESTS.trim(), 10);
const parallelArgIndex = process.argv.indexOf('-j');
if (parallelArgIndex !== -1)
  parallel = parseInt(process.argv[parallelArgIndex + 1], 10);
require('events').defaultMaxListeners *= parallel;

const timeout = slowMo ? 0 : 10 * 1000;
const testRunner = new TestRunner({timeout, parallel});
const {describe, fdescribe, beforeAll, afterAll, beforeEach, afterEach} = testRunner;

console.log('Testing on Node', process.version);

beforeAll(async state => {
  const assetsPath = path.join(__dirname, 'assets');
  const cachedPath = path.join(__dirname, 'assets', 'cached');

  const port = 8907 + state.parallelIndex * 2;
  state.server = await TestServer.create(assetsPath, port);
  state.server.enableHTTPCache(cachedPath);
  state.server.PORT = port;
  state.server.PREFIX = `http://localhost:${port}`;
  state.server.CROSS_PROCESS_PREFIX = `http://127.0.0.1:${port}`;
  state.server.EMPTY_PAGE = `http://localhost:${port}/empty.html`;
  state.server.EMPTY_PAGE2 = `http://localhost:${port}/empty2.html`;

  const httpsPort = port + 1;
  state.httpsServer = await TestServer.createHTTPS(assetsPath, httpsPort);
  state.httpsServer.enableHTTPCache(cachedPath);
  state.httpsServer.PORT = httpsPort;
  state.httpsServer.PREFIX = `https://localhost:${httpsPort}`;
  state.httpsServer.CROSS_PROCESS_PREFIX = `https://127.0.0.1:${httpsPort}`;
  state.httpsServer.EMPTY_PAGE = `https://localhost:${httpsPort}/empty.html`;
  state.httpsServer.EMPTY_PAGE2 = `https://localhost:${httpsPort}/empty2.html`;
});

afterAll(async({server, httpsServer}) => {
  await Promise.all([
    server.stop(),
    httpsServer.stop(),
  ]);
});

beforeEach(async({server, httpsServer}) => {
  server.reset();
  httpsServer.reset();
});

const CHROMIUM_NO_COVERAGE = new Set([
  'page.bringToFront',
  'securityDetails.subjectName',
  'securityDetails.issuer',
  'securityDetails.validFrom',
  'securityDetails.validTo',
  ...(headless ? [] : ['page.pdf']),
]);

if (process.env.BROWSER !== 'firefox') {
  describe('Chromium', () => {
    require('./puppeteer.spec.js').addTests({
      product: 'Chromium',
      puppeteer: utils.requireRoot('index'),
      Errors: utils.requireRoot('Errors'),
      DeviceDescriptors: utils.requireRoot('DeviceDescriptors'),
      testRunner,
      slowMo,
      headless,
    });
    if (process.env.COVERAGE)
      utils.recordAPICoverage(testRunner, require('../lib/api'), CHROMIUM_NO_COVERAGE);
  });
} else {
  describe('Firefox', () => {
    require('./puppeteer.spec.js').addTests({
      product: 'Firefox',
      puppeteer: require('../experimental/puppeteer-firefox'),
      Errors: require('../experimental/puppeteer-firefox/Errors'),
      DeviceDescriptors: utils.requireRoot('DeviceDescriptors'),
      testRunner,
      slowMo,
      headless,
    });
  });
}

if (process.env.CI && testRunner.hasFocusedTestsOrSuites()) {
  console.error('ERROR: "focused" tests/suites are prohibitted on bots. Remove any "fit"/"fdescribe" declarations.');
  process.exit(1);
}

new Reporter(testRunner, utils.projectRoot());
testRunner.run();
