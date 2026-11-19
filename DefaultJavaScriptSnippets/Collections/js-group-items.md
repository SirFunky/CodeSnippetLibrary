---
id: "js-group-items"
language: "javascript"
title: "Group items using a Map"
description: "Group items using a Map."
category: "Collections"
tags: ["group-items", "javascript"]
javascriptVersion: 2015
---

```javascript
function groupBy(items, keyOf) {
    const groups = new Map();
    for (const item of items) {
        const key = keyOf(item);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(item);
    }
    return groups;
}
```

## Notes

Map safely handles arbitrary keys, including __proto__. Each item is retained by reference; this does not deep-clone items. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
