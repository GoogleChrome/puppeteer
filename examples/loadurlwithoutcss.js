/**
 * Copyright 2017 Google Inc., PhantomJS Authors All rights reserved.
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

let Browser = require('../lib/Browser');

if (process.argv.length < 3) {
  console.log('Usage: loadurlwithoutcss.js URL');
  return;
}

let address = process.argv[2];

let browser = new Browser({headless: false});
browser.newPage().then(async page => {
  page.setRequestInterceptor(request => {
    if (request.url.endsWith('.css'))
      request.abort();
    else
      request.continue();
  });
  let success = await page.navigate(address);
  if (!success)
    console.log('Unable to load the address!');
  browser.close();
});
