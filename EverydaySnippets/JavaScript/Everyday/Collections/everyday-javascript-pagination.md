---
id: "everyday-javascript-pagination"
language: "javascript"
title: "Calculate checked pagination bounds"
description: "Calculate checked pagination bounds."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function pageBounds(total, page, size) {
  if (
    ![total, page, size].every(Number.isSafeInteger) ||
    total < 0 ||
    page < 1 ||
    size < 1
  )
    return null;
  const start = (page - 1) * size;
  if (!Number.isSafeInteger(start)) return null;
  return {
    start: Math.min(start, total),
    end: Math.min(start + Math.min(size, total), total),
  };
}

console.log(JSON.stringify(pageBounds(23, 3, 10)));
console.log(pageBounds(23, 0, 10));
```

## Notes

Uses one-based page numbers and zero-based, end-exclusive offsets. Invalid inputs return null; pages beyond the end return an empty range.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
