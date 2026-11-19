---
id: "js-destructure"
language: "javascript"
title: "Use destructuring with defaults"
description: "Use destructuring with defaults."
category: "JavaScript Basics"
tags: ["destructure", "javascript"]
javascriptVersion: 2015
---

```javascript
const options = { fontSize: 16 };
const { theme = "dark", fontSize = 13 } = options;
const message = `${theme}: ${fontSize}`;
```

## Notes

Defaults apply to undefined, not null. Template literals interpolate values as text; escape appropriately when inserting text into HTML or another structured format. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
