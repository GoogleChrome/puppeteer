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

export class Multimap<K, V> {
  private _map = new Map<K, Set<V>>();

  public set(key: K, value: V): void {
    let set = this._map.get(key);
    if (!set) {
      set = new Set();
      this._map.set(key, set);
    }
    set.add(value);
  }

  public get(key: K): Set<V> {
    let result = this._map.get(key);
    if (!result) result = new Set();
    return result;
  }

  public has(key: K): boolean {
    return this._map.has(key);
  }

  public hasValue(key: K, value: V): boolean {
    const set = this._map.get(key);
    if (!set) return false;
    return set.has(value);
  }

  get size(): number {
    return this._map.size;
  }

  public delete(key: K, value: V): boolean {
    const values = this.get(key);
    const result = values.delete(value);
    if (!values.size) this._map.delete(key);
    return result;
  }

  public deleteAll(key: K) {
    this._map.delete(key);
  }

  public firstValue(key: K): V | undefined {
    const set = this._map.get(key);
    if (!set) return undefined;
    return set.values().next().value;
  }

  public firstKey(): K | undefined {
    return this._map.keys().next().value;
  }

  public valuesArray(): V[] {
    const result: V[] = [];
    for (const set of this._map.values()) result.push(...Array.from(set.values()));
    return result;
  }

  public keysArray(): K[] {
    return Array.from(this._map.keys());
  }

  public clear() {
    this._map.clear();
  }
}
