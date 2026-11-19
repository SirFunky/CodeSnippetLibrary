---
id: "js-settled-promises"
language: "javascript"
title: "Collect success and failure results"
description: "Collect success and failure results."
category: "Async"
tags: ["settled-promises", "javascript"]
javascriptVersion: 2020
---

```javascript
async function collectResults(tasks) {
    return Promise.allSettled(tasks);
}
```

## Notes

Pass an iterable of promises or values. Results preserve input order. Rejected inputs produce status/reason entries; no cancellation is implied. ES2020: https://tc39.es/ecma262/2020/ No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
