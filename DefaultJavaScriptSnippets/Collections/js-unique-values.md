---
id: "js-unique-values"
language: "javascript"
title: "Remove duplicate primitive values"
description: "Remove duplicate primitive values."
category: "Collections"
tags: ["unique-values", "javascript"]
javascriptVersion: 2015
---

```javascript
const values = [3, 1, 3, 2, 1];
const unique = [...new Set(values)];
```

## Notes

Preserves first occurrence order. Set compares objects by identity; this does not deduplicate objects by their contents. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
