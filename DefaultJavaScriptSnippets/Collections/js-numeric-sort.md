---
id: "js-numeric-sort"
language: "javascript"
title: "Sort numbers without mutating the source"
description: "Sort numbers without mutating the source."
category: "Collections"
tags: ["numeric-sort", "javascript"]
javascriptVersion: 2015
---

```javascript
const values = [10, 2, 1];
const sorted = [...values].sort((left, right) => left - right);
```

## Notes

The comparator gives numeric ordering for finite numbers. Default sort compares strings. Copying first preserves the original array; mixed types and NaN need an explicit policy. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
