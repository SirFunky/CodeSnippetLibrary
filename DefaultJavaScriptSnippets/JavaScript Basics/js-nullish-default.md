---
id: "js-nullish-default"
language: "javascript"
title: "Default only null or undefined values"
description: "Default only null or undefined values."
category: "JavaScript Basics"
tags: ["nullish-default", "javascript"]
javascriptVersion: 2020
---

```javascript
function configuredLimit(options) {
    return options.limit ?? 10;
}
```

## Notes

Unlike ||, ?? preserves 0, false and empty strings. Requires a non-null options object and does not validate the limit type or range. ES2020: https://tc39.es/ecma262/2020/ No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
