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
import { EventEmitter } from 'events';
import debug from 'debug';
import { assert } from './helper';
import { Events } from './Events';
import { ConnectionTransport, AnyFunction } from './types';

const debugProtocol = debug('puppeteer:protocol');

export class Connection extends EventEmitter {
  private _lastId = 0;
  public closed = false;
  private _callbacks = new Map<number, {resolve: AnyFunction, reject: AnyFunction, error: Error, method: string}>();
  private _sessions = new Map<string, CDPSession>();
  
  constructor(private _url: string, private _transport: ConnectionTransport, private delay = 0) {
    super();

    _transport.onmessage = this._onMessage;
    _transport.onclose = this._onClose;
  }

  static fromSession(session: CDPSession): Connection {
    return session._connection!;
  }

  session(sessionId: string): CDPSession | null {
    return this._sessions.get(sessionId) || null;
  }

  url(): string {
    return this._url;
  }

  send(method: string, params: any = {}): Promise<any> {
    const id = this._rawSend({method, params});
    return new Promise((resolve, reject) => {
      this._callbacks.set(id, {resolve, reject, error: new Error(), method});
    });
  }

  _rawSend(message: any): number {
    const id = ++this._lastId;
    message = JSON.stringify(Object.assign({}, message, {id}));
    debugProtocol('SEND ► ' + message);
    this._transport.send(message);
    return id;
  }

  private _onMessage = async (message: string) => {
    if (this.delay)
      await new Promise(f => setTimeout(f, this.delay));
    debugProtocol('◀ RECV ' + message);
    const object = JSON.parse(message);
    if (object.method === 'Target.attachedToTarget') {
      const sessionId = object.params.sessionId;
      const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
      this._sessions.set(sessionId, session);
    } else if (object.method === 'Target.detachedFromTarget') {
      const session = this._sessions.get(object.params.sessionId);
      if (session) {
        session._onClosed();
        this._sessions.delete(object.params.sessionId);
      }
    }
    if (object.sessionId) {
      const session = this._sessions.get(object.sessionId);
      if (session)
        session._onMessage(object);
    } else if (object.id) {
      const callback = this._callbacks.get(object.id);
      // Callbacks could be all rejected if someone has called `.dispose()`.
      if (callback) {
        this._callbacks.delete(object.id);
        if (object.error)
          callback.reject(createProtocolError(callback.error, callback.method, object));
        else
          callback.resolve(object.result);
      }
    } else {
      this.emit(object.method, object.params);
    }
  }

  private _onClose = () => {
    if (this.closed)
      return;
    this.closed = true;
    this._transport.onmessage = undefined;
    this._transport.onclose = undefined;
    for (const callback of this._callbacks.values())
      callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
    this._callbacks.clear();
    for (const session of this._sessions.values())
      session._onClosed();
    this._sessions.clear();
    this.emit(Events.Connection.Disconnected);
  }

  dispose() {
    this._onClose();
    this._transport.close();
  }

  async createSession(targetInfo: Protocol.Target.TargetInfo): Promise<CDPSession> {
    const {sessionId} = await this.send('Target.attachToTarget', {targetId: targetInfo.targetId, flatten: true});
    return this._sessions.get(sessionId)!;
  }
}

export class CDPSession extends EventEmitter {
  _callbacks = new Map<number, {resolve: AnyFunction, reject: AnyFunction, error: Error, method: string}>();
  _connection: Connection | null;

  constructor(connection: Connection, private _targetType: string, private _sessionId: string) {
    super();
    this._connection = connection
  }

  send(method: string, params: object = {}): Promise<any> {
    if (!this._connection)
      return Promise.reject(new Error(`Protocol error (${method}): Session closed. Most likely the ${this._targetType} has been closed.`));
    const id = this._connection._rawSend({sessionId: this._sessionId, method, params});
    return new Promise((resolve, reject) => {
      this._callbacks.set(id, {resolve, reject, error: new Error(), method});
    });
  }

  _onMessage(object: {id?: number, method: string, params: object, error: {message: string, data: any}, result?: any}) {
    if (object.id && this._callbacks.has(object.id)) {
      const callback = this._callbacks.get(object.id)!;
      this._callbacks.delete(object.id);
      if (object.error)
        callback.reject(createProtocolError(callback.error, callback.method, object));
      else
        callback.resolve(object.result);
    } else {
      assert(!object.id);
      this.emit(object.method, object.params);
    }
  }

  async detach() {
    if (!this._connection)
      throw new Error(`Session already detached. Most likely the ${this._targetType} has been closed.`);
    await this._connection.send('Target.detachFromTarget',  {sessionId: this._sessionId});
  }

  _onClosed() {
    for (const callback of this._callbacks.values())
      callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
    this._callbacks.clear();
    this._connection = null;
    this.emit(Events.CDPSession.Disconnected);
  }
}

function createProtocolError(error: Error, method: string, object: {error: {message: string, data: any}}): Error {
  let message = `Protocol error (${method}): ${object.error.message}`;
  if ('data' in object.error)
    message += ` ${object.error.data}`;
  return rewriteError(error, message);
}

function rewriteError(error: Error, message: string): Error {
  error.message = message;
  return error;
}
