# Puppeteer [![Build Status](https://travis-ci.com/GoogleChrome/puppeteer.svg?token=8jabovWqb8afz5RDcYqx&branch=master)](https://travis-ci.com/GoogleChrome/puppeteer) [![NPM puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer)

<img src="https://user-images.githubusercontent.com/39191/29330067-dfc2be5a-81ac-11e7-9cc2-c569dd5f078c.png" height="200" align="right">

###### [API](docs/api.md) | [FAQ](#faq) | [Contributing](https://github.com/GoogleChrome/puppeteer/blob/master/CONTRIBUTING.md)

> Puppeteer is a Node library which provides a high-level API to control [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) Chrome over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). It can also be configured to use full (non-headless) Chrome.

###### What can I do?

Most things that you can do manually in the browser can be done using Puppeteer! Here are a few examples to get you started:

* Generate screenshots and PDFs of pages.
* Crawl a SPA and generate pre-rendered content (i.e. "SSR").
* Scrape content from websites.
* Automate form submission, UI testing, keyboard input, etc.
* Create an up-to-date, automated testing environment. Run your tests directly in the latest version of Chrome using the latest JavaScript and browser features.
* Capture a [timeline trace](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference) of your site to help diagnose performance issues.

## Getting Started

### Installation

*Puppeteer requires Node version 7.10 or greater*

To use Puppeteer in your project, run:
```
yarn add puppeteer
# or "npm i puppeteer"
```

> **Note**: When you install Puppeteer, it downloads a recent version of Chromium (~71Mb Mac, ~90Mb Linux, ~110Mb Win) that is guaranteed to work with the API. However, you can [tell Puppeteer to use any Chromium executable](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#new-browseroptions) installed on the machine.

### Usage

Puppeteer will be familiar to using other browser testing frameworks. You create an instance
of `Browser`, open pages, and then manipulate them with [Puppeteer's API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#).

**Example** - navigating to https://example.com and saving a screenshot as *example.png*:

```js
const puppeteer = require('puppeteer');

(async() => {

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
await page.screenshot({path: 'example.png'});

browser.close();
})();
```

or, without `async`/`await`:

```js
const puppeteer = require('puppeteer');

puppeteer.launch()
  .then(browser => browser.newPage())
  .then(page => {
    page.goto('https://example.com').then(response => {
       page.screenshot({path: 'example.png'}).then(buffer => {
         browser.close();
       });
    });
  });
```

Puppeteer sets an initial page size to 800px x 600px, which defines the screenshot size. The page size can be customized  with [`Page.setViewport()`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetviewportviewport).

**Example** - create a PDF.

```js
const puppeteer = require('puppeteer');

(async() => {

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle'});
await page.pdf({path: 'hn.pdf', format: 'A4'});

browser.close();
})();
```

See [`Page.pdf()`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions) for more information about creating pdfs.

## Default runtime settings

**1. Uses Headless mode**

Puppeteer launches Chromium in [headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome). To launch a full version of Chromium, set the ['headless' option](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#new-browseroptions) when creating a browser:

```js
const browser = await puppeteer.launch({headless: false});
```

**2. Runs a bundled version of Chromium**

By default, Puppeteer downloads and uses a specific version of Chromium so its API
is guaranteed to work out of the box. To use Puppeteer with a different version of Chrome,
pass in the executable's path when creating a `Browser` instance:

```js
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```

See [`Browser`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#new-browseroptions) for more information.

**3. Creates a fresh user profile**

Puppeteer creates its own Chromium user profile which it **cleans up on every run**.

## API Documentation

Explore the [API documentation](docs/api.md) and [examples](https://github.com/GoogleChrome/puppeteer/tree/master/examples/) to learn more.

## Contributing to Puppeteer

Check out [contributing guide](https://github.com/GoogleChrome/puppeteer/blob/master/CONTRIBUTING.md) to get an overview of Puppeteer development.

# FAQ

#### Q: What is Puppeteer?

Puppeteer is a light-weight Node module to control headless Chrome using the latest version of the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

#### Q: Which Chromium version does Puppeteer use?

Look for `chromium_revision` in [package.json](https://github.com/GoogleChrome/puppeteer/blob/master/package.json).

Puppeteer bundles Chromium to insure that the latest features it uses are guaranteed to be available. As the DevTools protocol and browser improve over time, Puppeteer will be updated to depend on newer versions of Chromium.

#### Q: Does Puppeteer work with headless Chromium?

Yes. Puppeteer runs Chromium in [headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome) by default.

#### Q: Why do most of the API methods return promises?

Since Puppeteer's code is run by Node, it exists out-of-process to the controlled Chromium instance. This requires most of the API calls to be asynchronous to allow the necessary roundtrips to the browser.

#### Q: What is the difference between Puppeteer, Selenium / WebDriver, and PhantomJS?

Selenium / WebDriver is a well-established cross-browser API that is useful for testing cross-browser support.

Puppeteer works only with Chrome. However, many teams only run unit tests with a single browser (e.g. Phantom). In non-testing use cases, Puppeteer provides a powerful but simple API because it's only targeting one browser that enables you to rapidly develop automation scripts.

PhantomJS uses an older version of WebKit as it's browser rendering engine. Puppeteer uses the latest
versions of Chromium, which use the Blink rendering engine.

#### Q: How is this different than Chromeless?

[Chromeless](https://github.com/graphcool/chromeless) and Puppeteer are similar projects.
Both are Node libraries that provide a high-level JS APIs to control headless Chrome.

Chromeless is intended to work well with AWS Lambda to deploy parallel testing in a serverless setup.
Under the hood, it uses [chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface) to interface with the DevTools Protocol. In the future, it could use Puppeteer's API.

Puppeteer is smaller in size (ignoring the bundled version of Chrome) and does not use
dependencies to interface with Chrome. It's API is inspired by other popular automated testing
libraries like PhantomJS and [NightmareJS](http://www.nightmarejs.org/).

#### Q: Who maintains Puppeteer?

The Chrome DevTools team maintains the library, but we'd love your help and expertise on the project!
See [Contributing](https://github.com/GoogleChrome/puppeteer/blob/master/CONTRIBUTING.md).

#### Q: Why is the Chrome team building Puppeteer?

The goals are the project are simple:

- Provide a slim, canonical library that highlights the capabilities of the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).
- Provide a reference implementation for similar testing libraries. Eventually, these
other frameworks could adopt Puppeteer as their foundational layer.
- Grow the adoption of headless/automated browser testing.
- Help dogfood new DevTools Protocol features...and catch bugs!
- Learn more about the pain points of automated browser testing and help fill those gaps.
