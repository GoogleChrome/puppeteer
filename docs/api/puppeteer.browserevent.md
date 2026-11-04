---
sidebar_label: BrowserEvent
---

# BrowserEvent enum

All the events a [browser instance](./puppeteer.browser.md) may emit.

### Signature

```typescript
export declare const enum BrowserEvent
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

Disconnected

</td><td>

`"disconnected"`

</td><td>

Emitted when Puppeteer gets disconnected from the browser instance. This might happen because either:

- The browser closes/crashes or - [Browser.disconnect()](./puppeteer.browser.disconnect.md) was called.

</td></tr>
<tr><td>

Request

</td><td>

`"request"`

</td><td>

**_(Experimental)_** Emitted when any page in the browser issues a request. Contains a [HTTPRequest](./puppeteer.httprequest.md) instance.

**Remarks:**

Use [HTTPRequest.page()](./puppeteer.httprequest.page.md) or [HTTPRequest.frame()](./puppeteer.httprequest.frame.md) to identify the originating context. Requests from dedicated workers have no page or frame: use [HTTPRequest.worker()](./puppeteer.httprequest.worker.md) for them. Dedicated worker requests and [HTTPRequest.worker()](./puppeteer.httprequest.worker.md) are not supported with WebDriver BiDi.

With CDP, events are only delivered for pages that have a [Page](./puppeteer.page.md) instance, e.g. created via [Browser.pages()](./puppeteer.browser.pages.md) or [Target.page()](./puppeteer.target.page.md). Requests issued before the instance exists, such as the initial navigation of a popup, are not reported. With WebDriver BiDi, requests from all pages are reported. Requests from service workers and shared workers are not reported.

These listeners only observe requests. Do not call `request.continue()`, `abort()` or `respond()` from them: they are not coordinated with page-level handlers (see [cooperative intercept mode](https://pptr.dev/guides/network-interception#cooperative-intercept-mode)). To intercept requests, use [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md) with a [PageEvent.Request](./puppeteer.pageevent.md) listener.

</td></tr>
<tr><td>

TargetChanged

</td><td>

`"targetchanged"`

</td><td>

Emitted when the URL of a target changes. Contains a [Target](./puppeteer.target.md) instance.

**Remarks:**

Note that this includes target changes in all browser contexts.

</td></tr>
<tr><td>

TargetCreated

</td><td>

`"targetcreated"`

</td><td>

Emitted when a target is created, for example when a new page is opened by [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or by [browser.newPage](./puppeteer.browser.newpage.md)

Contains a [Target](./puppeteer.target.md) instance.

**Remarks:**

Note that this includes target creations in all browser contexts.

</td></tr>
<tr><td>

TargetDestroyed

</td><td>

`"targetdestroyed"`

</td><td>

Emitted when a target is destroyed, for example when a page is closed. Contains a [Target](./puppeteer.target.md) instance.

**Remarks:**

Note that this includes target destructions in all browser contexts.

</td></tr>
</tbody></table>
