---
id: "everyday-javascript-rotate"
language: "javascript"
title: "Rotate a list by a signed offset"
description: "Rotate a list by a signed offset."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["rotate", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function rotate(values, offset) {
  if (!Number.isSafeInteger(offset))
    throw new RangeError("integer offset required");
  if (values.length === 0) return [];
  const n = ((offset % values.length) + values.length) % values.length;
  return values.slice(n).concat(values.slice(0, n));
}

console.log(JSON.stringify(rotate([1, 2, 3, 4], -1)));
```

## Notes

Positive offsets rotate left, negative offsets right. Returns a shallow copy; empty input remains empty.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
