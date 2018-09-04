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

const Message = require('../Message');

module.exports.ensureReleasedAPILinks = function(sources, version) {
  // Release version is everything that doesn't include "-".
  const apiLinkRegex = /https:\/\/github.com\/GoogleChrome\/puppeteer\/blob\/v[^/]*\/docs\/api.md/ig;
  const lastReleasedAPI = `https://github.com/GoogleChrome/puppeteer/blob/v${version.split('-')[0]}/docs/api.md`;

  const messages = [];
  for (const source of sources) {
    const text = source.text();
    const newText = text.replace(apiLinkRegex, lastReleasedAPI);
    if (source.setText(newText))
      messages.push(Message.warning(`GEN: updated ${source.projectPath()}`));
  }
  return messages;
};

module.exports.runCommands = function(sources, version) {
  // Release version is everything that doesn't include "-".
  const isReleaseVersion = !version.includes('-');

  const messages = [];
  const commands = [];
  for (const source of sources) {
    const text = source.text();
    const commandStartRegex = /<!--\s*gen:([a-z-]+)\s*-->/ig;
    const commandEndRegex = /<!--\s*gen:stop\s*-->/ig;
    let start;

    while (start = commandStartRegex.exec(text)) { // eslint-disable-line no-cond-assign
      commandEndRegex.lastIndex = commandStartRegex.lastIndex;
      const end = commandEndRegex.exec(text);
      if (!end) {
        messages.push(Message.error(`Failed to find 'gen:stop' for command ${start[0]}`));
        return messages;
      }
      const name = start[1];
      const from = commandStartRegex.lastIndex;
      const to = end.index;
      const originalText = text.substring(from, to);
      commands.push({name, from, to, originalText, source});
      commandStartRegex.lastIndex = commandEndRegex.lastIndex;
    }
  }

  const changedSources = new Set();
  // Iterate commands in reverse order so that edits don't conflict.
  commands.sort((a, b) => b.from - a.from);
  for (const command of commands) {
    let newText = null;
    if (command.name === 'version')
      newText = isReleaseVersion ? 'v' + version : 'Tip-Of-Tree';
    else if (command.name === 'empty-if-release')
      newText = isReleaseVersion ? '' : command.originalText;
    else if (command.name === 'toc')
      newText = generateTableOfContents(command.source.text().substring(command.to));
    if (newText === null)
      messages.push(Message.error(`Unknown command 'gen:${command.name}'`));
    else if (applyCommand(command, newText))
      changedSources.add(command.source);
  }
  for (const source of changedSources)
    messages.push(Message.warning(`GEN: updated ${source.projectPath()}`));
  return messages;
};

/**
 * @param {{name: string, from: number, to: number, source: !Source}} command
 * @param {string} editText
 * @return {boolean}
 */
function applyCommand(command, editText) {
  const text = command.source.text();
  const newText = text.substring(0, command.from) + editText + text.substring(command.to);
  return command.source.setText(newText);
}

function generateTableOfContents(mdText) {
  const ids = new Set();
  const titles = mdText.split('\n').map(line => line.trim()).filter(line => line.startsWith('#'));
  const tocEntries = [];
  for (const title of titles) {
    const [, nesting, name] = title.match(/^(#+)\s+(.*)$/);
    const id = name.trim().toLowerCase().replace(/\s/g, '-').replace(/[^-0-9a-zа-яё]/ig, '');
    let dedupId = id;
    let counter = 0;
    while (ids.has(dedupId))
      dedupId = id + '-' + (++counter);
    ids.add(dedupId);
    tocEntries.push({
      level: nesting.length,
      name,
      id: dedupId
    });
  }

  const minLevel = Math.min(...tocEntries.map(entry => entry.level));
  tocEntries.forEach(entry => entry.level -= minLevel);
  return '\n' + tocEntries.map(entry => {
    const prefix = entry.level % 2 === 0 ? '-' : '*';
    const padding = '  '.repeat(entry.level);
    return `${padding}${prefix} [${entry.name}](#${entry.id})`;
  }).join('\n') + '\n';
}
