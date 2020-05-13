/**
 * Copyright 2020 Google Inc. All rights reserved.
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

export class SecurityDetails {
  _subjectName: string;
  _issuer: string;
  _validFrom: number;
  _validTo: number;
  _protocol: string;

  constructor(securityPayload: Protocol.Network.SecurityDetails) {
    this._subjectName = securityPayload.subjectName;
    this._issuer = securityPayload.issuer;
    this._validFrom = securityPayload.validFrom;
    this._validTo = securityPayload.validTo;
    this._protocol = securityPayload.protocol;
  }

  subjectName(): string {
    return this._subjectName;
  }

  issuer(): string {
    return this._issuer;
  }

  validFrom(): number {
    return this._validFrom;
  }

  validTo(): number {
    return this._validTo;
  }

  protocol(): string {
    return this._protocol;
  }
}
