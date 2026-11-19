---
id: "js-filter-map"
language: "javascript"
title: "Filter and transform an array"
description: "Filter and transform an array."
category: "Collections"
tags: ["filter-map", "javascript"]
javascriptVersion: 2015
---

```javascript
const values = [-2, 1, 0, 3];
const doubled = values.filter(value => value > 0).map(value => value * 2);
```

## Notes

filter and map create new arrays; neither callback changes the source. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
