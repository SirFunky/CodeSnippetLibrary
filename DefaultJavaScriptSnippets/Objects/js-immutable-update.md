---
id: "js-immutable-update"
language: "javascript"
title: "Update an object without mutation"
description: "Update an object without mutation."
category: "Objects"
tags: ["immutable-update", "javascript"]
javascriptVersion: 2018
---

```javascript
const original = { name: "Ada", settings: { theme: "dark" } };
const updated = {
    ...original,
    settings: { ...original.settings, theme: "light" },
};
```

## Notes

Object spread is shallow; copy each nested level being changed. Only enumerable own properties are copied. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
