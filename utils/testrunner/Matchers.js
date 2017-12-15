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

module.exports = class Matchers {
  constructor(customMatchers = {}) {
    this._matchers = {};
    Object.assign(this._matchers, DefaultMatchers);
    Object.assign(this._matchers, customMatchers);
    this.expect = this.expect.bind(this);
  }

  addMatcher(name, matcher) {
    this._matchers[name] = matcher;
  }

  expect(value) {
    return new Expect(value, this._matchers);
  }
};

class Expect {
  constructor(value, matchers) {
    this.not = {};
    this.not.not = this;
    for (const matcherName of Object.keys(matchers)) {
      const matcher = matchers[matcherName];
      this[matcherName] = applyMatcher.bind(null, matcherName, matcher, false, value);
      this.not[matcherName] = applyMatcher.bind(null, matcherName, matcher, true, value);
    }

    function applyMatcher(matcherName, matcher, inverse, value, ...args) {
      const result = matcher.call(null, value, ...args);
      const message = `expect.${matcherName} failed` + (result.message ? `: ${result.message}` : '');
      console.assert(result.pass !== inverse, message);
    }
  }
}

const DefaultMatchers = {
  toBe: function(value, other, message) {
    message = message || `${value} == ${other}`;
    return { pass: value === other, message };
  },

  toBeFalsy: function(value, message) {
    message = message || `${value}`;
    return { pass: !value, message };
  },

  toBeTruthy: function(value, message) {
    message = message || `${value}`;
    return { pass: !!value, message };
  },

  toBeGreaterThan: function(value, other, message) {
    message = message || `${value} > ${other}`;
    return { pass: value > other, message };
  },

  toBeGreaterThanOrEqual: function(value, other, message) {
    message = message || `${value} >= ${other}`;
    return { pass: value >= other, message };
  },

  toBeLessThan: function(value, other, message) {
    message = message || `${value} < ${other}`;
    return { pass: value < other, message };
  },

  toBeLessThanOrEqual: function(value, other, message) {
    message = message || `${value} <= ${other}`;
    return { pass: value <= other, message };
  },

  toBeNull: function(value, message) {
    message = message || `${value} == null`;
    return { pass: value === null, message };
  },

  toContain: function(value, other, message) {
    message = message || `${value} ⊇ ${other}`;
    return { pass: value.includes(other), message };
  },

  toEqual: function(value, other, message) {
    message = message || `Object::${value.constructor.name} ≈ Object::${other.constructor.name}`;
    return { pass: JSON.stringify(value) === JSON.stringify(other), message };
  },

  toBeCloseTo: function(value, other, precision, message) {
    return {
      pass: Math.abs(value - other) < Math.pow(10, -precision),
      message
    };
  }
};
