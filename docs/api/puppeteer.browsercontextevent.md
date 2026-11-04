---
sidebar_label: BrowserContextEvent
---

# BrowserContextEvent enum

### Signature

```typescript
export declare const enum BrowserContextEvent
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

Request

</td><td>

`"request"`

</td><td>

**_(Experimental)_** Emitted when any page in the browser context issues a request. Contains a [HTTPRequest](./puppeteer.httprequest.md) instance.

**Remarks:**

Use [HTTPRequest.page()](./puppeteer.httprequest.page.md) or [HTTPRequest.frame()](./puppeteer.httprequest.frame.md) to identify the originating context. Requests from dedicated workers have no page or frame: use [HTTPRequest.worker()](./puppeteer.httprequest.worker.md) for them. Dedicated worker requests and [HTTPRequest.worker()](./puppeteer.httprequest.worker.md) are not supported with WebDriver BiDi.

With CDP, events are only delivered for pages that have a [Page](./puppeteer.page.md) instance, e.g. created via [BrowserContext.pages()](./puppeteer.browsercontext.pages.md) or [Target.page()](./puppeteer.target.page.md). Requests issued before the instance exists, such as the initial navigation of a popup, are not reported. With WebDriver BiDi, requests from all pages are reported. Requests from service workers and shared workers are not reported.

These listeners only observe requests. Do not call `request.continue()`, `abort()` or `respond()` from them: they are not coordinated with page-level handlers (see [cooperative intercept mode](https://pptr.dev/guides/network-interception#cooperative-intercept-mode)). To intercept requests, use [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md) with a [PageEvent.Request](./puppeteer.pageevent.md) listener.

</td></tr>
<tr><td>

TargetChanged

</td><td>

`"targetchanged"`

</td><td>

Emitted when the url of a target inside the browser context changes. Contains a [Target](./puppeteer.target.md) instance.

</td></tr>
<tr><td>

TargetCreated

</td><td>

`"targetcreated"`

</td><td>

Emitted when a target is created within the browser context, for example when a new page is opened by [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or by [browserContext.newPage](./puppeteer.browsercontext.newpage.md)

Contains a [Target](./puppeteer.target.md) instance.

</td></tr>
<tr><td>

TargetDestroyed

</td><td>

`"targetdestroyed"`

</td><td>

Emitted when a target is destroyed within the browser context, for example when a page is closed. Contains a [Target](./puppeteer.target.md) instance.

</td></tr>
</tbody></table>
