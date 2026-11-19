---
id: "js-object-entries"
language: "javascript"
title: "Transform object values using entries"
description: "Transform object values using entries."
category: "Objects"
tags: ["object-entries", "javascript"]
javascriptVersion: 2019
---

```javascript
const prices = { apple: 2, pear: 3 };
const doubled = Object.fromEntries(
    Object.entries(prices).map(([name, price]) => [name, price * 2]),
);
```

## Notes

Object.entries reads enumerable own string-keyed properties. Object.fromEntries was added in ES2019. This sample assumes finite numeric values. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
