##### Released APIs: [v1.6.0](https://github.com/GoogleChrome/puppeteer/blob/v1.6.0/docs/api.md) | [v1.5.0](https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md) | [v1.4.0](https://github.com/GoogleChrome/puppeteer/blob/v1.4.0/docs/api.md) | [v1.3.0](https://github.com/GoogleChrome/puppeteer/blob/v1.3.0/docs/api.md) | [v1.2.0](https://github.com/GoogleChrome/puppeteer/blob/v1.2.0/docs/api.md) | [v1.1.1](https://github.com/GoogleChrome/puppeteer/blob/v1.1.1/docs/api.md) | [v1.1.0](https://github.com/GoogleChrome/puppeteer/blob/v1.1.0/docs/api.md) | [v1.0.0](https://github.com/GoogleChrome/puppeteer/blob/v1.0.0/docs/api.md) | [v0.13.0](https://github.com/GoogleChrome/puppeteer/blob/v0.13.0/docs/api.md) | [v0.12.0](https://github.com/GoogleChrome/puppeteer/blob/v0.12.0/docs/api.md) | [v0.11.0](https://github.com/GoogleChrome/puppeteer/blob/v0.11.0/docs/api.md) | [v0.10.2](https://github.com/GoogleChrome/puppeteer/blob/v0.10.2/docs/api.md) | [v0.10.1](https://github.com/GoogleChrome/puppeteer/blob/v0.10.1/docs/api.md) | [v0.10.0](https://github.com/GoogleChrome/puppeteer/blob/v0.10.0/docs/api.md) | [v0.9.0](https://github.com/GoogleChrome/puppeteer/blob/v0.9.0/docs/api.md)

# Puppeteer API <!-- GEN:version -->Tip-Of-Tree<!-- GEN:stop-->

术语表：
- 导航也可以当做页面跳转。

<!-- GEN:empty-if-release -->
Next Release: **Aug 9, 2018**
<!-- GEN:stop -->


##### Table of Contents

有暂时未翻译内容

