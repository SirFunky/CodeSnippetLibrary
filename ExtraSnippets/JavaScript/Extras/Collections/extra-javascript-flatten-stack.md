---
id: "extra-javascript-flatten-stack"
language: "javascript"
title: "Flatten nested arrays without recursive calls"
description: "Flatten nested arrays without recursive calls."
category: "Collections"
subcategory: "Practical extras"
tags: ["flatten-stack", "practical", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function flatten(values) {
  const pending = [...values].reverse();
  const result = [];
  while (pending.length) {
    const value = pending.pop();
    if (Array.isArray(value)) {
      for (let i = value.length - 1; i >= 0; i--) pending.push(value[i]);
    } else result.push(value);
  }
  return result;
}
console.log(JSON.stringify(flatten([1, [2, [3]], [], 4])));
```

## Notes

Iterative traversal avoids recursive call-stack limits. Input must be dense acyclic arrays of manageable size; cyclic input is not detected and can loop forever. Object elements remain shared references.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
