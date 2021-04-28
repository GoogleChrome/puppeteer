/**
 * Copyright 2021 Google Inc. All rights reserved.
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

import expect from 'expect';
import {
  getTestState,
  setupTestPageAndContextHooks,
  setupTestBrowserHooks,
  itFailsFirefox,
} from './mocha-utils'; // eslint-disable-line import/extensions
import utils from './utils.js';

describe('Input.drag', function () {
  setupTestBrowserHooks();
  setupTestPageAndContextHooks();
  it('should throw exception if not enabled before using', async() => {
    const { page, server } = getTestState();

    await page.goto(server.PREFIX + '/input/drag-and-drop.html');
    const draggable = await page.$('#drag');

    try {
      await draggable.drag({ x: 1, y: 1 });
    } catch(error) {
      expect(error.message).toContain('Drag Interception is not enabled!');
    }
  });
  it('should emit a dragIntercepted event when dragged', async () => {
    const { page, server } = getTestState();

    await page.goto(server.PREFIX + '/input/drag-and-drop.html');
    await page.setDragInterception(true);
    const draggable = await page.$('#drag');
    const data = await draggable.drag({ x: 1, y: 1 });

    expect(data.items.length).toBe(1);
    expect(await page.evaluate(() => globalThis.didDragStart)).toBe(true);
  });
  it('can be dropped', async () => {
    const { page, server } = getTestState();

    await page.goto(server.PREFIX + '/input/drag-and-drop.html');
    await page.setDragInterception(true);
    const draggable = await page.$('#drag');
    const dropzone = await page.$('#drop');
    const data = await draggable.drag({ x: 1, y: 1 });
    await dropzone.drop(data);

    expect(await page.evaluate(() => globalThis.didDragStart)).toBe(true);
    expect(await page.evaluate(() => globalThis.didDragEnter)).toBe(true);
    expect(await page.evaluate(() => globalThis.didDragOver)).toBe(true);
    expect(await page.evaluate(() => globalThis.didDrop)).toBe(true);
  });
  it('can be disabled', async () => {
    const { page, server } = getTestState();

    await page.goto(server.PREFIX + '/input/drag-and-drop.html');
    await page.setDragInterception(true);
    const draggable = await page.$('#drag');
    await draggable.drag({ x: 1, y: 1 });
    await page.setDragInterception(false);

    try {
      await draggable.drag({ x: 1, y: 1 });
    } catch(error) {
      expect(error.message).toContain('Drag Interception is not enabled!');
    }
  });
});
