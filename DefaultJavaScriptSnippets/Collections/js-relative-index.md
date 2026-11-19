---
id: "js-relative-index"
language: "javascript"
title: "Read the last array element with at"
description: "Read the last array element with at."
category: "Collections"
tags: ["relative-index", "javascript"]
javascriptVersion: 2022
---

```javascript
function lastItem(items) {
    return items.at(-1);
}
```

## Notes

Array.prototype.at accepts negative indexes relative to the end; an empty array returns undefined. Requires ES2022 runtime support: https://tc39.es/ecma262/2022/multipage/indexed-collections.html#sec-array.prototype.at No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
