---
id: "everyday-javascript-chunk-list"
language: "javascript"
title: "Split a list into bounded chunks"
description: "Split a list into bounded chunks."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["chunk-list", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function chunks(values, size) {
  if (!Number.isInteger(size) || size < 1)
    throw new RangeError("positive chunk size required");
  const result = [];
  for (let i = 0; i < values.length; i += size)
    result.push(values.slice(i, i + size));
  return result;
}

console.log(JSON.stringify(chunks([1, 2, 3, 4, 5], 2)));
console.log(JSON.stringify(chunks([], 2)));
```

## Notes

Returns copied subarrays; elements are still shared if they are objects. A nonpositive chunk size is rejected.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
