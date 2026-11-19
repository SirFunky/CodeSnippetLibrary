---
id: "js-own-property"
language: "javascript"
title: "Check for an own property safely"
description: "Check for an own property safely."
category: "Objects"
tags: ["own-property", "javascript"]
javascriptVersion: 2022
---

```javascript
const settings = Object.create(null);
settings.theme = "dark";
const hasTheme = Object.hasOwn(settings, "theme");
const hasToString = Object.hasOwn(settings, "toString");
```

## Notes

Works for null-prototype objects and objects shadowing hasOwnProperty. A present property with value undefined still counts. Requires ES2022 Object.hasOwn; null and undefined are not valid target objects. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
