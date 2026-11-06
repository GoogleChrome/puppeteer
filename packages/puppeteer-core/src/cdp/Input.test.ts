/**
 * @license
 * Copyright 2026 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import {describe, it} from 'node:test';

import expect from 'expect';

import type {CDPSession} from '../api/CDPSession.js';

import {CdpKeyboard} from './Input.js';

interface DispatchedKeyEvent {
  type: string;
  modifiers?: number;
  key?: string;
  code?: string;
  text?: string;
  windowsVirtualKeyCode?: number;
  location?: number;
}

class MockCDPSession {
  events: DispatchedKeyEvent[] = [];

  async send(
    method: string,
    params?: Record<string, unknown>,
  ): Promise<unknown> {
    if (method === 'Input.dispatchKeyEvent') {
      this.events.push(params as unknown as DispatchedKeyEvent);
    }
    return {};
  }
}

describe('CdpKeyboard modifier tracking', () => {
  it('does not clear Shift modifier when one of multiple held Shift keys is released', async () => {
    const client = new MockCDPSession();
    const keyboard = new CdpKeyboard(client as unknown as CDPSession);

    await keyboard.down('ShiftLeft');
    expect(keyboard._modifiers).toBe(8);

    await keyboard.down('ShiftRight');
    expect(keyboard._modifiers).toBe(8);

    // Releasing ShiftRight must keep Shift modifier because ShiftLeft is still held
    await keyboard.up('ShiftRight');
    expect(keyboard._modifiers).toBe(8);

    const shiftRightKeyUp = client.events[client.events.length - 1];
    expect(shiftRightKeyUp).toMatchObject({
      type: 'keyUp',
      code: 'ShiftRight',
      modifiers: 8,
    });

    // Typing while ShiftLeft is still down should produce uppercase 'A'
    await keyboard.down('KeyA');
    const aKeyDown = client.events[client.events.length - 1];
    expect(aKeyDown).toMatchObject({
      type: 'keyDown',
      key: 'A',
      text: 'A',
      modifiers: 8,
    });

    await keyboard.up('KeyA');

    // Releasing ShiftLeft clears the Shift modifier since no Shift keys remain
    await keyboard.up('ShiftLeft');
    expect(keyboard._modifiers).toBe(0);

    const shiftLeftKeyUp = client.events[client.events.length - 1];
    expect(shiftLeftKeyUp).toMatchObject({
      type: 'keyUp',
      code: 'ShiftLeft',
      modifiers: 0,
    });
  });

  it('does not clear Control modifier when one of multiple Control keys is released', async () => {
    const client = new MockCDPSession();
    const keyboard = new CdpKeyboard(client as unknown as CDPSession);

    await keyboard.down('ControlLeft');
    expect(keyboard._modifiers).toBe(2);

    await keyboard.down('ControlRight');
    expect(keyboard._modifiers).toBe(2);

    await keyboard.up('ControlLeft');
    expect(keyboard._modifiers).toBe(2);

    const controlLeftKeyUp = client.events[client.events.length - 1];
    expect(controlLeftKeyUp).toMatchObject({
      type: 'keyUp',
      code: 'ControlLeft',
      modifiers: 2,
    });

    await keyboard.up('ControlRight');
    expect(keyboard._modifiers).toBe(0);
  });

  it('does not clear Alt modifier when one of multiple Alt keys is released', async () => {
    const client = new MockCDPSession();
    const keyboard = new CdpKeyboard(client as unknown as CDPSession);

    await keyboard.down('AltLeft');
    expect(keyboard._modifiers).toBe(1);

    await keyboard.down('AltRight');
    expect(keyboard._modifiers).toBe(1);

    await keyboard.up('AltRight');
    expect(keyboard._modifiers).toBe(1);

    const altRightKeyUp = client.events[client.events.length - 1];
    expect(altRightKeyUp).toMatchObject({
      type: 'keyUp',
      code: 'AltRight',
      modifiers: 1,
    });

    await keyboard.up('AltLeft');
    expect(keyboard._modifiers).toBe(0);
  });

  it('does not clear Meta modifier when one of multiple Meta keys is released', async () => {
    const client = new MockCDPSession();
    const keyboard = new CdpKeyboard(client as unknown as CDPSession);

    await keyboard.down('MetaLeft');
    expect(keyboard._modifiers).toBe(4);

    await keyboard.down('MetaRight');
    expect(keyboard._modifiers).toBe(4);

    await keyboard.up('MetaRight');
    expect(keyboard._modifiers).toBe(4);

    const metaRightKeyUp = client.events[client.events.length - 1];
    expect(metaRightKeyUp).toMatchObject({
      type: 'keyUp',
      code: 'MetaRight',
      modifiers: 4,
    });

    await keyboard.up('MetaLeft');
    expect(keyboard._modifiers).toBe(0);
  });

  it('does not clear modifier when releasing an unpressed modifier side while the other side is held', async () => {
    const client = new MockCDPSession();
    const keyboard = new CdpKeyboard(client as unknown as CDPSession);

    await keyboard.down('ShiftRight');
    expect(keyboard._modifiers).toBe(8);

    // Call up('ShiftLeft') which was never pressed
    await keyboard.up('ShiftLeft');
    expect(keyboard._modifiers).toBe(8);

    await keyboard.up('ShiftRight');
    expect(keyboard._modifiers).toBe(0);
  });
});