<!-- GEN:toc -->
- [Overview](#overview)
- [Environment Variables](#environment-variables)
- [Working with Chrome Extensions](#working-with-chrome-extensions)
- [class: Puppeteer](#class-puppeteer)
  * [puppeteer.connect(options)](#puppeteerconnectoptions)
  * [puppeteer.createBrowserFetcher([options])](#puppeteercreatebrowserfetcheroptions)
  * [puppeteer.defaultArgs()](#puppeteerdefaultargs)
  * [puppeteer.executablePath()](#puppeteerexecutablepath)
  * [puppeteer.launch([options])](#puppeteerlaunchoptions)
- [class: BrowserFetcher](#class-browserfetcher)
  * [browserFetcher.canDownload(revision)](#browserfetchercandownloadrevision)
  * [browserFetcher.download(revision[, progressCallback])](#browserfetcherdownloadrevision-progresscallback)
  * [browserFetcher.localRevisions()](#browserfetcherlocalrevisions)
  * [browserFetcher.platform()](#browserfetcherplatform)
  * [browserFetcher.remove(revision)](#browserfetcherremoverevision)
  * [browserFetcher.revisionInfo(revision)](#browserfetcherrevisioninforevision)
- [class: Browser](#class-browser)
  * [event: 'disconnected'](#event-disconnected)
  * [event: 'targetchanged'](#event-targetchanged)
  * [event: 'targetcreated'](#event-targetcreated)
  * [event: 'targetdestroyed'](#event-targetdestroyed)
  * [browser.browserContexts()](#browserbrowsercontexts)
  * [browser.close()](#browserclose)
  * [browser.createIncognitoBrowserContext()](#browsercreateincognitobrowsercontext)
  * [browser.disconnect()](#browserdisconnect)
  * [browser.newPage()](#browsernewpage)
  * [browser.pages()](#browserpages)
  * [browser.process()](#browserprocess)
  * [browser.targets()](#browsertargets)
  * [browser.userAgent()](#browseruseragent)
  * [browser.version()](#browserversion)
  * [browser.wsEndpoint()](#browserwsendpoint)
- [class: BrowserContext](#class-browsercontext)
  * [event: 'targetchanged'](#event-targetchanged-1)
  * [event: 'targetcreated'](#event-targetcreated-1)
  * [event: 'targetdestroyed'](#event-targetdestroyed-1)
  * [browserContext.browser()](#browsercontextbrowser)
  * [browserContext.close()](#browsercontextclose)
  * [browserContext.isIncognito()](#browsercontextisincognito)
  * [browserContext.newPage()](#browsercontextnewpage)
  * [browserContext.targets()](#browsercontexttargets)
- [class: Page](#class-page)
  * [event: 'close'](#event-close)
  * [event: 'console'](#event-console)
  * [event: 'dialog'](#event-dialog)
  * [event: 'domcontentloaded'](#event-domcontentloaded)
  * [event: 'error'](#event-error)
  * [event: 'frameattached'](#event-frameattached)
  * [event: 'framedetached'](#event-framedetached)
  * [event: 'framenavigated'](#event-framenavigated)
  * [event: 'load'](#event-load)
  * [event: 'metrics'](#event-metrics)
  * [event: 'pageerror'](#event-pageerror)
  * [event: 'request'](#event-request)
  * [event: 'requestfailed'](#event-requestfailed)
  * [event: 'requestfinished'](#event-requestfinished)
  * [event: 'response'](#event-response)
  * [event: 'workercreated'](#event-workercreated)
  * [event: 'workerdestroyed'](#event-workerdestroyed)
  * [page.$(selector)](#pageselector)
  * [page.$$(selector)](#pageselector-1)
  * [page.$$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args)
  * [page.$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args-1)
  * [page.$x(expression)](#pagexexpression)
  * [page.addScriptTag(options)](#pageaddscripttagoptions)
  * [page.addStyleTag(options)](#pageaddstyletagoptions)
  * [page.authenticate(credentials)](#pageauthenticatecredentials)
  * [page.bringToFront()](#pagebringtofront)
  * [page.browser()](#pagebrowser)
  * [page.click(selector[, options])](#pageclickselector-options)
  * [page.close(options)](#pagecloseoptions)
  * [page.content()](#pagecontent)
  * [page.cookies(...urls)](#pagecookiesurls)
  * [page.coverage](#pagecoverage)
  * [page.deleteCookie(...cookies)](#pagedeletecookiecookies)
  * [page.emulate(options)](#pageemulateoptions)
  * [page.emulateMedia(mediaType)](#pageemulatemediamediatype)
  * [page.evaluate(pageFunction, ...args)](#pageevaluatepagefunction-args)
  * [page.evaluateHandle(pageFunction, ...args)](#pageevaluatehandlepagefunction-args)
  * [page.evaluateOnNewDocument(pageFunction, ...args)](#pageevaluateonnewdocumentpagefunction-args)
  * [page.exposeFunction(name, puppeteerFunction)](#pageexposefunctionname-puppeteerfunction)
  * [page.focus(selector)](#pagefocusselector)
  * [page.frames()](#pageframes)
  * [page.goBack(options)](#pagegobackoptions)
  * [page.goForward(options)](#pagegoforwardoptions)
  * [page.goto(url, options)](#pagegotourl-options)
  * [page.hover(selector)](#pagehoverselector)
  * [page.isClosed()](#pageisclosed)
  * [page.keyboard](#pagekeyboard)
  * [page.mainFrame()](#pagemainframe)
  * [page.metrics()](#pagemetrics)
  * [page.mouse](#pagemouse)
  * [page.pdf(options)](#pagepdfoptions)
  * [page.queryObjects(prototypeHandle)](#pagequeryobjectsprototypehandle)
  * [page.reload(options)](#pagereloadoptions)
  * [page.screenshot([options])](#pagescreenshotoptions)
  * [page.select(selector, ...values)](#pageselectselector-values)
  * [page.setBypassCSP(enabled)](#pagesetbypasscspenabled)
  * [page.setCacheEnabled(enabled)](#pagesetcacheenabledenabled)
  * [page.setContent(html)](#pagesetcontenthtml)
  * [page.setCookie(...cookies)](#pagesetcookiecookies)
  * [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)
  * [page.setExtraHTTPHeaders(headers)](#pagesetextrahttpheadersheaders)
  * [page.setJavaScriptEnabled(enabled)](#pagesetjavascriptenabledenabled)
  * [page.setOfflineMode(enabled)](#pagesetofflinemodeenabled)
  * [page.setRequestInterception(value)](#pagesetrequestinterceptionvalue)
  * [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
  * [page.setViewport(viewport)](#pagesetviewportviewport)
  * [page.tap(selector)](#pagetapselector)
  * [page.target()](#pagetarget)
  * [page.title()](#pagetitle)
  * [page.touchscreen](#pagetouchscreen)
  * [page.tracing](#pagetracing)
  * [page.type(selector, text[, options])](#pagetypeselector-text-options)
  * [page.url()](#pageurl)
  * [page.viewport()](#pageviewport)
  * [page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#pagewaitforselectororfunctionortimeout-options-args)
  * [page.waitForFunction(pageFunction[, options[, ...args]])](#pagewaitforfunctionpagefunction-options-args)
  * [page.waitForNavigation(options)](#pagewaitfornavigationoptions)
  * [page.waitForRequest(urlOrPredicate, options)](#pagewaitforrequesturlorpredicate-options)
  * [page.waitForResponse(urlOrPredicate, options)](#pagewaitforresponseurlorpredicate-options)
  * [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options)
  * [page.waitForXPath(xpath[, options])](#pagewaitforxpathxpath-options)
  * [page.workers()](#pageworkers)
- [class: Worker](#class-worker)
  * [worker.evaluate(pageFunction, ...args)](#workerevaluatepagefunction-args)
  * [worker.evaluateHandle(pageFunction, ...args)](#workerevaluatehandlepagefunction-args)
  * [worker.executionContext()](#workerexecutioncontext)
  * [worker.url()](#workerurl)
- [class: Keyboard](#class-keyboard)
  * [keyboard.down(key[, options])](#keyboarddownkey-options)
  * [keyboard.press(key[, options])](#keyboardpresskey-options)
  * [keyboard.sendCharacter(char)](#keyboardsendcharacterchar)
  * [keyboard.type(text, options)](#keyboardtypetext-options)
  * [keyboard.up(key)](#keyboardupkey)
- [class: Mouse](#class-mouse)
  * [mouse.click(x, y, [options])](#mouseclickx-y-options)
  * [mouse.down([options])](#mousedownoptions)
  * [mouse.move(x, y, [options])](#mousemovex-y-options)
  * [mouse.up([options])](#mouseupoptions)
- [class: Touchscreen](#class-touchscreen)
  * [touchscreen.tap(x, y)](#touchscreentapx-y)
- [class: Tracing](#class-tracing)
  * [tracing.start(options)](#tracingstartoptions)
  * [tracing.stop()](#tracingstop)
- [class: Dialog](#class-dialog)
  * [dialog.accept([promptText])](#dialogacceptprompttext)
  * [dialog.defaultValue()](#dialogdefaultvalue)
  * [dialog.dismiss()](#dialogdismiss)
  * [dialog.message()](#dialogmessage)
  * [dialog.type()](#dialogtype)
- [class: ConsoleMessage](#class-consolemessage)
  * [consoleMessage.args()](#consolemessageargs)
  * [consoleMessage.text()](#consolemessagetext)
  * [consoleMessage.type()](#consolemessagetype)
- [class: Frame](#class-frame)
  * [frame.$(selector)](#frameselector)
  * [frame.$$(selector)](#frameselector-1)
  * [frame.$$eval(selector, pageFunction[, ...args])](#frameevalselector-pagefunction-args)
  * [frame.$eval(selector, pageFunction[, ...args])](#frameevalselector-pagefunction-args-1)
  * [frame.$x(expression)](#framexexpression)
  * [frame.addScriptTag(options)](#frameaddscripttagoptions)
  * [frame.addStyleTag(options)](#frameaddstyletagoptions)
  * [frame.childFrames()](#framechildframes)
  * [frame.click(selector[, options])](#frameclickselector-options)
  * [frame.content()](#framecontent)
  * [frame.evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args)
  * [frame.evaluateHandle(pageFunction, ...args)](#frameevaluatehandlepagefunction-args)
  * [frame.executionContext()](#frameexecutioncontext)
  * [frame.focus(selector)](#framefocusselector)
  * [frame.hover(selector)](#framehoverselector)
  * [frame.isDetached()](#frameisdetached)
  * [frame.name()](#framename)
  * [frame.parentFrame()](#frameparentframe)
  * [frame.select(selector, ...values)](#frameselectselector-values)
  * [frame.setContent(html)](#framesetcontenthtml)
  * [frame.tap(selector)](#frametapselector)
  * [frame.title()](#frametitle)
  * [frame.type(selector, text[, options])](#frametypeselector-text-options)
  * [frame.url()](#frameurl)
  * [frame.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args)
  * [frame.waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args)
  * [frame.waitForSelector(selector[, options])](#framewaitforselectorselector-options)
  * [frame.waitForXPath(xpath[, options])](#framewaitforxpathxpath-options)
- [class: ExecutionContext](#class-executioncontext)
  * [executionContext.evaluate(pageFunction, ...args)](#executioncontextevaluatepagefunction-args)
  * [executionContext.evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args)
  * [executionContext.frame()](#executioncontextframe)
  * [executionContext.queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle)
- [class: JSHandle](#class-jshandle)
  * [jsHandle.asElement()](#jshandleaselement)
  * [jsHandle.dispose()](#jshandledispose)
  * [jsHandle.executionContext()](#jshandleexecutioncontext)
  * [jsHandle.getProperties()](#jshandlegetproperties)
  * [jsHandle.getProperty(propertyName)](#jshandlegetpropertypropertyname)
  * [jsHandle.jsonValue()](#jshandlejsonvalue)
- [class: ElementHandle](#class-elementhandle)
  * [elementHandle.$(selector)](#elementhandleselector)
  * [elementHandle.$$(selector)](#elementhandleselector-1)
  * [elementHandle.$$eval(selector, pageFunction, ...args)](#elementhandleevalselector-pagefunction-args)
  * [elementHandle.$eval(selector, pageFunction, ...args)](#elementhandleevalselector-pagefunction-args-1)
  * [elementHandle.$x(expression)](#elementhandlexexpression)
  * [elementHandle.asElement()](#elementhandleaselement)
  * [elementHandle.boundingBox()](#elementhandleboundingbox)
  * [elementHandle.boxModel()](#elementhandleboxmodel)
  * [elementHandle.click([options])](#elementhandleclickoptions)
  * [elementHandle.contentFrame()](#elementhandlecontentframe)
  * [elementHandle.dispose()](#elementhandledispose)
  * [elementHandle.executionContext()](#elementhandleexecutioncontext)
  * [elementHandle.focus()](#elementhandlefocus)
  * [elementHandle.getProperties()](#elementhandlegetproperties)
  * [elementHandle.getProperty(propertyName)](#elementhandlegetpropertypropertyname)
  * [elementHandle.hover()](#elementhandlehover)
  * [elementHandle.isIntersectingViewport()](#elementhandleisintersectingviewport)
  * [elementHandle.jsonValue()](#elementhandlejsonvalue)
  * [elementHandle.press(key[, options])](#elementhandlepresskey-options)
  * [elementHandle.screenshot([options])](#elementhandlescreenshotoptions)
  * [elementHandle.tap()](#elementhandletap)
  * [elementHandle.toString()](#elementhandletostring)
  * [elementHandle.type(text[, options])](#elementhandletypetext-options)
  * [elementHandle.uploadFile(...filePaths)](#elementhandleuploadfilefilepaths)
- [class: Request](#class-request)
  * [request.abort([errorCode])](#requestaborterrorcode)
  * [request.continue([overrides])](#requestcontinueoverrides)
  * [request.failure()](#requestfailure)
  * [request.frame()](#requestframe)
  * [request.headers()](#requestheaders)
  * [request.isNavigationRequest()](#requestisnavigationrequest)
  * [request.method()](#requestmethod)
  * [request.postData()](#requestpostdata)
  * [request.redirectChain()](#requestredirectchain)
  * [request.resourceType()](#requestresourcetype)
  * [request.respond(response)](#requestrespondresponse)
  * [request.response()](#requestresponse)
  * [request.url()](#requesturl)
- [class: Response](#class-response)
  * [response.buffer()](#responsebuffer)
  * [response.fromCache()](#responsefromcache)
  * [response.fromServiceWorker()](#responsefromserviceworker)
  * [response.headers()](#responseheaders)
  * [response.json()](#responsejson)
  * [response.ok()](#responseok)
  * [response.request()](#responserequest)
  * [response.securityDetails()](#responsesecuritydetails)
  * [response.status()](#responsestatus)
  * [response.text()](#responsetext)
  * [response.url()](#responseurl)
- [class: SecurityDetails](#class-securitydetails)
  * [securityDetails.issuer()](#securitydetailsissuer)
  * [securityDetails.protocol()](#securitydetailsprotocol)
  * [securityDetails.subjectName()](#securitydetailssubjectname)
  * [securityDetails.validFrom()](#securitydetailsvalidfrom)
  * [securityDetails.validTo()](#securitydetailsvalidto)
- [class: Target](#class-target)
  * [target.browser()](#targetbrowser)
  * [target.browserContext()](#targetbrowsercontext)
  * [target.createCDPSession()](#targetcreatecdpsession)
  * [target.opener()](#targetopener)
  * [target.page()](#targetpage)
  * [target.type()](#targettype)
  * [target.url()](#targeturl)
- [class: CDPSession](#class-cdpsession)
  * [cdpSession.detach()](#cdpsessiondetach)
  * [cdpSession.send(method[, params])](#cdpsessionsendmethod-params)
- [class: Coverage](#class-coverage)
  * [coverage.startCSSCoverage(options)](#coveragestartcsscoverageoptions)
  * [coverage.startJSCoverage(options)](#coveragestartjscoverageoptions)
  * [coverage.stopCSSCoverage()](#coveragestopcsscoverage)
  * [coverage.stopJSCoverage()](#coveragestopjscoverage)
<!-- GEN:stop -->

### Overview （概览）

Puppeteer is a Node library which provides a high-level API to control Chromium or Chrome over the DevTools Protocol.

Puppeteer 是一个 Node 库，它提供了基于 DevTools 协议的高级 API 来控制 Chromium 或 Chrome。

The Puppeteer API is hierarchical and mirrors the browser structure.

Puppeteer API 是分层级的，并且反映了浏览器的结构。

Puppeteer API

> **NOTE** On the following diagram, faded entities are not currently represented in Puppeteer.

> **NOTE** 在下图中，淡化的实体现在还没有出现在 Puppeteer 中。

![puppeteer overview](https://user-images.githubusercontent.com/746130/40333229-5df5480c-5d0c-11e8-83cb-c3e371de7374.png)

- [`Puppeteer`](#class-puppeteer) communicates with the browser using [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). （[`Puppeteer`](#class-puppeteer) 通过 [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) 来与浏览器进行交流）
- [`Browser`](#class-browser) instance can own multiple browser contexts （[`Browser`](#class-browser)实例可以掌控多个浏览器上下文）.
- [`BrowserContext`](#class-browsercontext) instance defines a browsing session and can own multiple pages. （[`BrowserContext`](#class-browsercontext) 实例定义一个能够掌控多个页面的浏览器会话 ）
- [`Page`](#class-page) has at least one frame: main frame. There might be other frames created by [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) or [frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame) tags. （[`Page`](#class-page) 至少有一个 frame，即主 frame，同时可能还存在其他通过 [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 或者 [frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame) 标签创建的 frame ）
- [`Frame`](#class-frame) has at least one execution context - the default execution context - where the frame's JavaScript is executed. A Frame might have additional execution contexts that are associated with [extensions](https://developer.chrome.com/extensions). （[`Frame`](#class-frame) 至少拥有一个执行上下文 - 即默认执行上下文 - 该 frame 的 JavaScript 就在这里执行。一个 frame 同时可能还有与 [extensions](https://developer.chrome.com/extensions) 相关联的执行上下文 ）
- [`Worker`](#class-worker) has a single execution context and facilitates interacting with [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). [`Worker`](#class-worker) 具有单独的执行上下文并且可以很好的与 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 进行交互。

(Diagram source: [link](https://docs.google.com/drawings/d/1Q_AM6KYs9kbyLZF-Lpp5mtpAWth73Cq8IKCsWYgi8MM/edit?usp=sharing))

### Environment Variables （环境变量）

Puppeteer looks for certain [environment variables](https://en.wikipedia.org/wiki/Environment_variable) to aid its operations.
If puppeteer doesn't find them in environment, lowercased variant of these variables will be used from the [npm config](https://docs.npmjs.com/cli/config).

Puppeteer会查找一些对其可能会有帮助的[环境变量](https://en.wikipedia.org/wiki/Environment_variable)，如果没有找到就会使用 [npm config](https://docs.npmjs.com/cli/config) 中对应的小写变量。

- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` - defines HTTP proxy settings that are used to download and run Chromium. （指定用于下载和运行 Chromium 的 HTTP 代理）
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` - do not download bundled Chromium during installation step. （指定在安装阶段**不下载**绑定的 Chromium）
- `PUPPETEER_DOWNLOAD_HOST` - overwrite host part of URL that is used to download Chromium （指定下载 Chromium 的URL中 host 部分）
- `PUPPETEER_CHROMIUM_REVISION` - specify a certain version of chrome you'd like puppeteer to use during the installation step. （在安装阶段指定你将希望 Puppeteer 使用什么版本的 chrome）

### Working with Chrome Extensions （与 Chrome 插件结合）

Puppeteer can be used for testing Chrome Extensions.

Puppeteer 可以用于测试 Chrome 插件。

> **NOTE** Extensions in Chrome / Chromium currently only work in non-headless mode.

> **提示：** 当前 Chrome / Chromium 中仅支持插件在 non-headless 模式中使用.

The following is the code for getting a handle to a [background page](https://developer.chrome.com/extensions/background_pages) of an extension whose source is located in `./my-extension`:

下面的代码展示了获取资源在 `./my-extension` 中的一个插件的 [background page](https://developer.chrome.com/extensions/background_pages) 的句柄 （译者注：background page 是 chrome 插件中的一个概念，对开发过 chrome 插件的同学应该不陌生，对 chrome 插件不熟悉的同学可以略过，包括下面提到的 popup 和 content script 也是插件中的概念）：

```js
const puppeteer = require('puppeteer');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'my-extension');
  const browser = puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
  const backgroundPage = await backgroundPageTarget.page();
  // Test the background page as you would any other page.
  await browser.close();
})();
```

> **NOTE** It is not yet possible to test extension popups or content scripts.

> **提示：** 目前还不能测试插件的弹出窗和内容脚本部分。

### class: Puppeteer (Puppeteer 类)

Puppeteer module provides a method to launch a Chromium instance.
The following is a typical example of using Puppeteer to drive automation:

Puppeteer 模块提供了启动 Chromium 实例的方法. 下面就是一个使用 Puppeteer 来自动化操作的典型案例.

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  // other actions...
  await browser.close();
});
```

#### puppeteer.connect(options)
- `options` <[Object]>
  - `browserWSEndpoint` <[string]> a [browser websocket endpoint](#browserwsendpoint) to connect to. （用于连接 Chrome 的[browser websocket endpoint](#browserwsendpoint)（译者注：Dev Tools通过该 websocket 与所控制的浏览器实例相连））
  - `ignoreHTTPSErrors` <[boolean]> Whether to ignore HTTPS errors during navigation. Defaults to `false`. （是否在页面导航之间忽略 HTTPS 错误， 默认为 `false`）
  - `slowMo` <[number]> Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on. （以毫秒数指定 Puppeteer 操作需要被放慢的时间。 当你需要看清楚中途发生了什么的时候非常有用）
- returns: <[Promise]<[Browser]>>

This methods attaches Puppeteer to an existing Chromium instance.

该方法将 Puppeteer 和一个已经存在的 Chromium 实例进行关联。

#### puppeteer.createBrowserFetcher([options])
- `options` <[Object]>
  - `host` <[string]> A download host to be used. Defaults to `https://storage.googleapis.com`. （用于下载浏览器的 URL 中的 host 部分， 默认为 `https://storage.googleapis.com` ）
  - `path` <[string]> A path for the downloads folder. Defaults to `<root>/.local-chromium`, where `<root>` is puppeteer's package root. （下载浏览器链接的 path 部分， 默认为 `<root>/.local-chromium`，`<root>` 是 Puppeteer 包的根目录 ）
  - `platform` <[string]> Possible values are: `mac`, `win32`, `win64`, `linux`. Defaults to the current platform. （可用的值有 `mac`, `win32`, `win64`, `linux`， 默认为当前平台）
- returns: <[BrowserFetcher]>

#### puppeteer.defaultArgs()
- returns: <[Array]<[string]>> The default flags that Chromium will be launched with.
- 返回值: <[Array]<[string]>> 启动 Chromium 的默认参数.

#### puppeteer.executablePath()
- returns: <[string]> A path where Puppeteer expects to find bundled Chromium. Chromium might not exist there if the download was skipped with [`PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`](#environment-variables).
- 返回值: <[string]> Puppeteer 用于查找 Chromium 的路径. 如果使用了 [`PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`](#environment-variables) 跳过了下载部分，则该路径中可能不会存在 Chromium.

#### puppeteer.launch([options])
- `options` <[Object]>  Set of configurable options to set on the browser. Can have the following fields （用于设置到浏览器上的配置参数集合，能够使用以下字段）:
  - `ignoreHTTPSErrors` <[boolean]> Whether to ignore HTTPS errors during navigation. Defaults to `false`. （是否在页面导航之间忽略 HTTPS 错误， 默认为 `false`）
  - `headless` <[boolean]> Whether to run browser in [headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome). Defaults to `true` unless the `devtools` option is `true`. （是否以 [headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome) 启动浏览器。除非 `devtools` 为 `true`， 否则默认为 `true`）
  - `executablePath` <[string]> Path to a Chromium or Chrome executable to run instead of the bundled Chromium. If `executablePath` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). （指定 Chromium 或者 Chrome 执行文件的路径，可以用于替代绑定的 Chromium，如果 `executablePath` 是相对路径，则会返回与 [当前工作目录 cwd](https://nodejs.org/api/process.html#process_process_cwd) 相对的路径）
  - `slowMo` <[number]> Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on. （以毫秒数指定 Puppeteer 操作需要被放慢的时间。 当你需要看清楚中途发生了什么的时候非常有用）
  - `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/). （给浏览器实例传递的额外参数，可以在[这里](http://peter.sh/experiments/chromium-command-line-switches/)找到 Chromium 的参数）
  - `ignoreDefaultArgs` <[boolean]> Do not use [`puppeteer.defaultArgs()`](#puppeteerdefaultargs). Dangerous option; use with care. Defaults to `false`. （不要使用 [`puppeteer.defaultArgs()`](#puppeteerdefaultargs)。使用该参数有一定风险，请小心使用，默认为 `false`）
  - `handleSIGINT` <[boolean]> Close the browser process on Ctrl-C. Defaults to `true`. （使用 `Ctrl-C` 来关闭浏览器进程， 默认为 `true`）
  - `handleSIGTERM` <[boolean]> Close the browser process on SIGTERM. Defaults to `true`. （使用 SIGTERM 信号关闭浏览器进程，默认为 `true`）
  - `handleSIGHUP` <[boolean]> Close the browser process on SIGHUP. Defaults to `true`. （使用 SIGHUP 信号来关闭浏览器进程，默认为 `true`）
  - `timeout` <[number]> Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. （等待浏览器启动的最大毫秒数，默认为 `30000` 毫秒，即 30 秒。传 `0` 表示禁用该参数）
  - `dumpio` <[boolean]> Whether to pipe the browser process stdout and stderr into `process.stdout` and `process.stderr`. Defaults to `false`. （是否将浏览器进程的 stdout 和 stderr 输出到 `process.stdout` 和 `process.stderr`。默认为 `false`）
  - `userDataDir` <[string]> Path to a [User Data Directory](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md). （指定 [User Data Directory](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) 的路径）
  - `env` <[Object]> Specify environment variables that will be visible to the browser. Defaults to `process.env`. （指定对浏览器可见的环境变量，默认为 `process.env`）
  - `devtools` <[boolean]> Whether to auto-open a DevTools panel for each tab. If this option is `true`, the `headless` option will be set `false`. （是否需要为每个 tab 自动开启一个 DevTools 面板。如果该选项为 `true`，则 `headless` 选项将会被设置为 `false`）
  - `pipe` <[boolean]> Connects to the browser over a pipe instead of a WebSocket. Defaults to `false`.  （使用管道连接浏览器而非 WebSocket，默认为 `false`）
- returns: <[Promise]<[Browser]>> Promise which resolves to browser instance. （成功后会被解析为浏览器实例的 Promise）

The method launches a browser instance with given arguments. The browser will be closed when the parent node.js process is closed.

该方法使用给定的参数启动一个浏览器实例。如果它所依附的 node.js 父进程被关闭，它也会随之关闭。

> **NOTE** Puppeteer can also be used to control the Chrome browser, but it works best with the version of Chromium it is bundled with. There is no guarantee it will work with any other version. Use `executablePath` option with extreme caution.
>
> Puppeteer也能够用来控制 Chrome 浏览器， 但是它和与之绑定的 Chromium 会更加搭配。我们并不能保证它能够和其它版本的 Chromium 一起正常工作。非特殊情况下不要使用 `executablePath`
>
> If Google Chrome (rather than Chromium) is preferred, a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested.
>
>如果更喜欢使用 Google Chrome（而非 Chromium），则推荐使用 [Chrome Canary](https://www.google.com/chrome/browser/canary.html) 或者 [Dev Channel](https://www.chromium.org/getting-involved/dev-channel)的构建版本
>
> In [puppeteer.launch([options])](#puppeteerlaunchoptions) above, any mention of Chromium also applies to Chrome.
>
> 在前面的 [puppeteer.launch([options])](#puppeteerlaunchoptions) 中提及的任何东西同样也适用于 Chrome
>
> See [`this article`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [`This article`](https://chromium.googlesource.com/chromium/src/+/lkcr/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users.
>
> 参考 [`这篇文章`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) 了解 Chromium 与 Chrome 的不同之处。 同时还有[`另外一篇文章`](https://chromium.googlesource.com/chromium/src/+/lkcr/docs/chromium_browser_vs_google_chrome.md) 为 Linux 用户说明了一些不同之处。

### class: BrowserFetcher （BrowserFetcher 类）

BrowserFetcher can download and manage different versions of Chromium.

BrowserFetcher 可以下载和管理不同版本的 Chromium。

BrowserFetcher operates on revision strings that specify a precise version of Chromium, e.g. `"533271"`. Revision strings can be obtained from [omahaproxy.appspot.com](http://omahaproxy.appspot.com/).

BrowserFetcher 使用修订版本字符串来精确的指定一个 Chromium 版本。如 `"533271"`，修订版本字符串可以在 [omahaproxy.appspot.com](http://omahaproxy.appspot.com/) 找到。

Example on how to use BrowserFetcher to download a specific version of Chromium and run
Puppeteer against it:

下面的例子展示了如何使用 BrowserFetcher 来下载指定版本的 Chromium 并且使用 Puppeteer 来操纵它：

```js
const browserFetcher = puppeteer.createBrowserFetcher();
const revisionInfo = await browserFetcher.download('533271');
const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
```

> **NOTE** BrowserFetcher is not designed to work concurrently with other
> instances of BrowserFetcher that share the same downloads directory.
>
> **提示：** BrowserFetcher 被设计为不能和共享相同下载目录的其他 BrowserFetcher 实例同时进行工作。

#### browserFetcher.canDownload(revision)
- `revision` <[string]> a revision to check availability. （用于检测可用性的修订版本号）
- returns: <[Promise]<[boolean]>>  returns `true` if the revision could be downloaded from the host. （如果指定的修订版本号可以从服务器上下载，则返回`true`）

The method initiates a HEAD request to check if the revision is available.

该方法发起一个 `HEAD` 请求来检测修订版本是否可用。

#### browserFetcher.download(revision[, progressCallback])
- `revision` <[string]> a revision to download. （指定下载的修订版本号）
- `progressCallback` <[function]([number], [number])> A function that will be called with two arguments （该方法将会用下面两个参数进行调用）:
  - `downloadedBytes` <[number]> how many bytes have been downloaded （已经下载完成的字节数）
  - `totalBytes` <[number]> how large is the total download. （总下载字节数）
- returns: <[Promise]<[Object]>> Resolves with revision information when the revision is downloaded and extracted （返回在文件被下载和提取之后，会被解析为修订版本信息的 Promise）
  - `revision` <[string]> the revision the info was created from （信息来源的修订版本号）
  - `folderPath` <[string]> path to the extracted revision folder （修订版的文件提取目录）
  - `executablePath` <[string]> path to the revision executable （修订版的可执行文件目录）
  - `url` <[string]> URL this revision can be downloaded from （该修订版的下载链接 URL）
  - `local` <[boolean]> whether the revision is locally available on disk （该修订版是否在磁盘上可用）（译者注：这里暂时还需要捋一捋）

The method initiates a GET request to download the revision from the host.

该方法发起一个 GET 请求从服务器上下载修订版的 Chromium。

#### browserFetcher.localRevisions()
- returns: <[Promise]<[Array]<[string]>>> A list of all revisions available locally on disk. （返回一个本地磁盘上可用修订版本的列表）

#### browserFetcher.platform()
- returns: <[string]> Returns one of `mac`, `linux`, `win32` or `win64`. （返回`mac`, `linux`, `win32` 或者 `win64` 之一）

#### browserFetcher.remove(revision)
- `revision` <[string]> a revision to remove. The method will throw if the revision has not been downloaded. （指定需要移除的修订版， 如果该版本还没有被下载下来，则该方法会抛出错误）
- returns: <[Promise]> Resolves when the revision has been removed. （返回一个当该版本被移除时会变为完成态的 Promise）

#### browserFetcher.revisionInfo(revision)
- `revision` <[string]> a revision to get info for. （指定需要获取信息的版本号）
- returns: <[Object]>
  - `revision` <[string]> the revision the info was created from （信息来源的版本号）
  - `folderPath` <[string]> path to the extracted revision folder （文件提取目录的路径）
  - `executablePath` <[string]> path to the revision executable （可执行文件的路径）
  - `url` <[string]> URL this revision can be downloaded from （能够下载该版本文件的 URL 地址）
  - `local` <[boolean]> whether the revision is locally available on disk （该版本文件在本地磁盘上是否可用）

### class: Browser

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) （继承自 [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)）

A Browser is created when Puppeteer connects to a Chromium instance, either through [`puppeteer.launch`](#puppeteerlaunchoptions) or [`puppeteer.connect`](#puppeteerconnectoptions).

在 Puppeteer 连接到 Chromium 实例的时候会创建浏览器（Browser）实例，而不管是通过 [`puppeteer.launch`](#puppeteerlaunchoptions) 或 [`puppeteer.connect`](#puppeteerconnectoptions)

An example of using a [Browser] to create a [Page]:

下面是使用 [浏览器(Browser)](#class-browser) 创建 [页面(Page)](#class-page) 的示例：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
});
```

An example of disconnecting from and reconnecting to a [Browser]:

下面展示从 [浏览器(Browser)](#class-browser) 断开并重新连接的示例：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  // Store the endpoint to be able to reconnect to Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // Disconnect puppeteer from Chromium
  browser.disconnect();

  // Use the endpoint to reestablish a connection
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // Close Chromium
  await browser2.close();
});
```
#### event: 'disconnected'
Emitted when Puppeteer gets disconnected from the Chromium instance. This might happen because of one of the following:

当 Puppeteer 从 Chromium 实例断开连接的时候触发。这种情况可能由以下条件触发：

- Chromium is closed or crashed （Chromium被关闭或者崩溃）
- The [`browser.disconnect`](#browserdisconnect) method was called （调用了[`browser.disconnect`](#browserdisconnect)方法）

#### event: 'targetchanged'
- <[Target]>

Emitted when the url of a target changes.

当 target 的 url 发生改变时触发。

> **NOTE** This includes target changes in incognito browser contexts.

> **提示：** 这里也包含了在隐身模式下浏览器上下文中 target 的改变。

#### event: 'targetcreated'
- <[Target]>

Emitted when a target is created, for example when a new page is opened by [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or [`browser.newPage`](#browsernewpage).

当一个新的 target 被创建时触发，例如当一个新页面通过 [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 或者 [`browser.newPage`](#browsernewpage) 打开时。

> **NOTE** This includes target creations in incognito browser contexts.

> **提示：** 这里也包含了在隐身模式下浏览器上下文中 target 的创建。

#### event: 'targetdestroyed'
- <[Target]>

Emitted when a target is destroyed, for example when a page is closed.

当 target 被销毁的时候触发，如当页面关闭的时候。

> **NOTE** This includes target destructions in incognito browser contexts.

> **提示：** 这里也包含了在隐身模式下浏览器上下文中 target 的销毁。

#### browser.browserContexts()
- returns: <[Array]<[BrowserContext]>>

Returns an array of all open browser contexts. In a newly created browser, this will return
a single instance of [BrowserContext].

返回一个包含了所有打开浏览器上下文的列表。在一个新创建的浏览器中返回的是单个 [浏览器上下文(BrowserContext)](#class-browsercontext) 实例。

#### browser.close()
- returns: <[Promise]>

Closes Chromium and all of its pages (if any were opened). The [Browser] object itself is considered to be disposed and cannot be used anymore.

关闭 Chromium 和它所有的页面。该 [浏览器(browser)](#class-browser) 对象将被丢弃并不能再使用。

#### browser.createIncognitoBrowserContext()
- returns: <[Promise]<[BrowserContext]>>

Creates a new incognito browser context. This won't share cookies/cache with other browser contexts.

创建一个新的隐身浏览器上下文。它不会和其它浏览器上下文共享 cookie/cache。

```js
const browser = await puppeteer.launch();
// Create a new incognito browser context.
const context = await browser.createIncognitoBrowserContext();
// Create a new page in a pristine context.
const page = await context.newPage();
// Do stuff
await page.goto('https://example.com');
```

#### browser.disconnect()

Disconnects Puppeteer from the browser, but leaves the Chromium process running. After calling `disconnect`, the [Browser] object is considered disposed and cannot be used anymore.

将浏览器和 Puppeteer 断开，但是保持 Chromium 进程继续运行。 在调用 `disconnect` 后，该 [浏览器(browser)](#class-browser) 对象将被丢弃并不能再使用。

#### browser.newPage()
- returns: <[Promise]<[Page]>>

Promise which resolves to a new [Page] object. The [Page] is created in a default browser context.

返回一个完成态会返回 [页面](#class-page) 对象的 Promise。该 [页面](#class-page) 在一个默认浏览器上下文中被创建。

#### browser.pages()
- returns: <[Promise]<[Array]<[Page]>>> Promise which resolves to an array of all open pages. Non visible pages, such as `"background_page"`, will not be listed here. You can find them using [target.page()](#targetpage). （返回一个完成态会返回所有打开页面列表的 Promise。不可见的页面，如 `"background_page"`，则不会被罗列在里面。你可以使用 [target.page()](#targetpage) 来获取它们）

#### browser.process()
- returns: <?[ChildProcess]> Spawned browser process. Returns `null` if the browser instance was created with [`puppeteer.connect`](#puppeteerconnectoptions) method. （返回该浏览器进程。如果该浏览器实例是通过 [`puppeteer.connect`](#puppeteerconnectoptions) 方法创建的则返回 `null`）

#### browser.targets()
- returns: <[Array]<[Target]>>

An array of all active targets inside the Browser. In case of multiple browser contexts,
the method will return an array with all the targets in all browser contexts.

返回一个包含浏览器中所有激活的 target 的数组。在多个浏览器上下文的情况下，该方法将返回一个包含所有浏览器上下文中所有 target 的数组。

#### browser.userAgent()
- returns: <[Promise]<[string]>> Promise which resolves to the browser's original user agent.  （返回浏览器原始 user-agent 的 Promise）

> **NOTE** Pages can override browser user agent with [page.setUserAgent](#pagesetuseragentuseragent)

> **提示：** 页面可以使用 [page.setUserAgent](#pagesetuseragentuseragent) 覆盖浏览器的 user-agent

#### browser.version()
- returns: <[Promise]<[string]>> For headless Chromium, this is similar to `HeadlessChrome/61.0.3153.0`. For non-headless, this is similar to `Chrome/61.0.3153.0`. （在 headless Chromium 模式中，它类似于 `HeadlessChrome/61.0.3153.0`。在 non-headless 模式中，它类似于`Chrome/61.0.3153.0`）

> **NOTE** the format of browser.version() might change with future releases of Chromium.

> **提示：** 在以后的 Chromium 发布版中 `browser.version()` 返回的格式可能会发生变化。

#### browser.wsEndpoint()
- returns: <[string]> Browser websocket url. （浏览器的 websocket url）

Browser websocket endpoint which can be used as an argument to
[puppeteer.connect](#puppeteerconnectoptions). The format is `ws://${host}:${port}/devtools/browser/<id>`

浏览器的 websocket 终端可以用作 [puppeteer.connect](#puppeteerconnectoptions) 的参数。格式为 `ws://${host}:${port}/devtools/browser/<id>`

You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`. Learn more about the [devtools protocol](https://chromedevtools.github.io/devtools-protocol) and the [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target).

你能够在 `http://${host}:${port}/json/version` 中找到 `webSocketDebuggerUrl`。学习更多的 [devtools protocol](https://chromedevtools.github.io/devtools-protocol) 和 [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target).

### class: BrowserContext

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) （继承自 [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)）

BrowserContexts（浏览器上下文） provide a way to operate multiple independent browser sessions. When a browser is launched, it has
a single BrowserContext used by default. The method `browser.newPage()` creates a page in the default browser context.

BrowserContext 类提供了一种可以操作多个独立的浏览器会话的功能。当启动一个浏览器的时候，它就有一个默认的 BrowserContext。方法 `browser.newPage()` 在默认浏览器上下文中创建一个页面。

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser
context.

如果一个页面打开了另一个页面， 如使用了 `window.open`，则弹窗将会属于父页面的浏览器上下文。

Puppeteer allows creation of "incognito" browser contexts with `browser.createIncognitoBrowserContext()` method.
"Incognito" browser contexts don't write any browsing data to disk.

Puppeteer 允许使用 `browser.createIncognitoBrowserContext()` 方法创建匿名的浏览器上下文。“匿名” 浏览器上下文不会往磁盘上写任何数据。

```js
// Create a new incognito browser context
const context = await browser.createIncognitoBrowserContext();
// Create a new page inside context.
const page = await context.newPage();
// ... do stuff with page ...
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

#### event: 'targetchanged'
- <[Target]>

Emitted when the url of a target inside the browser context changes.

当浏览器上下文中的 target 的 url 发生改变时触发。

#### event: 'targetcreated'
- <[Target]>

Emitted when a new target is created inside the browser context, for example when a new page is opened by [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or [`browserContext.newPage`](#browsercontextnewpage).

#### event: 'targetdestroyed'
- <[Target]>

Emitted when a target inside the browser context is destroyed, for example when a page is closed.

当浏览器上下文中的 target 被销毁时触发，例如页面关闭。

#### browserContext.browser()
- returns: <[Browser]>

The browser this browser context belongs to.

返回浏览器上下文所属的浏览器对象。

#### browserContext.close()
- returns: <[Promise]>

Closes the browser context. All the targets that belong to the browser context
will be closed.

关闭浏览器上下文。其中所有的 target 都将会一起关闭。

> **NOTE** only incognito browser contexts can be closed.
>
> **提示：** 只有匿名浏览器上下文可以被关闭.

#### browserContext.isIncognito()
- returns: <[boolean]>

Returns whether BrowserContext is incognito.
The default browser context is the only non-incognito browser context.

判断浏览器上下文是否为匿名。默认浏览器上下文是唯一非匿名浏览器上下文

> **NOTE** the default browser context cannot be closed.
>
> **提示：** 默认浏览器上下问不能被关闭。

#### browserContext.newPage()
- returns: <[Promise]<[Page]>>

Creates a new page in the browser context.

在该浏览器上下文中创建一个新页面。

#### browserContext.targets()
- returns: <[Array]<[Target]>>

An array of all active targets inside the browser context.

返回浏览器上下文中所有激活了的 target 的数组。

### class: Page

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

Page（页面） provides methods to interact with a single tab or [extension background page](https://developer.chrome.com/extensions/background_pages) in Chromium. One [Browser] instance might have multiple [Page] instances.

页面类提供了在 Chromium 中与单个tab页或者[插件的 background page](https://developer.chrome.com/extensions/background_pages)进行交互的功能。一个 [Browser] 实例可以有多个 [Page] 实例。

This example creates a page, navigates it to a URL, and then saves a screenshot:

下面的示例展示了创建一个页面，导航到一个 URL，然后保存它的快照的功能：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
});
```

The Page class emits various events (described below) which can be handled using any of Node's native [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) methods, such as `on`, `once` or `removeListener`.

页面类能够触发很多事件，这些事件可以使用 Node 中任何原生的 [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) 方法来作为事件处理函数，如 `on`, `once` 或者 `removeListener`。

This example logs a message for a single page `load` event:

下例展示了在页面的 `load` 事件触发时打印一条消息：

```js
page.once('load', () => console.log('Page loaded!'));
```

To unsubscribe from events use the `removeListener` method:

要取消对事件的订阅可以使用 `removeListener` 方法：

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// Sometime later...
page.removeListener('request', logRequest);
```

#### event: 'close'

Emitted when the page closes.

当页面关闭时触发。

#### event: 'console'
- <[ConsoleMessage]>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`. Also emitted if the page throws an error or a warning.

当页面中的 JavaScript 调用了任何 console API 方法之一时会被触发，如 `console.log` 或者 `console.dir`。同样当页面抛出错误或者警告时也会触发。

The arguments passed into `console.log` appear as arguments on the event handler.

传入 `console.log` 的参数也会出现在事件处理函数参数中。

An example of handling `console` event:

下面是一个处理 `console` 事件的例子：

```js
page.on('console', msg => {
  for (let i = 0; i < msg.args().length; ++i)
    console.log(`${i}: ${msg.args()[i]}`);
});
page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));
```

#### event: 'dialog'
- <[Dialog]>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Puppeteer can respond to the dialog via [Dialog]'s [accept](#dialogacceptprompttext) or [dismiss](#dialogdismiss) methods.

当一个 JavaScript 弹出出现的时候触发，如 `alert`，`prompt`，`confirm` 或者 `beforeunload`。Puppeteer 能够通过 [Dialog] 的 [accept](#dialogacceptprompttext) 或 [dismiss](#dialogdismiss) 进行响应。

#### event: 'domcontentloaded'

Emitted when the JavaScript [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.

当 JavaScript [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) 事件触发时触发。

#### event: 'error'
- <[Error]>

Emitted when the page crashes.

当页面崩溃的时候触发。

> **NOTE** `error` event has a special meaning in Node, see [error events](https://nodejs.org/api/events.html#events_error_events) for details.
>
> **提示：** 在 Node 中 `error` 事件具有特殊含义, 点击 [error 事件](https://nodejs.org/api/events.html#events_error_events)查看详情.

#### event: 'frameattached'
- <[Frame]>

Emitted when a frame is attached.

当一个 frame 被添加时触发。

#### event: 'framedetached'
- <[Frame]>

Emitted when a frame is detached.

当一个 frame 被解除时触发。

#### event: 'framenavigated'
- <[Frame]>

Emitted when a frame is navigated to a new url.

当 frame 导航到一个新的 url 时触发。

#### event: 'load'

Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.

当 JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) 事件被触发时触发。

#### event: 'metrics'
- <[Object]>
  - `title` <[string]> The title passed to `console.timeStamp`. （传入 `console.timeStamp` 的标题）
  - `metrics` <[Object]> Object containing metrics as key/value pairs. The values
    of metrics are of <[number]> type. （一个包含 metrics 键值对的对象。metrics 的值为 number 类型）

Emitted when the JavaScript code makes a call to `console.timeStamp`. For the list
of metrics see `page.metrics`. （当JavaScript代码调用 `console.timeStamp` 时触发。使用 `page.metrics` 查看 metrics 列表）

#### event: 'pageerror'
- <[Error]> The exception message （异常消息）

Emitted when an uncaught exception happens within the page.

当页面中有未捕获的异常时会触发。

#### event: 'request'
- <[Request]>

Emitted when a page issues a request. The [request] object is read-only.
In order to intercept and mutate requests, see `page.setRequestInterception`.

当页面发出请求时触发。 [request] 对象是只读的。如果为了拦截和修改请求，参考 `page.setRequestInterception`。

#### event: 'requestfailed'
- <[Request]>

Emitted when a request fails, for example by timing out.

当一个请求失败时触发，如请求超时。

#### event: 'requestfinished'
- <[Request]>

Emitted when a request finishes successfully.

当请求成功完成时触发。

#### event: 'response'
- <[Response]>

Emitted when a [response] is received.

当请求收到响应（[response]）时触发。

#### event: 'workercreated'
- <[Worker]>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned by the page.

当页面创建了一个 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 时触发。

#### event: 'workerdestroyed'
- <[Worker]>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is terminated.

当页面 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 被终止并销毁时触发。

#### page.$(selector)
- `selector` <[string]> A [selector] to query page for （查找页面元素的选择器（[selector]））
- returns: <[Promise]<?[ElementHandle]>>

The method runs `document.querySelector` within the page. If no element matches the selector, the return value resolve to `null`.

该方法在页面中运行 `document.querySelector` 来查找。如果没有找到匹配的元素，则 Promise 返回 `null`

Shortcut for [page.mainFrame().$(selector)](#frameselector).

该方法是 [page.mainFrame().$(selector)](#frameselector) 的简写。

#### page.$$(selector)
- `selector` <[string]> A [selector] to query page for （查找页面元素的选择器（[selector]））
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method runs `document.querySelectorAll` within the page. If no elements match the selector, the return value resolve to `[]`.

该方法在页面中运行 `document.querySelectorAll`。如果没有元素匹配该选择器，Promise 将返回 `[]`。

Shortcut for [page.mainFrame().$$(selector)](#frameselector-1).

该方法是 [page.mainFrame().$$(selector)](#frameselector-1) 的简写。

#### page.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query page for （查找页面元素的选择器（[selector]））
- `pageFunction` <[function]> Function to be evaluated in browser context （需要在浏览器上下文中执行的函数）
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction` （传给 `pageFunction` 的参数）
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction` （返回能够返回 `pageFunction` 返回值的 Promise）

This method runs `Array.from(document.querySelectorAll(selector))` within the page and passes it as the first argument to `pageFunction`.

该方法在页面中运行  `Array.from(document.querySelectorAll(selector))` 并且将它传递给 `pageFunction` 的第一个参数。

If `pageFunction` returns a [Promise], then `page.$$eval` would wait for the promise to resolve and return its value.

如果 `pageFunction` 返回一个 [Promise]，则 `page.$$eval` 会等待这个 promise 完成并返回它的值。

Examples:
```js
const divsCounts = await page.$$eval('div', divs => divs.length);
```

#### page.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query page for （查找页面元素的选择器（[selector]））
- `pageFunction` <[function]> Function to be evaluated in browser context （需要在浏览器上下文中执行的函数）
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction` （传给 `pageFunction` 的参数）
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction` （返回能够返回 `pageFunction` 返回值的 Promise）

This method runs `document.querySelector` within the page and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

该方法在页面中运行  `document.querySelector` 并且将它传递给 `pageFunction` 的第一个函数。如果  `selector` 没有匹配的元素，则方法会抛出错误。

If `pageFunction` returns a [Promise], then `page.$eval` would wait for the promise to resolve and return its value.

如果 `pageFunction` 返回一个 [Promise]，则 `page.$$eval` 会等待这个 promise 完成并返回它的值。

Examples:
```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', e => e.outerHTML);
```

Shortcut for [page.mainFrame().$eval(selector, pageFunction)](#frameevalselector-pagefunction-args).

该方法是 [page.mainFrame().$eval(selector, pageFunction)](#frameevalselector-pagefunction-args) 的简写。

#### page.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate). （传递给 [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate) 的表达式）
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method evaluates the XPath expression.

该方法会计算 XPath 表达式的值。

Shortcut for [page.mainFrame().$x(expression)](#framexexpression)

该方法是 [page.mainFrame().$x(expression)](#framexexpression) 的简写。

#### page.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of a script to be added. （需要添加脚本的 URL）
  - `path` <[string]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). （需要注入到 frame 的 JavaScript 文件路径。如果 `path` 是相对路径，则会解析为相对于 [当前工作目录(cwd)](https://nodejs.org/api/process.html#process_process_cwd) ）
  - `content` <[string]> Raw JavaScript content to be injected into frame. （注入到 frame 中的源 JavaScript 内容）
  - `type` <[string]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details. （脚本类型。使用 'module' 来叫做 JavaScript ES6 模块。 参考 [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 了解更多）
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame. （返回一个 Promise，当 script 的 onload 事件触发时或者当脚本类容被注入到 frame 时该 Promise 会返回所添加的 script 标签(tag)）。

Adds a `<script>` tag into the page with the desired url or content.

根据 url 或者脚本内容来添加一个 `<script>` 标签到页面中。

Shortcut for [page.mainFrame().addScriptTag(options)](#frameaddscripttagoptions).

该方法是 [page.mainFrame().addScriptTag(options)](#frameaddscripttagoptions) 方法的简写。

#### page.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of the `<link>` tag. （`<link>` 标签的 URL）
  - `path` <[string]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). （需要注入到 frame 中的 CSS 文件路径，如果 `path` 是相对路径，则会被解析为相对于 [当前工作目录(cwd)](https://nodejs.org/api/process.html#process_process_cwd)）
  - `content` <[string]> Raw CSS content to be injected into frame. （会被注入到 frame 中的源 CSS 内容）
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame. （返回一个Promise，当样式表(stylesheet) 的 onload 事件触发或者当 CSS 文件内容被注入到 frame 中时，该 Promise 会被解析为该标记）

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

使用 `<link rel="stylesheet">` 将指定 URL 的CSS文件添加到页面中或者使用 `<style type="text/css">` 标签将指定的 CSS 文件内容添加到页面中。

Shortcut for [page.mainFrame().addStyleTag(options)](#frameaddstyletagoptions).

该方法是 [page.mainFrame().addStyleTag(options)](#frameaddstyletagoptions) 的简写。

#### page.authenticate(credentials)
- `credentials` <?[Object]>
  - `username` <[string]>
  - `password` <[string]>
- returns: <[Promise]>

Provide credentials for [http authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).

为 [http authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) 提供凭据。

To disable authentication, pass `null`.

如果要禁用认证，则传递 `null`。

#### page.bringToFront()

- returns: <[Promise]>

Brings page to front (activates tab).

将页面调到前台 （激活页面 tab）

#### page.browser()

- returns: <[Browser]>

Get the browser the page belongs to.

获取该页面所属的浏览器对象。

#### page.click(selector[, options])
- `selector` <[string]> A [selector] to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked. （所要点击的元素的选择器。如果有多个元素匹配该选择器，则第一个元素会被点击）
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, or `middle`, defaults to `left`. （`left`, `right`, 或者 `middle`，默认为 `left`）
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail]. （点击的次数，默认为1，参考 See [UIEvent.detail]）
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0. （指定`mousedown`和`mouseup`之间等待的毫秒数，默认为 0）
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully clicked. The Promise will be rejected if there is no element matching `selector`. （返回一个Promise，当 `selector` 所指定的元素被成功点击后，该Promise会变为完成态，或者如果没有元素匹配 `selector` 时该 Promise 会变为拒绝态）

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to click in the center of the element.
If there's no element matching `selector`, the method throws an error.

该方法使用 `selector` 来获取元素，如果有必要，会将它移动到视图中，然后使用 uses [page.mouse](#pagemouse) 来点击元素的中心。

Bear in mind that if `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

请记住，如果 `click()` 触发了 navigation 事件并且又有一个单独的 `page.waitForNavigation()` promise 变为完成态，那么你最终可能得到一个意想不到的结果。点击和等待导航的正确方式如下：

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  page.click(selector, clickOptions),
]);
```

Shortcut for [page.mainFrame().click(selector[, options])](#frameclickselector-options).

该方法是 [page.mainFrame().click(selector[, options])](#frameclickselector-options) 的简写。

#### page.close(options)
- `options` <[Object]>
  - `runBeforeUnload` <[boolean]> Defaults to `false`. Whether to run the
    [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)
    page handlers. （默认为 `false`。代表是否需要运行页面的 [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload) 事件函数）
- returns: <[Promise]>

By default, `page.close()` **does not** run beforeunload handlers.

默认情况下，`page.close()` **不会** 运行 beforeunload 事件处理函数。

> **NOTE** if `runBeforeUnload` is passed as true, a `beforeunload` dialog might be summoned
> and should be handled manually via page's ['dialog'](#event-dialog) event.
>
> **提示：** 如果 `runBeforeUnload` 为 true，则 `beforeunload` 对话框会被唤起，并且应该通过页面的 ['dialog'](#event-dialog) 事件手动处理。

#### page.content()
- returns: <[Promise]<[String]>>

Gets the full HTML contents of the page, including the doctype.

获得该页面完整的 HTML 内容，包括 doctype。

#### page.cookies(...urls)
- `...urls` <...[string]>
- returns: <[Promise]<[Array]<[Object]>>>
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `session` <[boolean]>
  - `sameSite` <[string]> `"Strict"` or `"Lax"`.

If no URLs are specified, this method returns cookies for the current page URL.
If URLs are specified, only cookies for those URLs are returned.

如果没有指定 URL，则该方法会返回当前页面 URL 的 cookie。如果指定了 URL 则返回指定 URL 的 cookie。

#### page.coverage

- returns: <[Coverage]>

#### page.deleteCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **required**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `secure` <[boolean]>
- returns: <[Promise]>

#### page.emulate(options)
- `options` <[Object]>
  - `viewport` <[Object]>
    - `width` <[number]> page width in pixels. （页面的像素宽度）
    - `height` <[number]> page height in pixels. （页面的像素高度）
    - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`. （指定设备做的缩放因子（可以被认为是 dpr），默认为 `1`）
    - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.  （是否考虑 `meta viewport` 标签。默认为 `false`）
    - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false` （指定视口(view port)是否支持 touch 事件。默认为 `false`）
    - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`. （指定视口是否以 [landscape](https://pc.net/helpcenter/answers/portrait_and_landscape_mode) 模式显示。默认为 `false`）
  - `userAgent` <[string]>
- returns: <[Promise]>

Emulates given device metrics and user agent. This method is a shortcut for calling two methods:

Emulate（仿真） 指定了设备的指标（metrics）和用户代理（user agent）。该方法是以下两个方法的快捷调用形式：

- [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
- [page.setViewport(viewport)](#pagesetviewportviewport)

To aid emulation, puppeteer provides a list of device descriptors which can be obtained via the `require('puppeteer/DeviceDescriptors')` command.
Below is an example of emulating an iPhone 6 in puppeteer:

Puppeteer 为使用仿真提供了一个设备描述的列表，它们可以通过  `require('puppeteer/DeviceDescriptors')` 获取。下面就是在 Puppeteer 中对 iPhone 6 进行仿真：

```js
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.google.com');
  // other actions...
  await browser.close();
});
```

List of all available devices is available in the source code: [DeviceDescriptors.js](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js).

所有列出的设备参数在源码 [DeviceDescriptors.js](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js) 文件中可以找到。

#### page.emulateMedia(mediaType)
- `mediaType` <?[string]> Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`. Passing `null` disables media emulation. （改变页面的CSS媒体类型，只允许 `'screen'`, `'print'` and `null`  之一， 传 `null` 表示禁用媒体仿真）
- returns: <[Promise]>

#### page.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context （需要在页面上下文中执行的函数）
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction` （传递给 `pageFunction` 的参数）
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction` （一个完成态会返回 `pageFunction` 返回值的 Promise）

If the function passed to the `page.evaluate` returns a [Promise], then `page.evaluate` would wait for the promise to resolve and return its value.

如果传给 `page.evaluate` 的函数返回 [Promise]，则 `page.evaluate` 会等待该promise完成并返回它的值。

If the function passed to the `page.evaluate` returns a non-[Serializable] value, then `page.evaluate` resolves to `undefined`.

如果传递给 `page.evaluate` 的函数返回一个不可序列化的值（non-[Serializable]）则 `page.evaluate` 返回的 Promise 会返回 `undefined`。

Passing arguments to `pageFunction`:

传参数给 `pageFunction`：

```js
const result = await page.evaluate(x => {
  return Promise.resolve(8 * x);
}, 7);
console.log(result); // prints "56"
```

A string can also be passed in instead of a function:

也可以给 `page.evaluate` 传递 JavaScript 字符串：

```js
console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
```

[ElementHandle] instances can be passed as arguments to the `page.evaluate`:

[ElementHandle] 实例能够当做参数传递给 `page.evaluate`：

```js
const bodyHandle = await page.$('body');
const html = await page.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

Shortcut for [page.mainFrame().evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args).

该方法是 Shortcut for [page.mainFrame().evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args) 的简写。

#### page.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context （需要在页面上下文中执行的函数）
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction` （传递给 `pageFunction` 的参数）
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle) （返回一个 Promise，该 Promise 会将 `pageFunction` 的返回值解析为 in-page 对象 (JSHandle) ）（译者注：暂时还不太理解）

The only difference between `page.evaluate` and `page.evaluateHandle` is that `page.evaluateHandle` returns in-page object (JSHandle).

`page.evaluate` 与 `page.evaluateHandle` 的不同之处就是 `page.evaluateHandle` 返回的是 in-page 对象 （JSHandle）

If the function passed to the `page.evaluateHandle` returns a [Promise], then `page.evaluateHandle` would wait for the promise to resolve and return its value.

如果传递给 `page.evaluateHandle` 的函数返回一个 [Promise]，则 `page.evaluateHandle` 会等待该 promise 完成并返回它的值。

A string can also be passed in instead of a function:

也可以给 `page.evaluateHandle` 传递 JavaScript 字符串：

```js
const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
```

[JSHandle] instances can be passed as arguments to the `page.evaluateHandle`:

[JSHandle] 实例能够作为参数传递给 `page.evaluateHandle`：

```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

Shortcut for [page.mainFrame().executionContext().evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args).

该方法是 [page.mainFrame().executionContext().evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args) 的简写。

#### page.evaluateOnNewDocument(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context （需要在浏览器上下文中执行的函数）
- `...args` <...[Serializable]> Arguments to pass to `pageFunction` （传递给 `pageFunction` 的参数）
- returns: <[Promise]>

Adds a function which would be invoked in one of the following scenarios:

添加一个函数，该函数将会在以下情况下被调用：

- whenever the page is navigated （每当页面被导航时）
- whenever the child frame is attached or navigated. In this case, the function is invoked in the context of the newly attached frame （每当子 frame 被关联或者导航时。在这种情况下，函数会在新关联的 frame 的上下文进行调用）

The function is invoked after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

函数会在文档（document）被创建后并且在执行它的任何脚本之前进行调用。这有助于修改 JavaScript 环境，如给 `Math.random` 设置随机数种子。

An example of overriding the navigator.languages property before the page loads:

下面示例展示了在页面加载之前覆盖 navigator.languages 属性。

```js
// preload.js

// overwrite the `languages` property to use a custom getter
Object.defineProperty(navigator, "languages", {
  get: function() {
    return ["en-US", "en", "bn"];
  }
});

// In your puppeteer script, assuming the preload.js file is in same folder of our script
const preloadFile = fs.readFileSync('./preload.js', 'utf8');
await page.evaluateOnNewDocument(preloadFile);
```

#### page.exposeFunction(name, puppeteerFunction)
- `name` <[string]> Name of the function on the window object （暴露在 window 对象上的函数名）
- `puppeteerFunction` <[function]> Callback function which will be called in Puppeteer's context. （会在 Puppeteer 的上下文中调用的回调函数）
- returns: <[Promise]>

The method adds a function called `name` on the page's `window` object.
When called, the function executes `puppeteerFunction` in node.js and returns a [Promise] which resolves to the return value of `puppeteerFunction`.

该方法添加一个名为 `name` 的函数到页面的 `window` 对象上。当调用这个函数的时候，它会在 node.js 中执行 `puppeteerFunction` 并返回一个 [Promise]，该 Promise 会返回 `puppeteerFunction` 的值。

If the `puppeteerFunction` returns a [Promise], it will be awaited.

如果 `puppeteerFunction` 返回一个 [Promise]，则会等待它执行。

> **NOTE** Functions installed via `page.exposeFunction` survive navigations.
>
> **提示：** 通过 `page.exposeFunction` 加入的函数能够在导航的时候生效.

An example of adding an `md5` function into the page:

添加一个 `md5` 函数到页面中的示例：

```js
const puppeteer = require('puppeteer');
const crypto = require('crypto');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('md5', text =>
    crypto.createHash('md5').update(text).digest('hex')
  );
  await page.evaluate(async () => {
    // use window.md5 to compute hashes
    const myString = 'PUPPETEER';
    const myHash = await window.md5(myString);
    console.log(`md5 of ${myString} is ${myHash}`);
  });
  await browser.close();
});
```

An example of adding a `window.readfile` function into the page:

给页面添加 `window.readfile` 函数的示例：

```js
const puppeteer = require('puppeteer');
const fs = require('fs');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('readfile', async filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, text) => {
        if (err)
          reject(err);
        else
          resolve(text);
      });
    });
  });
  await page.evaluate(async () => {
    // use window.readfile to read contents of a file
    const content = await window.readfile('/etc/hosts');
    console.log(content);
  });
  await browser.close();
});

```

#### page.focus(selector)
- `selector` <[string]> A [selector] of an element to focus. If there are multiple elements satisfying the selector, the first will be focused. （需要聚焦的元素的选择器（[selector]）。如果多个元素匹配该选择器，则焦点会被设置到第一个元素上）
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`. （返回一个 Promise，当 `selector` 选中的元素被成功聚焦后该 Promise 会变为完成态。如果没有元素匹配 `selector` 则该 Promise 会返回拒绝态）

This method fetches an element with `selector` and focuses it.
If there's no element matching `selector`, the method throws an error. （该方法使用 `selector` 获取元素并给它设置焦点。如果没有元素匹配 `selector`，该方法会抛出错误）

Shortcut for [page.mainFrame().focus(selector)](#framefocusselector).

该方法是 [page.mainFrame().focus(selector)](#framefocusselector) 的简写。

#### page.frames()
- returns: <[Array]<[Frame]>> An array of all frames attached to the page. （返回一个包含所有与当前页面关联的 frame 数组）

#### page.goBack(options)
- `options` <[Object]> Navigation parameters which might have the following properties: （页面导航参数，可以使用如下属性）
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method. （导航超时时间，以毫秒计算，默认为 30 秒， 传 `0` 表示禁用超时选项。默认值可以通过  [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) 方法修改）
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either: （决定导航成功完成的条件，默认为 `load`。传递一个事件数组，当所有事件都触发之后就当做导航成功。事件可以是以下之一）
    - `load` - consider navigation to be finished when the `load` event is fired. （当 `load` 事件触发的时候即表示导航完成）
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired. （当 `DOMContentLoaded` 事件触发的时候表示导航完成）
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms. （当至少 `500` 毫秒以内有不高于 0 个网络连接表示导航结束）
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms. （当至少 `500` 以内有不超过 2 个网络连接时表示导航结束）
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go back, resolves to `null`. （返回 Promise，该 Promise 将返回收到的主资源的响应 **（译者注：即一个 Response 实例对象，下同）**。在多次重定向的情况下，导航会返回最后一个重定向的响应内容。如果导航不能返回，则 Promise 会返回 `null`）

Navigate to the previous page in history.

该函数返回 history 中的上一个页面。

#### page.goForward(options)
- `options` <[Object]> Navigation parameters which might have the following properties: （页面导航参数，可以使用如下属性）
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method. （导航超时时间，以毫秒计算，默认为 30 秒， 传 `0` 表示禁用超时选项。默认值可以通过  [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) 方法修改）
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either: （决定导航成功完成的条件，默认为 `load`。传递一个事件数组，当所有事件都触发之后就当做导航成功。事件可以是以下之一）
    - `load` - consider navigation to be finished when the `load` event is fired. （当 `load` 事件触发的时候即表示导航完成）
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired. （当 `DOMContentLoaded` 事件触发的时候表示导航完成）
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms. （当至少 `500` 毫秒以内有不高于 0 个网络连接表示导航结束）
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms. （当至少 `500` 以内有不超过 2 个网络连接时表示导航结束）
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go forward, resolves to `null`. （返回 Promise，该 Promise 将返回主要资源的响应内容。在多次重定向的情况下，导航会返回最后一个重定向的响应内容。如果导航不能前进一个页面，则 Promise 会返回 `null`）

Navigate to the next page in history.

该函数导航到 history 中的下一个页面。

#### page.goto(url, options)
- `url` <[string]> URL to navigate page to. The url should include scheme, e.g. `https://`. （页面将导航到的 URL，url 需要包含 scheme 部分，如 `https://`）
- `options` <[Object]> Navigation parameters which might have the following properties:  （页面导航参数，可以使用如下属性）
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method. （导航超时时间，以毫秒计算，默认为 30 秒， 传 `0` 表示禁用超时选项。默认值可以通过  [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) 方法修改）
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either: （决定导航成功完成的条件，默认为 `load`。传递一个事件数组，当所有事件都触发之后就当做导航成功。事件可以是以下之一）
    - `load` - consider navigation to be finished when the `load` event is fired. （当 `load` 事件触发的时候即表示导航完成）
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired. （当 `DOMContentLoaded` 事件触发的时候表示导航完成）
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms. （当至少 `500` 毫秒以内有不高于 0 个网络连接表示导航结束）
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms. （当至少 `500` 以内有不超过 2 个网络连接时表示导航结束）
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. （返回 Promise，该 Promise 将返回主资源的响应内容，在多次重定向的情况下，导航会返回最后一个重定向的响应内容。）

The `page.goto` will throw an error if: 

在以下情况下， `page.goto` 将会抛出错误：

- there's an SSL error (e.g. in case of self-signed certificates). （发生 SSL 错误，如 自签名证书 错误）
- target URL is invalid. （目标 URL 不合法）
- the `timeout` is exceeded during navigation. （导航过程中超时）
- the main resource failed to load. （主资源加载失败）

> **NOTE** `page.goto` either throw or return a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
>
> **提示：** `page.goto` 要么抛出错误，要么返回主资源响应内容。唯一例外的是导航到 `about:blank` 或者导航到具有不同 hash 的相同 URL，这种情况下会成功导航并返回 `null`。

> **NOTE** Headless mode doesn't support navigating to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
>
> **提示：** Headless 模式下不支持导航到一个 PDF 文档。参考 [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).

#### page.hover(selector)
- `selector` <[string]> A [selector] to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered. （需要 hover 的元素选择器。如果有多个元素匹配该选择器，hover将会作用与第一个元素上）
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`. （返回一个 Promise 实例，当 hover 成功作用于与 `selector` 匹配的元素上时，Promise 将会变成完成态，如果没有元素匹配该选择器，则 Promise 变为拒绝态）

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If there's no element matching `selector`, the method throws an error.

该方法使用 `selector` 选取元素，如果有必要会将它移动到视图中，然后使用 [page.mouse](#pagemouse) 移动到元素中心。如果没有元素匹配 `selector` 则抛出错误。

Shortcut for [page.mainFrame().hover(selector)](#framehoverselector).

该方法是 [page.mainFrame().hover(selector)](#framehoverselector) 的简写。

#### page.isClosed()

- returns: boolean

Indicates that the page has been closed.

表明 page 是否已经关闭。

#### page.keyboard

- returns: <[Keyboard]>

#### page.mainFrame()
- returns: <[Frame]> returns page's main frame. （返回 page 的主 frame）

Page is guaranteed to have a main frame which persists during navigations.

Page 能够确保在导航期间也具有一个主 frame 存在。

#### page.metrics()
- returns: <[Promise]<[Object]>> Object containing metrics as key/value pairs. 
  - `Timestamp` <[number]> The timestamp when the metrics sample was taken.
  - `Documents` <[number]> Number of documents in the page.
  - `Frames` <[number]> Number of frames in the page.
  - `JSEventListeners` <[number]> Number of events in the page.
  - `Nodes` <[number]> Number of DOM nodes in the page.
  - `LayoutCount` <[number]> Total number of full or partial page layout.
  - `RecalcStyleCount` <[number]> Total number of page style recalculations.
  - `LayoutDuration` <[number]> Combined durations of all page layouts.
  - `RecalcStyleDuration` <[number]> Combined duration of all page style recalculations.
  - `ScriptDuration` <[number]> Combined duration of JavaScript execution.
  - `TaskDuration` <[number]> Combined duration of all tasks performed by the browser.
  - `JSHeapUsedSize` <[number]> Used JavaScript heap size.
  - `JSHeapTotalSize` <[number]> Total JavaScript heap size.

> **NOTE** All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.

（暂时未翻译）

#### page.mouse

- returns: <[Mouse]>

#### page.pdf(options)
- `options` <[Object]> Options object which might have the following properties:
  - `path` <[string]> The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the PDF won't be saved to the disk.
  - `scale` <[number]> Scale of the webpage rendering. Defaults to `1`.
  - `displayHeaderFooter` <[boolean]> Display header and footer. Defaults to `false`.
  - `headerTemplate` <[string]> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
    - `date` formatted print date
    - `title` document title
    - `url` document location
    - `pageNumber` current page number
    - `totalPages` total pages in the document
  - `footerTemplate` <[string]> HTML template for the print footer. Should use the same format as the `headerTemplate`.
  - `printBackground` <[boolean]> Print background graphics. Defaults to `false`.
  - `landscape` <[boolean]> Paper orientation. Defaults to `false`.
  - `pageRanges` <[string]> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  - `format` <[string]> Paper format. If set, takes priority over `width` or `height` options. Defaults to 'Letter'.
  - `width` <[string]> Paper width, accepts values labeled with units.
  - `height` <[string]> Paper height, accepts values labeled with units.
  - `margin` <[Object]> Paper margins, defaults to none.
    - `top` <[string]> Top margin, accepts values labeled with units.
    - `right` <[string]> Right margin, accepts values labeled with units.
    - `bottom` <[string]> Bottom margin, accepts values labeled with units.
    - `left` <[string]> Left margin, accepts values labeled with units.
  - `preferCSSPageSize` <[boolean]> Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format` options. Defaults to `false`, which will scale the content to fit the paper size.
- returns: <[Promise]<[Buffer]>> Promise which resolves with PDF buffer.

> **NOTE** Generating a pdf is currently only supported in Chrome headless.

`page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call [page.emulateMedia('screen')](#pageemulatemediamediatype) before calling `page.pdf()`:

> **NOTE** By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [`-webkit-print-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

```js
// Generates a PDF with 'screen' media type.
await page.emulateMedia('screen');
await page.pdf({path: 'page.pdf'});
```

The `width`, `height`, and `margin` options accept values labeled with units. Unlabeled values are treated as pixels.

A few examples:
- `page.pdf({width: 100})` - prints with width set to 100 pixels
- `page.pdf({width: '100px'})` - prints with width set to 100 pixels
- `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.

All possible units are:
- `px` - pixel
- `in` - inch
- `cm` - centimeter
- `mm` - millimeter

The `format` options are:
- `Letter`: 8.5in x 11in
- `Legal`: 8.5in x 14in
- `Tabloid`: 11in x 17in
- `Ledger`: 17in x 11in
- `A0`: 33.1in x 46.8in
- `A1`: 23.4in x 33.1in
- `A2`: 16.5in x 23.4in
- `A3`: 11.7in x 16.5in
- `A4`: 8.27in x 11.7in
- `A5`: 5.83in x 8.27in
- `A6`: 4.13in x 5.83in

> **NOTE** `headerTemplate` and `footerTemplate` markup have the following limitations:
> 1. Script tags inside templates are not evaluated.
> 2. Page styles are not visible inside templates.

暂时未翻译

#### page.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> A handle to the object prototype. （对象原型的操作句柄）
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a handle to an array of objects with this prototype. （返回 Promise，该 Promise 返回使用此原型的对象的数组）

The method iterates the JavaScript heap and finds all the objects with the given prototype.

该方法会迭代 JavaScript 堆内存并且找到所有使用该原型的对象。

```js
// Create a Map object
await page.evaluate(() => window.map = new Map());
// Get a handle to the Map object prototype
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// Query all map instances into an array
const mapInstances = await page.queryObjects(mapPrototype);
// Count amount of map objects in heap
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

Shortcut for [page.mainFrame().executionContext().queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle).

该方法是  [page.mainFrame().executionContext().queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle) 的简写。

#### page.reload(options)
- `options` <[Object]> Navigation parameters which might have the following properties: （页面导航参数，可以使用如下属性）
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method. （导航超时时间，以毫秒计算，默认为 30 秒， 传 `0` 表示禁用超时选项。默认值可以通过  [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) 方法修改）
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either: （决定导航成功完成的条件，默认为 `load`。传递一个事件数组，当所有事件都触发之后就当做导航成功。事件可以是以下之一）
    - `load` - consider navigation to be finished when the `load` event is fired.  （当 `load` 事件触发的时候即表示导航完成）
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired. （当 `DOMContentLoaded` 事件触发的时候表示导航完成）
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.  （当至少 `500` 毫秒以内有不高于 0 个网络连接表示导航结束）
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.  （当至少 `500` 以内有不超过 2 个网络连接时表示导航结束）
- returns: <[Promise]<[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. （返回 Promise，该 Promise 将返回主资源的响应内容，在多次重定向的情况下，导航会返回最后一个重定向的响应内容。）

#### page.screenshot([options])
- `options` <[Object]> Options object which might have the following properties: （选项参数，可以使用以下属性）
  - `path` <[string]> The file path to save the image to. The screenshot type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the image won't be saved to the disk. （保存截图的文件路径。截图的类型将会根据扩展名进行推断。如果 `path` 是相对路径，则会根据 [当前工作目录(cwd)](https://nodejs.org/api/process.html#process_process_cwd) 进行计算。如果没有提供路径，则图片不会被保存到磁盘上。）
  - `type` <[string]> Specify screenshot type, can be either `jpeg` or `png`. Defaults to 'png'. （指定截图类型，可以为 `jpeg` 或 `png`，默认为 'png'）
  - `quality` <[number]> The quality of the image, between 0-100. Not applicable to `png` images. （截图的图片质量，在 0-100 之间。不适用于 `png` 图像）
  - `fullPage` <[boolean]> When true, takes a screenshot of the full scrollable page. Defaults to `false`. （如果该选项为 true ，则截取完整可滚动页面的屏幕截图。默认为 `false`）
  - `clip` <[Object]> An object which specifies clipping region of the page. Should have the following fields: （一个指定截取范围的对象，它应该具有如下字段）
    - `x` <[number]> x-coordinate of top-left corner of clip area （所要截取区域左上角的 x 坐标）
    - `y` <[number]> y-coordinate of top-left corner of clip area （所要截取区域左上角的 y 坐标）
    - `width` <[number]> width of clipping area  （截取区域的宽度）
    - `height` <[number]> height of clipping area  （截取区域的高度）
  - `omitBackground` <[boolean]> Hides default white background and allows capturing screenshots with transparency. Defaults to `false`.  （隐藏默认的白色背景，并允许捕获具有透明度的屏幕截图）
  - `encoding` <[string]> The encoding of the image, can be either `base64` or `binary`. Defaults to `binary`.  （截取图标保存的编码，可以为 `base64` 或者 `binary`。默认为 `binary`）
- returns: <[Promise]<[Buffer|String]>> Promise which resolves to buffer or a base64 string (depending on the value of `encoding`) with captured screenshot.  （返回 Promise，该 Promise 成功后会返回所截取图片的 buffer 或者 base64编码 的字符串，返回值类型依赖 `encoding` 参数）

> **NOTE** Screenshots take at least 1/6 second on OS X. See https://crbug.com/741689 for discussion.
>
> **提示：** 截图在 OS X 上至少需要 1/6 秒。参考 https://crbug.com/741689 的讨论。

#### page.select(selector, ...values)
- `selector` <[string]> A [selector] to query page for （元素选择器）
- `...values` <...[string]> Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account. （该值为字符串数组类型，表示需要选中的 select option 的值。如果  `<select>` 具有 `multiple` 属性，则所有的值都会被选中，否则只有第一个值会被选中）
- returns: <[Promise]<[Array]<[string]>>> Returns an array of option values that have been successfully selected. （返回 Promise，该 Promise 会返回被成功选中的选项的值）

Triggers a `change` and `input` event once all the provided options have been selected.
If there's no `<select>` element matching `selector`, the method throws an error.

当提供的所有选项都被选中过后会触发 `change` 和 `input` 事件。
如果没有匹配的 `<select>` 元素则抛出错误。

```js
page.select('select#colors', 'blue'); // single selection
page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
```

Shortcut for [page.mainFrame().select()](#frameselectselector-values)

该方法为  [page.mainFrame().select()](#frameselectselector-values) 的简写。

#### page.setBypassCSP(enabled)
- `enabled` <[boolean]> sets bypassing of page's Content-Security-Policy. （设置绕过页面的 Content-Security-Policy）
- returns: <[Promise]>

Toggles bypassing page's Content-Security-Policy. （该方法能够切换是否绕过页面的 Content-Security-Policy）

> **NOTE** CSP bypassing happens at the moment of CSP initialization rather then evaluation. Usually this means
that `page.setBypassCSP` should be called before navigating to the domain.
>
> **提示：** 绕过 CSP 通常发生在 CSP 初始化时而非进行评测时。通常这将意味着 `page.setBypassCSP` 应该在导航到目标域名之前被调用。

#### page.setCacheEnabled(enabled)
- `enabled` <[boolean]> sets the `enabled` state of the cache. （设置缓存的 `enabled` 状态）
- returns: <[Promise]>

Toggles ignoring cache for each request based on the enabled state. By default, caching is enabled.

切换缓存启用状态来为每个请求设置该请求是否要忽略缓存（这里照着翻译有点别扭，大意为：设置请求是否使用缓存）。默认情况下，缓存处于启用状态。

#### page.setContent(html)
- `html` <[string]> HTML markup to assign to the page. （分配给页面的 HTML 标记）
- returns: <[Promise]>

#### page.setCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **required**
  - `value` <[string]> **required**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.  （以秒为单位的 Unix 时间）
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` <[string]> `"Strict"` or `"Lax"`.
- returns: <[Promise]>

#### page.setDefaultNavigationTimeout(timeout)
- `timeout` <[number]> Maximum navigation time in milliseconds （导航的超时时间）

This setting will change the default maximum navigation time of 30 seconds for the following methods: （通过该方法可以修改以下方法的默认导航超时时间）
- [page.goto(url, options)](#pagegotourl-options)
- [page.goBack(options)](#pagegobackoptions)
- [page.goForward(options)](#pagegoforwardoptions)
- [page.reload(options)](#pagereloadoptions)
- [page.waitForNavigation(options)](#pagewaitfornavigationoptions)

#### page.setExtraHTTPHeaders(headers)
- `headers` <[Object]> An object containing additional http headers to be sent with every request. All header values must be strings.  （设置每个请求都会额外携带的 http 头，每个头字段的值都必须为字符串类型）
- returns: <[Promise]>

The extra HTTP headers will be sent with every request the page initiates.

通过该页面发起的每个请求都会携带该方法设置的额外的 HTTP 头信息。

> **NOTE** page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.
>
> **提示：** 该方法不会保证发出的请求中 HTTP 头字段的顺序。

#### page.setJavaScriptEnabled(enabled)
- `enabled` <[boolean]> Whether or not to enable JavaScript on the page. （是否启用页面执行 JavaScript 的能力）
- returns: <[Promise]>

> **NOTE** changing this value won't affect scripts that have already been run. It will take full effect on the next [navigation](#pagegotourl-options).
>
> **提示** 通过该方法修改的值不会影响当前已经执行了的脚本。但是会完全影响下一次导航。

#### page.setOfflineMode(enabled)
- `enabled` <[boolean]> When `true`, enables offline mode for the page.  （当设置为 `true` 时表示开启当前页面的离线模式）
- returns: <[Promise]>

#### page.setRequestInterception(value)
- `value` <[boolean]> Whether to enable request interception. （是否激活进行拦截功能）
- returns: <[Promise]>

Activating request interception enables `request.abort`, `request.continue` and
`request.respond` methods.  This provides the capability to modify network requests that are made by a page.

激活请求拦截功能将会启用 `request.abort`, `request.continue` 和
`request.respond` 方法。它们将带来修改页面请求的能力。

An example of a naïve request interceptor that aborts all image requests:

下面是一个通过请求拦截功能阻断所有对图片发出的请求的示例：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });
  await page.goto('https://example.com');
  await browser.close();
});
```

> **NOTE** Enabling request interception disables page caching.
> **提示：** 启用请求拦截功能将会禁用页面缓存。

#### page.setUserAgent(userAgent)
- `userAgent` <[string]> Specific user agent to use in this page  （指定当前页所要使用的用户代理（userAgent）的字符串）
- returns: <[Promise]> Promise which resolves when the user agent is set. （返回Promise，当用户代理被设置成功过后该 Promise 也会转换为完成态）

#### page.setViewport(viewport)
- `viewport` <[Object]>
  - `width` <[number]> page width in pixels. （需要设置的页面像素宽度）
  - `height` <[number]> page height in pixels.  （页面像素高度）
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`. （指定页面的缩放因子（可以理解为 dpr），默认为 `1`）
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`. （是否采用 `meta viewport` 标签的内容，默认为 `false`）
  - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false` （指定视口是否支持 touch 事件，默认为 `false`）
  - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`. （指定视口是否已 landscape 模式显示，默认为 `false`）
- returns: <[Promise]>

> **NOTE** in certain cases, setting viewport will reload the page in order to set the `isMobile` or `hasTouch` properties.
>
> **提示：** 在某些情况下，视口可能会为了设置 `isMobile` 或者 `hasTouch` 属性而重新加载页面。

In the case of multiple pages in a single browser, each page can have its own viewport size.

如果单个浏览器中有多个页面，每个页面都可以有自己独立的视口大小。

#### page.tap(selector)
- `selector` <[string]> A [selector] to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped. （需要执行轻点（tap）行为的元素选择器。如果有多个元素匹配该选择器，则第一个元素会被点击）
- returns: <[Promise]>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.touchscreen](#pagetouchscreen) to tap in the center of the element.
If there's no element matching `selector`, the method throws an error.

该方法使用 `selector` 获取元素，如果不在视口中则会将其滚动到可见显示区域，然后使用  [page.touchscreen](#pagetouchscreen) 方法来轻点元素中心。如果没有元素匹配  `selector`则会该方法会抛出异常。

Shortcut for [page.mainFrame().tap(selector)](#frametapselector).

该方法为  [page.mainFrame().tap(selector)](#frametapselector) 的简写。

#### page.target()
- returns: <[Target]> a target this page was created from. （该页面被创建的 target）

#### page.title()
- returns: <[Promise]<[string]>> Returns page's title. （返回页面的标题）

Shortcut for [page.mainFrame().title()](#frametitle).

该方法是  [page.mainFrame().title()](#frametitle) 的简写。

#### page.touchscreen
- returns: <[Touchscreen]>

#### page.tracing
- returns: <[Tracing]>

#### page.type(selector, text[, options])
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used. （需要输入内容的元素的选择器。如果多个元素匹配该选择器，则会使用第一个元素）
- `text` <[string]> A text to type into a focused element. （将要输入到焦点元素中的文本内容）
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0. （以毫秒为单位的敲键间隔时长。默认为 0）
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

输入每个字符的时候都会发送 `keydown`, `keypress`/`input` 和 `keyup` 事件。

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](#keyboardpresskey-options).

如果需要按下指定的键，比如 `Control` 或者 `ArrowDown`，则需要使用  [`keyboard.press`](#keyboardpresskey-options) 方法。

```js
page.type('#mytextarea', 'Hello'); // Types instantly
page.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
```

Shortcut for [page.mainFrame().type(selector, text[, options])](#frametypeselector-text-options).

该方法是 [page.mainFrame().type(selector, text[, options])](#frametypeselector-text-options) 的简写。

#### page.url()
- returns: <[string]>

This is a shortcut for [page.mainFrame().url()](#frameurl)

该方法是 [page.mainFrame().url()](#frameurl) 的简写。

#### page.viewport()
- returns: <[Object]>
  - `width` <[number]> page width in pixels. （以像素为单位的页面宽度）
  - `height` <[number]> page height in pixels. （以像素为单位的页面高度）
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be though of as dpr). Defaults to `1`.  （设备的缩放因子（可以理解为 dpr）。默认为 `1`）
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.  （是否采用了 `meta viewport` 标签的内容。默认为 `false`）
  - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`  （视口是否支持 touch 事件。默认为 `false`）
  - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`. （视口是否以 landscape 模式显示。默认为 `false`）

该方法返回页面视口的参数。

#### page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> A [selector], predicate or timeout to wait for （需要等待的元素的选择器，一个函数或者需要等待的超时时间）
- `options` <[Object]> Optional waiting parameters （可选参数）
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction` （传递给 `pageFunction` 的参数）
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value  （返回Promise，它返回成功值的 JSHandle）

This method behaves differently with respect to the type of the first parameter:

该方法的具体表现会基于第一个参数的类型而有所不同：

- if `selectorOrFunctionOrTimeout` is a `string`, then the first argument is treated as a [selector] or [xpath], depending on whether or not it starts with '//', and the method is a shortcut for
  [page.waitForSelector](#pagewaitforselectorselector-options) or [page.waitForXPath](#pagewaitforxpathxpath-options) （如果 `selectorOrFunctionOrTimeout` 是一个 `string` 类型，则第一个参数会被当做一个 元素选择器（[selector]）或者 [xpath]，这取决于它是否已 `//` 作为开头，该方法是 [page.waitForSelector](#pagewaitforselectorselector-options) 或 [page.waitForXPath](#pagewaitforxpathxpath-options) 的简写）
- if `selectorOrFunctionOrTimeout` is a `function`, then the first argument is treated as a predicate to wait for and the method is a shortcut for [page.waitForFunction()](#pagewaitforfunctionpagefunction-options-args). （如果 `selectorOrFunctionOrTimeout` 是一个 `function` 类型，则第一个参数会被当做等待的条件判断依据来执行，此时该方法则为 [page.waitForFunction()](#pagewaitforfunctionpagefunction-options-args)的简写）
- if `selectorOrFunctionOrTimeout` is a `number`, then the first argument is treated as a timeout in milliseconds and the method returns a promise which resolves after the timeout （如果 `selectorOrFunctionOrTimeout` 是一个 `number` 类型，则第一个参数会被当做以毫秒为单位的超时时间，并且该方法返回一个 Promise，当达到超时时间后 Promise 会转为成功态）
- otherwise, an exception is thrown （其它情况则抛出异常）

```js
// wait for selector
await page.waitFor('.foo');
// wait for 1 second
await page.waitFor(1000);
// wait for predicate
await page.waitFor(() => !!document.querySelector('.foo'));
```

To pass arguments from node.js to the predicate of `page.waitFor` function:

从 nodejs 中向 `page.waitFor` 的函数传递参数：

```js
const selector = '.foo';
await page.waitFor(selector => !!document.querySelector(selector), {}, selector);
```

Shortcut for [page.mainFrame().waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args).

该方法是 [page.mainFrame().waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args) 的简写。

#### page.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context  （需要在浏览器上下文中执行的函数）
- `options` <[Object]> Optional waiting parameters （有如下可选项）
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values: （指定 `pageFunction` 每次执行的间隔时间，默认为 `raf`。如果 `polling` 是一个数字，则会当做以毫秒为单位的函数执行间隔时长，如果 `polling` 是一个字符串，则有以下两种情况）
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes. （在 requestAnimationFrame 回调中不断执行`pageFunction`。这是间隔最紧密的轮询模式，适合观察样式变化）
    - `mutation` - to execute `pageFunction` on every DOM mutation. （在每次 DOM 发生变化时执行 `pageFunction`）
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. （以毫秒为单位的等待超时时长。默认为 `30000`（30秒）。传 `0` 表示禁用超时选项）
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction` （传递给 `pageFunction` 的参数）
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value. （返回 Promise，当 `pageFunction` 返回一个逻辑真值时，该 Promise 转变为完成态并返回真值的 JSHandle）

The `waitForFunction` can be used to observe viewport size change:

`waitForFunction` 方法能够用来监视视口大小的变化：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const watchDog = page.waitForFunction('window.innerWidth < 100');
  await page.setViewport({width: 50, height: 50});
  await watchDog;
  await browser.close();
});
```

To pass arguments from node.js to the predicate of `page.waitForFunction` function:

从 nodejs 中向 `page.waitForFunction` 的函数传递参数：

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), {}, selector);
```

Shortcut for [page.mainFrame().waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args).

该方法为 [page.mainFrame().waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args) 的简写。

#### page.waitForNavigation(options)
- `options` <[Object]> Navigation parameters which might have the following properties:  （导航参数，可以使用如下选项）
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method. （以毫秒为单位的最大超时时长，默认为 30 秒，传 `0` 表示禁用超时选项。默认值可以通过 [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) 进行修改）
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either: （决定导航成功完成的条件，默认为 `load`。如果传递一个事件数组，则当所有事件都触发之后就当做导航成功。事件可以是以下之一）
    - `load` - consider navigation to be finished when the `load` event is fired. （当 `load` 事件触发的时候即表示导航结束）
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired. （当 `DOMContentLoaded` 事件触发的时候表示导航结束）
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.  （当至少 500 毫秒以内有不高于 0 个网络连接时表示导航结束）
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms. （当至少 500 以内有不超过 2 个网络连接时表示导航结束）
- returns: <[Promise]<[?Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`. （返回 Promise，该 Promise 将返回收到的主资源的响应 （译者注：即一个 Response 实例对象）。在多次重定向的情况下，导航会返回最后一个重定向的响应内容。当导航到不同的锚点或者是由 history API 引起的导航，则 Promise 会返回 null）

This resolves when the page navigates to a new URL or reloads. It is useful for when you run code
which will indirectly cause the page to navigate. Consider this example:

当页面导航到一个新的 URL 或者重新加载的时候该 Promise 会转为成功态。这在当你运行的代码会间接的导致页面跳转时会很有用，考虑下面的示例：

```js
const navigationPromise = page.waitForNavigation();
await page.click('a.my-link'); // Clicking the link will indirectly cause a navigation
await navigationPromise; // The navigationPromise resolves after navigation has finished
```

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

**提示：** 使用 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 来改变 URL 的操作会被当做是一次导航。

#### page.waitForRequest(urlOrPredicate, options)
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.  （一个需要等待的请求 URL 或者条件判断函数）
- `options` <[Object]> Optional waiting parameters  （可选项如下）
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. （以毫秒为单位的最大超时时间，默认为 30 秒，传 `0` 表示禁用超时选项）
- returns: <[Promise]<[Request]>> Promise which resolves to the matched request.  （返回 Promise，该 Promise 会返回匹配的请求）

```js
const firstRequest = await page.waitForRequest('http://example.com/resource');
const finalRequest = await page.waitForRequest(request => request.url() === 'http://example.com' && request.method() === 'GET');
return firstRequest.url();
```

#### page.waitForResponse(urlOrPredicate, options)
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.  （一个需要等待响应的 URL 或者条件判断函数）
- `options` <[Object]> Optional waiting parameters  （可选项如下）
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout.  （以毫秒为单位的最大超时时间，默认为 30 秒，传 `0` 表示禁用超时选项）
- returns: <[Promise]<[Response]>> Promise which resolves to the matched response.  （返回 Promise，该 Promise 会返回匹配的请求响应）

```js
const firstResponse = await page.waitForResponse('https://example.com/resource');
const finalResponse = await page.waitForResponse(response => response.url() === 'https://example.com' && response.status() === 200);
return finalResponse.ok();
```

#### page.waitForSelector(selector[, options])
- `selector` <[string]> A [selector] of an element to wait for  （需要等待的元素选择器）
- `options` <[Object]> Optional waiting parameters  （可选项如下）
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.  （等待元素出现在 DOM 中并可见，如没有 `display: none` 或者 `visibility: hidden` CSS 属性的元素。默认为 `false`）（译者注，即使元素没有表示隐藏的 CSS 属性，也可能被其它元素挡住而不可见，另外需要测试的是挡住它的上层元素具有透明度的情况）（待测试）
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`. （等待元素隐藏或者不在 DOM 中出现，如具有 `display: none` 或者 `visibility: hidden` 的 CSS 属性的元素。默认为 `false`）
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.  （以毫秒为单位的最大超时时间。默认为 `30000`（30秒）。传 `0` 表示禁用超时选项）
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by selector string is added to DOM. （返回 Promise，当通过选择器指定的元素被添加到 DOM 时 Promise 转为完成态）

Wait for the `selector` to appear in page. If at the moment of calling
the method the `selector` already exists, the method will return
immediately. If the selector doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

该方法会等待  `selector`  指定的元素出现在页面中，如果调用该函数的时候  `selector`  指定的元素已经存在，该方法会立即返回。如果在 `timeout` 毫秒之后还没有出现，则抛出异常。

This method works across navigations:

该方法适用于导航：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```
Shortcut for [page.mainFrame().waitForSelector(selector[, options])](#framewaitforselectorselector-options).

该方法是  [page.mainFrame().waitForSelector(selector[, options])](#framewaitforselectorselector-options) 的简写。

#### page.waitForXPath(xpath[, options])
- `xpath` <[string]> A [xpath] of an element to wait for  （需要等待的元素选的 [xpath] 选择器）
- `options` <[Object]> Optional waiting parameters （可选项如下）
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`. （等待元素出现在 DOM 中并可见，如没有 `display: none` 或者 `visibility: hidden` CSS 属性的元素。默认为 `false`）
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`. （等待元素隐藏或者不在 DOM 中出现，如具有 `display: none` 或者 `visibility: hidden` 的 CSS 属性的元素。默认为 `false`）
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.  （以毫秒为单位的最大超时时间。默认为 `30000`（30秒）。传 `0` 表示禁用超时选项）
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by xpath string is added to DOM. （返回 Promise，当通过 xpath 选择器指定的元素被添加到 DOM 时 Promise 转为完成态）

Wait for the `xpath` to appear in page. If at the moment of calling
the method the `xpath` already exists, the method will return
immediately. If the xpath doesn't appear after the `timeout` milliseconds of waiting, the function will throw.
 
该方法会等待  `xpath`  指定的元素出现在页面中，如果调用该函数的时候  `xpath` 指定的元素已经存在，该方法会立即返回。如果在 `timeout` 毫秒之后还没有出现，则抛出异常。

This method works across navigations:

该方法适用于导航：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```
Shortcut for [page.mainFrame().waitForXPath(xpath[, options])](#framewaitforxpathxpath-options).

该方法是 Shortcut for [page.mainFrame().waitForXPath(xpath[, options])](#framewaitforxpathxpath-options) 的简写。

#### page.workers()
- returns: <[Array]<[Worker]>>
This method returns all of the dedicated [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) associated with the page. 该方法返回与当前页面相关的所有 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

> **NOTE** This does not contain ServiceWorkers
>
> **提示：** 不包含 ServiceWorkers

### class: Worker

The Worker class represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).
The events `workercreated` and `workerdestroyed` are emitted on the page object to signal the worker lifecycle.

```js
page.on('workercreated', worker => console.log('Worker created: ' + worker.url()));
page.on('workerdestroyed', worker => console.log('Worker destroyed: ' + worker.url()));

console.log('Current workers:');
for (const worker of page.workers())
  console.log('  ' + worker.url());
```

#### worker.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the worker context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `worker.evaluate` returns a [Promise], then `worker.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `worker.evaluate` returns a non-[Serializable] value, then `worker.evaluate` resolves to `undefined`.

Shortcut for [(await worker.executionContext()).evaluate(pageFunction, ...args)](#executioncontextevaluatepagefunction-args).

#### worker.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `worker.evaluate` and `worker.evaluateHandle` is that `worker.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `worker.evaluateHandle` returns a [Promise], then `worker.evaluateHandle` would wait for the promise to resolve and return its value.

Shortcut for [(await worker.executionContext()).evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args).

#### worker.executionContext()
- returns: <[Promise]<[ExecutionContext]>>

#### worker.url()
- returns: <[string]>

### class: Keyboard

Keyboard provides an api for managing a virtual keyboard. The high level api is [`keyboard.type`](#keyboardtypetext-options), which takes raw characters and generates proper keydown, keypress/input, and keyup events on your page.

For finer control, you can use [`keyboard.down`](#keyboarddownkey-options), [`keyboard.up`](#keyboardupkey), and [`keyboard.sendCharacter`](#keyboardsendcharacterchar) to manually fire events as if they were generated from a real keyboard.

An example of holding down `Shift` in order to select and delete some text:
```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// Result text will end up saying 'Hello!'
```

An example of pressing `A`
```js
await page.keyboard.down('Shift');
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');
```

> **NOTE** On MacOS, keyboard shortcuts like `⌘ A` -> Select All do not work. See [#1313](https://github.com/GoogleChrome/puppeteer/issues/1313)

#### keyboard.down(key[, options])
- `key` <[string]> Name of key to press, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- `options` <[Object]>
  - `text` <[string]> If specified, generates an input event with this text.
- returns: <[Promise]>

Dispatches a `keydown` event.

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated.

If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`, subsequent key presses will be sent with that modifier active. To release the modifier key, use [`keyboard.up`](#keyboardupkey).

After the key is pressed once, subsequent calls to [`keyboard.down`](#keyboarddownkey-options) will have [repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) set to true. To release the key, use [`keyboard.up`](#keyboardupkey).

> **NOTE** Modifier keys DO influence `keyboard.down`. Holding down `Shift` will type the text in upper case.

#### keyboard.press(key[, options])
- `key` <[string]> Name of key to press, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- `options` <[Object]>
  - `text` <[string]> If specified, generates an input event with this text.
  - `delay` <[number]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- returns: <[Promise]>

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated.

> **NOTE** Modifier keys DO effect `keyboard.press`. Holding down `Shift` will type the text in upper case.

Shortcut for [`keyboard.down`](#keyboarddownkey-options) and [`keyboard.up`](#keyboardupkey).

#### keyboard.sendCharacter(char)
- `char` <[string]> Character to send into the page.
- returns: <[Promise]>

Dispatches a `keypress` and `input` event. This does not send a `keydown` or `keyup` event.

```js
page.keyboard.sendCharacter('嗨');
```

> **NOTE** Modifier keys DO NOT effect `keyboard.sendCharacter`. Holding down `Shift` will not type the text in upper case.

#### keyboard.type(text, options)
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](#keyboardpresskey-options).

```js
page.keyboard.type('Hello'); // Types instantly
page.keyboard.type('World', {delay: 100}); // Types slower, like a user
```

> **NOTE** Modifier keys DO NOT effect `keyboard.type`. Holding down `Shift` will not type the text in upper case.

#### keyboard.up(key)
- `key` <[string]> Name of key to release, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- returns: <[Promise]>

Dispatches a `keyup` event.

### class: Mouse

#### mouse.click(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, or `middle`, defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]>

Shortcut for [`mouse.move`](#mousemovex-y-options), [`mouse.down`](#mousedownoptions) and [`mouse.up`](#mouseupoptions).

#### mouse.down([options])
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, or `middle`, defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
- returns: <[Promise]>

Dispatches a `mousedown` event.

#### mouse.move(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `steps` <[number]> defaults to 1. Sends intermediate `mousemove` events.
- returns: <[Promise]>

Dispatches a `mousemove` event.

#### mouse.up([options])
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, or `middle`, defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
- returns: <[Promise]>

Dispatches a `mouseup` event.

### class: Touchscreen

#### touchscreen.tap(x, y)
- `x` <[number]>
- `y` <[number]>
- returns: <[Promise]>

Dispatches a `touchstart` and `touchend` event.

### class: Tracing

You can use [`tracing.start`](#tracingstartoptions) and [`tracing.stop`](#tracingstop) to create a trace file which can be opened in Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

```js
await page.tracing.start({path: 'trace.json'});
await page.goto('https://www.google.com');
await page.tracing.stop();
```

#### tracing.start(options)
- `options` <[Object]>
  - `path` <[string]> A path to write the trace file to.
  - `screenshots` <[boolean]> captures screenshots in the trace.
  - `categories` <[Array]<[string]>> specify custom categories to use instead of default.
- returns: <[Promise]>

Only one trace can be active at a time per browser.

#### tracing.stop()
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with trace data.

### class: Dialog

[Dialog] objects are dispatched by page via the ['dialog'](#event-dialog) event.

An example of using `Dialog` class:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
    await browser.close();
  });
  page.evaluate(() => alert('1'));
});
```

#### dialog.accept([promptText])
- `promptText` <[string]> A text to enter in prompt. Does not cause any effects if the dialog's `type` is not prompt.
- returns: <[Promise]> Promise which resolves when the dialog has been accepted.

#### dialog.defaultValue()
- returns: <[string]> If dialog is prompt, returns default prompt value. Otherwise, returns empty string.

#### dialog.dismiss()
- returns: <[Promise]> Promise which resolves when the dialog has been dismissed.

#### dialog.message()
- returns: <[string]> A message displayed in the dialog.

#### dialog.type()
- returns: <[string]> Dialog's type, can be one of `alert`, `beforeunload`, `confirm` or `prompt`.

### class: ConsoleMessage

[ConsoleMessage] objects are dispatched by page via the ['console'](#event-console) event.

#### consoleMessage.args()
- returns: <[Array]<[JSHandle]>>

#### consoleMessage.text()
- returns: <[string]>

#### consoleMessage.type()
- returns: <[string]>

One of the following values: `'log'`, `'debug'`, `'info'`, `'error'`, `'warning'`, `'dir'`, `'dirxml'`, `'table'`, `'trace'`, `'clear'`, `'startGroup'`, `'startGroupCollapsed'`, `'endGroup'`, `'assert'`, `'profile'`, `'profileEnd'`, `'count'`, `'timeEnd'`.

### class: Frame

At every point of time, page exposes its current frame tree via the [page.mainFrame()](#pagemainframe) and [frame.childFrames()](#framechildframes) methods.

[Frame] object's lifecycle is controlled by three events, dispatched on the page object:
- ['frameattached'](#event-frameattached) - fired when the frame gets attached to the page. A Frame can be attached to the page only once.
- ['framenavigated'](#event-framenavigated) - fired when the frame commits navigation to a different URL.
- ['framedetached'](#event-framedetached) - fired when the frame gets detached from the page.  A Frame can be detached from the page only once.

An example of dumping frame tree:

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com/chrome/browser/canary.html');
  dumpFrameTree(page.mainFrame(), '');
  await browser.close();

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url());
    for (let child of frame.childFrames())
      dumpFrameTree(child, indent + '  ');
  }
});
```

#### frame.$(selector)
- `selector` <[string]> A [selector] to query frame for
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves to ElementHandle pointing to the frame element.

The method queries frame for the selector. If there's no such element within the frame, the method will resolve to `null`.

#### frame.$$(selector)
- `selector` <[string]> A [selector] to query frame for
- returns: <[Promise]<[Array]<[ElementHandle]>>> Promise which resolves to ElementHandles pointing to the frame elements.

The method runs `document.querySelectorAll` within the frame. If no elements match the selector, the return value resolve to `[]`.

#### frame.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query frame for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `Array.from(document.querySelectorAll(selector))` within the frame and passes it as the first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `frame.$$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const divsCounts = await frame.$$eval('div', divs => divs.length);
```

#### frame.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query frame for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `document.querySelector` within the frame and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const searchValue = await frame.$eval('#search', el => el.value);
const preloadHref = await frame.$eval('link[rel=preload]', el => el.href);
const html = await frame.$eval('.main-container', e => e.outerHTML);
```

#### frame.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method evaluates the XPath expression.

#### frame.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of a script to be added.
  - `path` <[string]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw JavaScript content to be injected into frame.
  - `type` <[string]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

#### frame.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of the `<link>` tag.
  - `path` <[string]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw CSS content to be injected into frame.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

#### frame.childFrames()
- returns: <[Array]<[Frame]>>

#### frame.click(selector[, options])
- `selector` <[string]> A [selector] to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, or `middle`, defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully clicked. The Promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to click in the center of the element.
If there's no element matching `selector`, the method throws an error.

Bear in mind that if `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  frame.click(selector, clickOptions),
]);
```

#### frame.content()
- returns: <[Promise]<[String]>>

Gets the full HTML contents of the frame, including the doctype.

#### frame.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `frame.evaluate` returns a [Promise], then `frame.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `frame.evaluate` returns a non-[Serializable] value, then `frame.evaluate` resolves to `undefined`.

```js
const result = await frame.evaluate(() => {
  return Promise.resolve(8 * 7);
});
console.log(result); // prints "56"
```

A string can also be passed in instead of a function.

```js
console.log(await frame.evaluate('1 + 2')); // prints "3"
```

[ElementHandle] instances can be passed as arguments to the `frame.evaluate`:
```js
const bodyHandle = await frame.$('body');
const html = await frame.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

#### frame.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `frame.evaluate` and `frame.evaluateHandle` is that `frame.evaluateHandle` returns in-page object (JSHandle).

If the function, passed to the `frame.evaluateHandle`, returns a [Promise], then `frame.evaluateHandle` would wait for the promise to resolve and return its value.

```js
const aWindowHandle = await frame.evaluateHandle(() => Promise.resolve(window));
aWindowHandle; // Handle for the window object.
```

A string can also be passed in instead of a function.

```js
const aHandle = await frame.evaluateHandle('document'); // Handle for the 'document'.
```

[JSHandle] instances can be passed as arguments to the `frame.evaluateHandle`:
```js
const aHandle = await frame.evaluateHandle(() => document.body);
const resultHandle = await frame.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```


#### frame.executionContext()
- returns: <[Promise]<[ExecutionContext]>> Execution context associated with this frame.

#### frame.focus(selector)
- `selector` <[string]> A [selector] of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector` and focuses it.
If there's no element matching `selector`, the method throws an error.

#### frame.hover(selector)
- `selector` <[string]> A [selector] to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If there's no element matching `selector`, the method throws an error.

#### frame.isDetached()
- returns: <[boolean]>

Returns `true` if the frame has been detached, or `false` otherwise.

#### frame.name()
- returns: <[string]>

Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

> **NOTE** This value is calculated once when the frame is created, and will not update if the attribute is changed later.

#### frame.parentFrame()
- returns: <?[Frame]> Returns parent frame, if any. Detached frames and main frames return `null`.

#### frame.select(selector, ...values)
- `selector` <[string]> A [selector] to query frame for
- `...values` <...[string]> Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.
- returns: <[Promise]<[Array]<[string]>>> Returns an array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.
If there's no `<select>` element matching `selector`, the method throws an error.

```js
frame.select('select#colors', 'blue'); // single selection
frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
```

#### frame.setContent(html)
- `html` <[string]> HTML markup to assign to the page.
- returns: <[Promise]>

#### frame.tap(selector)
- `selector` <[string]> A [selector] to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped.
- returns: <[Promise]>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.touchscreen](#pagetouchscreen) to tap in the center of the element.
If there's no element matching `selector`, the method throws an error.

#### frame.title()
- returns: <[Promise]<[string]>> Returns page's title.

#### frame.type(selector, text[, options])
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](#keyboardpresskey-options).

```js
frame.type('#mytextarea', 'Hello'); // Types instantly
frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
```

#### frame.url()
- returns: <[string]>

Returns frame's url.

#### frame.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> A [selector], predicate or timeout to wait for
- `options` <[Object]> Optional waiting parameters
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value

This method behaves differently with respect to the type of the first parameter:
- if `selectorOrFunctionOrTimeout` is a `string`, then the first argument is treated as a [selector] or [xpath], depending on whether or not it starts with '//', and the method is a shortcut for
  [frame.waitForSelector](#framewaitforselectorselector-options) or [frame.waitForXPath](#framewaitforxpathxpath-options)
- if `selectorOrFunctionOrTimeout` is a `function`, then the first argument is treated as a predicate to wait for and the method is a shortcut for [frame.waitForFunction()](#framewaitforfunctionpagefunction-options-args).
- if `selectorOrFunctionOrTimeout` is a `number`, then the first argument is treated as a timeout in milliseconds and the method returns a promise which resolves after the timeout
- otherwise, an exception is thrown

```js
// wait for selector
await page.waitFor('.foo');
// wait for 1 second
await page.waitFor(1000);
// wait for predicate
await page.waitFor(() => !!document.querySelector('.foo'));
```

To pass arguments from node.js to the predicate of `page.waitFor` function:

```js
const selector = '.foo';
await page.waitFor(selector => !!document.querySelector(selector), {}, selector);
```

#### frame.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `options` <[Object]> Optional waiting parameters
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

The `waitForFunction` can be used to observe viewport size change:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
  page.setViewport({width: 50, height: 50});
  await watchDog;
  await browser.close();
});
```

To pass arguments from node.js to the predicate of `page.waitForFunction` function:

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), {}, selector);
```

#### frame.waitForSelector(selector[, options])
- `selector` <[string]> A [selector] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by selector string is added to DOM.

Wait for the `selector` to appear in page. If at the moment of calling
the method the `selector` already exists, the method will return
immediately. If the selector doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page.mainFrame()
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```

#### frame.waitForXPath(xpath[, options])
- `xpath` <[string]> A [xpath] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by xpath string is added to DOM.

Wait for the `xpath` to appear in page. If at the moment of calling
the method the `xpath` already exists, the method will return
immediately. If the xpath doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page.mainFrame()
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```

### class: ExecutionContext

The class represents a context for JavaScript execution. Examples of JavaScript contexts are:
- each [frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) has a separate execution context
- all kind of [workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) have their own contexts

#### executionContext.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in `executionContext`
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `executionContext.evaluate` returns a [Promise], then `executionContext.evaluate` would wait for the promise to resolve and return its value.

```js
const executionContext = await page.mainFrame().executionContext();
const result = await executionContext.evaluate(() => Promise.resolve(8 * 7));
console.log(result); // prints "56"
```

A string can also be passed in instead of a function.

```js
console.log(await executionContext.evaluate('1 + 2')); // prints "3"
```

[JSHandle] instances can be passed as arguments to the `executionContext.evaluate`:
```js
const oneHandle = await executionContext.evaluateHandle(() => 1);
const twoHandle = await executionContext.evaluateHandle(() => 2);
const result = await executionContext.evaluate((a, b) => a + b, oneHandle, twoHandle);
await oneHandle.dispose();
await twoHandle.dispose();
console.log(result); // prints '3'.
```

#### executionContext.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the `executionContext`
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `executionContext.evaluate` and `executionContext.evaluateHandle` is that `executionContext.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `executionContext.evaluateHandle` returns a [Promise], then `executionContext.evaluateHandle` would wait for the promise to resolve and return its value.

```js
const context = await page.mainFrame().executionContext();
const aHandle = await context.evaluateHandle(() => Promise.resolve(self));
aHandle; // Handle for the global object.
```

A string can also be passed in instead of a function.

```js
const aHandle = await context.evaluateHandle('1 + 2'); // Handle for the '3' object.
```

[JSHandle] instances can be passed as arguments to the `executionContext.evaluateHandle`:
```js
const aHandle = await context.evaluateHandle(() => document.body);
const resultHandle = await context.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue()); // prints body's innerHTML
await aHandle.dispose();
await resultHandle.dispose();
```

#### executionContext.frame()
- returns: <?[Frame]> Frame associated with this execution context.

> **NOTE** Not every execution context is associated with a frame. For example, workers and extensions have execution contexts that are not associated with frames.

#### executionContext.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> A handle to the object prototype.
- returns: <[JSHandle]> A handle to an array of objects with this prototype

The method iterates the JavaScript heap and finds all the objects with the given prototype.

```js
// Create a Map object
await page.evaluate(() => window.map = new Map());
// Get a handle to the Map object prototype
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// Query all map instances into an array
const mapInstances = await page.queryObjects(mapPrototype);
// Count amount of map objects in heap
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

### class: JSHandle

JSHandle represents an in-page JavaScript object. JSHandles can be created with the [page.evaluateHandle](#pageevaluatehandlepagefunction-args) method.

```js
const windowHandle = await page.evaluateHandle(() => window);
// ...
```

JSHandle prevents the referenced JavaScript object being garbage collected unless the handle is [disposed](#jshandledispose). JSHandles are auto-disposed when their origin frame gets navigated or the parent context gets destroyed.

JSHandle instances can be used as arguments in [`page.$eval()`](#pageevalselector-pagefunction-args), [`page.evaluate()`](#pageevaluatepagefunction-args) and [`page.evaluateHandle`](#pageevaluatehandlepagefunction-args) methods.

#### jsHandle.asElement()
- returns: <?[ElementHandle]>

Returns either `null` or the object handle itself, if the object handle is an instance of [ElementHandle].

#### jsHandle.dispose()
- returns: <[Promise]> Promise which resolves when the object handle is successfully disposed.

The `jsHandle.dispose` method stops referencing the element handle.

#### jsHandle.executionContext()
- returns: [ExecutionContext]

Returns execution context the handle belongs to.

#### jsHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

The method returns a map with property names as keys and JSHandle instances for the property values.

```js
const handle = await page.evaluateHandle(() => ({window, document}));
const properties = await handle.getProperties();
const windowHandle = properties.get('window');
const documentHandle = properties.get('document');
await handle.dispose();
```

#### jsHandle.getProperty(propertyName)
- `propertyName` <[string]> property to get
- returns: <[Promise]<[JSHandle]>>

Fetches a single property from the referenced object.

#### jsHandle.jsonValue()
- returns: <[Promise]<[Object]>>

Returns a JSON representation of the object. If the object has a
[`toJSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)
function, it **will not be called**.

> **NOTE** The method will return an empty JSON object if the referenced object is not stringifiable. It will throw an error if the object has circular references.

### class: ElementHandle

> **NOTE** Class [ElementHandle] extends [JSHandle].

ElementHandle represents an in-page DOM element. ElementHandles can be created with the [page.$](#pageselector) method.

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://google.com');
  const inputElement = await page.$('input[type=submit]');
  await inputElement.click();
  // ...
});
```

ElementHandle prevents DOM element from garbage collection unless the handle is [disposed](#elementhandledispose). ElementHandles are auto-disposed when their origin frame gets navigated.

ElementHandle instances can be used as arguments in [`page.$eval()`](#pageevalselector-pagefunction-args) and [`page.evaluate()`](#pageevaluatepagefunction-args) methods.

#### elementHandle.$(selector)
- `selector` <[string]> A [selector] to query element for
- returns: <[Promise]<?[ElementHandle]>>

The method runs `element.querySelector` within the page. If no element matches the selector, the return value resolve to `null`.

#### elementHandle.$$(selector)
- `selector` <[string]> A [selector] to query element for
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method runs `element.querySelectorAll` within the page. If no elements match the selector, the return value resolve to `[]`.

#### elementHandle.$$eval(selector, pageFunction, ...args)
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `document.querySelectorAll` within the element and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$$eval` would wait for the promise to resolve and return its value.

Examples:
```html
<div class="feed">
  <div class="tweet">Hello!</div>
  <div class="tweet">Hi!</div>
</div>
```
```js
const feedHandle = await page.$('.feed');
expect(await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText)).toEqual(['Hello!', 'Hi!']);
```

#### elementHandle.$eval(selector, pageFunction, ...args)
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `document.querySelector` within the element and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const tweetHandle = await page.$('.tweet');
expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe('100');
expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe('10');
```

#### elementHandle.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method evaluates the XPath expression relative to the elementHandle. If there are no such elements, the method will resolve to an empty array.

#### elementHandle.asElement()
- returns: <[ElementHandle]>

#### elementHandle.boundingBox()
- returns: <[Promise]<?[Object]>>
  - x <[number]> the x coordinate of the element in pixels.
  - y <[number]> the y coordinate of the element in pixels.
  - width <[number]> the width of the element in pixels.
  - height <[number]> the height of the element in pixels.

This method returns the bounding box of the element (relative to the main frame), or `null` if the element is not visible.

#### elementHandle.boxModel()
- returns: <[Promise]<?[Object]>>
  - content <[Array]<[Object]>> Content box, represented as an array of {x, y} points.
  - padding <[Array]<[Object]>> Padding box, represented as an array of {x, y} points.
  - border <[Array]<[Object]>> Border box, represented as an array of {x, y} points.
  - margin <[Array]<[Object]>> Margin box, represented as an array of {x, y} points.
  - width <[number]> Element's width.
  - height <[number]> Element's height.

This method returns boxes of the element, or `null` if the element is not visible. Boxes are represented as an array of points; each Point is an object `{x, y}`. Box points are sorted clock-wise.

#### elementHandle.click([options])
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, or `middle`, defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]> Promise which resolves when the element is successfully clicked. Promise gets rejected if the element is detached from DOM.

This method scrolls element into view if needed, and then uses [page.mouse](#pagemouse) to click in the center of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.contentFrame()
- returns: <[Promise]<?[Frame]>> Resolves to the content frame for element handles referencing iframe nodes, or null otherwise

#### elementHandle.dispose()
- returns: <[Promise]> Promise which resolves when the element handle is successfully disposed.

The `elementHandle.dispose` method stops referencing the element handle.

#### elementHandle.executionContext()
- returns: [ExecutionContext]

#### elementHandle.focus()
- returns: <[Promise]>

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element.

#### elementHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

The method returns a map with property names as keys and JSHandle instances for the property values.

```js
const listHandle = await page.evaluateHandle(() => document.body.children);
const properties = await listHandle.getProperties();
const children = [];
for (const property of properties.values()) {
  const element = property.asElement();
  if (element)
    children.push(element);
}
children; // holds elementHandles to all children of document.body
```

#### elementHandle.getProperty(propertyName)
- `propertyName` <[string]> property to get
- returns: <[Promise]<[JSHandle]>>

Fetches a single property from the objectHandle.

#### elementHandle.hover()
- returns: <[Promise]> Promise which resolves when the element is successfully hovered.

This method scrolls element into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.isIntersectingViewport()
- returns: <[Promise]<[boolean]>> Resolves to true if the element is visible in the current viewport.

#### elementHandle.jsonValue()
- returns: <[Promise]<[Object]>>

Returns a JSON representation of the object. The JSON is generated by running [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) on the object in page and consequent [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) in puppeteer.

> **NOTE** The method will throw if the referenced object is not stringifiable.

#### elementHandle.press(key[, options])
- `key` <[string]> Name of key to press, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- `options` <[Object]>
  - `text` <[string]> If specified, generates an input event with this text.
  - `delay` <[number]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- returns: <[Promise]>

Focuses the element, and then uses [`keyboard.down`](#keyboarddownkey-options) and [`keyboard.up`](#keyboardupkey).

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also be generated. The `text` option can be specified to force an input event to be generated.

> **NOTE** Modifier keys DO effect `elementHandle.press`. Holding down `Shift` will type the text in upper case.

#### elementHandle.screenshot([options])
- `options` <[Object]> Same options as in [page.screenshot](#pagescreenshotoptions).
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with captured screenshot.

This method scrolls element into view if needed, and then uses [page.screenshot](#pagescreenshotoptions) to take a screenshot of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.tap()
- returns: <[Promise]> Promise which resolves when the element is successfully tapped. Promise gets rejected if the element is detached from DOM.

This method scrolls element into view if needed, and then uses [touchscreen.tap](#touchscreentapx-y) to tap in the center of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.toString()
- returns: <[string]>

#### elementHandle.type(text[, options])
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`elementHandle.press`](#elementhandlepresskey-options).

```js
elementHandle.type('Hello'); // Types instantly
elementHandle.type('World', {delay: 100}); // Types slower, like a user
```

An example of typing into a text field and then submitting the form:
```js
const elementHandle = await page.$('input');
await elementHandle.type('some text');
await elementHandle.press('Enter');
```

#### elementHandle.uploadFile(...filePaths)
- `...filePaths` <...[string]> Sets the value of the file input these paths. If some of the  `filePaths` are relative paths, then they are resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
- returns: <[Promise]>

This method expects `elementHandle` to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

### class: Request

Whenever the page sends a request, such as for a network resource, the following events are emitted by puppeteer's page:
- ['request'](#event-request) emitted when the request is issued by the page.
- ['response'](#event-response) emitted when/if the response is received for the request.
- ['requestfinished'](#event-requestfinished) emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of 'requestfinished' event (and possibly instead of 'response' event), the  ['requestfailed'](#event-requestfailed) event is emitted.

If request gets a 'redirect' response, the request is successfully finished with the 'requestfinished' event, and a new request is  issued to a redirected url.

#### request.abort([errorCode])
- `errorCode` <[string]> Optional error code. Defaults to `failed`, could be
  one of the following:
  - `aborted` - An operation was aborted (due to user action)
  - `accessdenied` - Permission to access a resource, other than the network, was denied
  - `addressunreachable` - The IP address is unreachable. This usually means
    that there is no route to the specified host or network.
  - `blockedbyclient` - The client chose to block the request.
  - `blockedbyresponse` - The request failed because the response was delivered along with requirements which are not met ('X-Frame-Options' and 'Content-Security-Policy' ancestor checks, for instance).
  - `connectionaborted` - A connection timed out as a result of not receiving an ACK for data sent.
  - `connectionclosed` - A connection was closed (corresponding to a TCP FIN).
  - `connectionfailed` - A connection attempt failed.
  - `connectionrefused` - A connection attempt was refused.
  - `connectionreset` - A connection was reset (corresponding to a TCP RST).
  - `internetdisconnected` - The Internet connection has been lost.
  - `namenotresolved` - The host name could not be resolved.
  - `timedout` - An operation timed out.
  - `failed` - A generic failure occurred.
- returns: <[Promise]>

Aborts request. To use this, request interception should be enabled with `page.setRequestInterception`.
Exception is immediately thrown if the request interception is not enabled.

#### request.continue([overrides])
- `overrides` <[Object]> Optional request overwrites, which can be one of the following:
  - `url` <[string]> If set, the request url will be changed
  - `method` <[string]> If set changes the request method (e.g. `GET` or `POST`)
  - `postData` <[string]> If set changes the post data of request
  - `headers` <[Object]> If set changes the request HTTP headers
- returns: <[Promise]>

Continues request with optional request overrides. To use this, request interception should be enabled with `page.setRequestInterception`.
Exception is immediately thrown if the request interception is not enabled.

#### request.failure()
- returns: <?[Object]> Object describing request failure, if any
  - `errorText` <[string]> Human-readable error message, e.g. `'net::ERR_FAILED'`.

The method returns `null` unless this request was failed, as reported by
`requestfailed` event.

Example of logging all failed requests:

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

#### request.frame()
- returns: <?[Frame]> A matching [Frame] object, or `null` if navigating to error pages.

#### request.headers()
- returns: <[Object]> An object with HTTP headers associated with the request. All header names are lower-case.

#### request.isNavigationRequest()
- returns: <[boolean]>

Whether this request is driving frame's navigation.

#### request.method()
- returns: <[string]> Request's method (GET, POST, etc.)

#### request.postData()
- returns: <[string]> Request's post body, if any.

#### request.redirectChain()
- returns: <[Array]<[Request]>>

A `redirectChain` is a chain of requests initiated to fetch a resource.
- If there are no redirects and the request was successful, the chain will be empty.
- If a server responds with at least a single redirect, then the chain will
contain all the requests that were redirected.

`redirectChain` is shared between all the requests of the same chain.

For example, if the website `http://example.com` has a single redirect to
`https://example.com`, then the chain will contain one request:

```js
const response = await page.goto('http://example.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 1
console.log(chain[0].url()); // 'http://example.com'
```

If the website `https://google.com` has no redirects, then the chain will be empty:
```js
const response = await page.goto('https://google.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 0
```

#### request.resourceType()
- returns: <[string]>

Contains the request's resource type as it was perceived by the rendering engine.
ResourceType will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

#### request.respond(response)
- `response` <[Object]> Response that will fulfill this request
  - `status` <[number]> Response status code, defaults to `200`.
  - `headers` <[Object]> Optional response headers
  - `contentType` <[string]> If set, equals to setting `Content-Type` response header
  - `body` <[Buffer]|[string]> Optional response body
- returns: <[Promise]>

Fulfills request with given response. To use this, request interception should
be enabled with `page.setRequestInterception`. Exception is thrown if
request interception is not enabled.

An example of fulfilling all requests with 404 responses:

```js
await page.setRequestInterception(true);
page.on('request', request => {
  request.respond({
    status: 404,
    contentType: 'text/plain',
    body: 'Not Found!'
  });
});
```

> **NOTE** Mocking responses for dataURL requests is not supported.
> Calling `request.respond` for a dataURL request is a noop.

#### request.response()
- returns: <?[Response]> A matching [Response] object, or `null` if the response has not been received yet.

#### request.url()
- returns: <[string]> URL of the request.

### class: Response

[Response] class represents responses which are received by page.

#### response.buffer()
- returns: <Promise<[Buffer]>> Promise which resolves to a buffer with response body.

#### response.fromCache()
- returns: <[boolean]>

True if the response was served from either the browser's disk cache or memory cache.

#### response.fromServiceWorker()
- returns: <[boolean]>

True if the response was served by a service worker.

#### response.headers()
- returns: <[Object]> An object with HTTP headers associated with the response. All header names are lower-case.

#### response.json()
- returns: <Promise<[Object]>> Promise which resolves to a JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

#### response.ok()
- returns: <[boolean]>

Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

#### response.request()
- returns: <[Request]> A matching [Request] object.

#### response.securityDetails()
- returns: <?[SecurityDetails]> Security details if the response was received over the secure connection, or `null` otherwise.

#### response.status()
- returns: <[number]>

Contains the status code of the response (e.g., 200 for a success).

#### response.text()
- returns: <[Promise]<[string]>> Promise which resolves to a text representation of response body.

#### response.url()
- returns: <[string]>

Contains the URL of the response.

### class: SecurityDetails

[SecurityDetails] class represents responses which are received by page.

#### securityDetails.issuer()
- returns: <[string]> A string with the name of issuer of the certificate.

#### securityDetails.protocol()
- returns: <[string]> String with the security protocol, eg. "TLS 1.2".

#### securityDetails.subjectName()
- returns: <[string]> Name of the subject to which the certificate was issued to.

#### securityDetails.validFrom()
- returns: <[number]> [UnixTime] stating the start of validity of the certificate.

#### securityDetails.validTo()
- returns: <[number]> [UnixTime] stating the end of validity of the certificate.

### class: Target

#### target.browser()

- returns: <[Browser]>

Get the browser the target belongs to.

#### target.browserContext()

- returns: <[BrowserContext]>

The browser context the target belongs to.

#### target.createCDPSession()
- returns: <[Promise]<[CDPSession]>>

Creates a Chrome Devtools Protocol session attached to the target.

#### target.opener()
- returns: <?[Target]>

Get the target that opened this target. Top-level targets return `null`.

#### target.page()
- returns: <[Promise]<?[Page]>>

If the target is not of type `"page"` or `"background_page"`, returns `null`.

#### target.type()
- returns: <[string]>

Identifies what kind of target this is. Can be `"page"`, [`"background_page"`](https://developer.chrome.com/extensions/background_pages), `"service_worker"`, `"browser"` or `"other"`.

#### target.url()
- returns: <[string]>

### class: CDPSession

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

The `CDPSession` instances are used to talk raw Chrome Devtools Protocol:
- protocol methods can be called with `session.send` method.
- protocol events can be subscribed to with `session.on` method.

Documentation on DevTools Protocol can be found here: [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).

```js
const client = await page.target().createCDPSession();
await client.send('Animation.enable');
client.on('Animation.animationCreated', () => console.log('Animation created!'));
const response = await client.send('Animation.getPlaybackRate');
console.log('playback rate is ' + response.playbackRate);
await client.send('Animation.setPlaybackRate', {
  playbackRate: response.playbackRate / 2
});
```

#### cdpSession.detach()
- returns: <[Promise]>

Detaches the cdpSession from the target. Once detached, the cdpSession object won't emit any events and can't be used
to send messages.

#### cdpSession.send(method[, params])
- `method` <[string]> protocol method name
- `params` <[Object]> Optional method parameters
- returns: <[Promise]<[Object]>>

### class: Coverage

Coverage gathers information about parts of JavaScript and CSS that were used by the page.

An example of using JavaScript and CSS coverage to get percentage of initially
executed code:

```js
// Enable both JavaScript and CSS coverage
await Promise.all([
  page.coverage.startJSCoverage(),
  page.coverage.startCSSCoverage()
]);
// Navigate to page
await page.goto('https://example.com');
// Disable both JavaScript and CSS coverage
const [jsCoverage, cssCoverage] = await Promise.all([
  page.coverage.stopJSCoverage(),
  page.coverage.stopCSSCoverage(),
]);
let totalBytes = 0;
let usedBytes = 0;
const coverage = [...jsCoverage, ...cssCoverage];
for (const entry of coverage) {
  totalBytes += entry.text.length;
  for (const range of entry.ranges)
    usedBytes += range.end - range.start - 1;
}
console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
```

_To output coverage in a form consumable by [Istanbul](https://github.com/istanbuljs),
  see [puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul)._

#### coverage.startCSSCoverage(options)
- `options` <[Object]>  Set of configurable options for coverage
  - `resetOnNavigation` <[boolean]> Whether to reset coverage on every navigation. Defaults to `true`.
- returns: <[Promise]> Promise that resolves when coverage is started

#### coverage.startJSCoverage(options)
- `options` <[Object]>  Set of configurable options for coverage
  - `resetOnNavigation` <[boolean]> Whether to reset coverage on every navigation. Defaults to `true`.
  - `reportAnonymousScripts` <[boolean]> Whether anonymous scripts generated by the page should be reported. Defaults to `false`.
- returns: <[Promise]> Promise that resolves when coverage is started

> **NOTE** Anonymous scripts are ones that don't have an associated url. These are scripts that are dynamically created on the page using `eval` or `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous scripts will have `__puppeteer_evaluation_script__` as their URL.

#### coverage.stopCSSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> Promise that resolves to the array of coverage reports for all stylesheets
  - `url` <[string]> StyleSheet URL
  - `text` <[string]> StyleSheet content
  - `ranges` <[Array]<[Object]>> StyleSheet ranges that were used. Ranges are sorted and non-overlapping.
    - `start` <[number]> A start offset in text, inclusive
    - `end` <[number]> An end offset in text, exclusive

> **NOTE** CSS Coverage doesn't include dynamically injected style tags without sourceURLs.

#### coverage.stopJSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> Promise that resolves to the array of coverage reports for all scripts
  - `url` <[string]> Script URL
  - `text` <[string]> Script content
  - `ranges` <[Array]<[Object]>> Script ranges that were executed. Ranges are sorted and non-overlapping.
    - `start` <[number]> A start offset in text, inclusive
    - `end` <[number]> An end offset in text, exclusive

> **NOTE** JavaScript Coverage doesn't include anonymous scripts by default. However, scripts with sourceURLs are
reported.

[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[Buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Page]: #class-page "Page"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[stream.Readable]: https://nodejs.org/api/stream.html#stream_class_stream_readable "stream.Readable"
[CDPSession]: #class-cdpsession  "CDPSession"
[BrowserFetcher]: #class-browserfetcher  "BrowserFetcher"
[BrowserContext]: #class-browsercontext  "BrowserContext"
[Error]: https://nodejs.org/api/errors.html#errors_class_error "Error"
[Frame]: #class-frame "Frame"
[ConsoleMessage]: #class-consolemessage "ConsoleMessage"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[Coverage]: #class-coverage "Coverage"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[Response]: #class-response  "Response"
[Request]: #class-request  "Request"
[Browser]: #class-browser  "Browser"
[Body]: #class-body  "Body"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Keyboard]: #class-keyboard "Keyboard"
[Dialog]: #class-dialog  "Dialog"
[JSHandle]: #class-jshandle "JSHandle"
[ExecutionContext]: #class-executioncontext "ExecutionContext"
[Mouse]: #class-mouse "Mouse"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Tracing]: #class-tracing "Tracing"
[ElementHandle]: #class-elementhandle "ElementHandle"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
[Touchscreen]: #class-touchscreen "Touchscreen"
[Target]: #class-target "Target"
[USKeyboardLayout]: ../lib/USKeyboardLayout.js "USKeyboardLayout"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[SecurityDetails]: #class-securitydetails "SecurityDetails"
[Worker]: #class-worker "Worker"
