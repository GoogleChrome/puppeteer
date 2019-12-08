/**
 * Copyright 2018 Google Inc. All rights reserved.
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

import { helper, debugError } from './helper';
import { AnyFunction, ConnectionTransport } from './types';

export class PipeTransport implements ConnectionTransport {
  public onmessage?: (message: string) => void;
  public onclose?: () => void;

  private _pipeWrite: NodeJS.WritableStream | null;
  private _pendingMessage = '';
  private _eventListeners: Array<{ emitter: NodeJS.EventEmitter; eventName: string | symbol; handler: AnyFunction }>;

  constructor(pipeWrite: NodeJS.WritableStream, pipeRead: NodeJS.ReadableStream) {
    this._pipeWrite = pipeWrite;
    this._eventListeners = [
      helper.addEventListener(pipeRead, 'data', buffer => this._dispatch(buffer)),
      helper.addEventListener(pipeRead, 'close', () => {
        if (this.onclose) this.onclose.call(null);
      }),
      helper.addEventListener(pipeRead, 'error', debugError),
      helper.addEventListener(pipeWrite, 'error', debugError)
    ];
  }

  public send(message: string) {
    if (!this._pipeWrite)
      throw new Error(`Cannot send message. PipeTransport has been closed.`);

    this._pipeWrite.write(message);
    this._pipeWrite.write('\0');
  }

  private _dispatch(buffer: Buffer) {
    let end = buffer.indexOf('\0');
    if (end === -1) {
      this._pendingMessage += buffer.toString();
      return;
    }
    const message = this._pendingMessage + buffer.toString(undefined, 0, end);
    if (this.onmessage) this.onmessage.call(null, message);

    let start = end + 1;
    end = buffer.indexOf('\0', start);
    while (end !== -1) {
      if (this.onmessage) this.onmessage.call(null, buffer.toString(undefined, start, end));
      start = end + 1;
      end = buffer.indexOf('\0', start);
    }
    this._pendingMessage = buffer.toString(undefined, start);
  }

  public close() {
    this._pipeWrite = null;
    helper.removeEventListeners(this._eventListeners);
  }
}
