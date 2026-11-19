---
id: "everyday-javascript-bounded-integer"
language: "javascript"
title: "Parse a bounded decimal integer"
description: "Parse a bounded decimal integer."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function bounded(text, low, high) {
  if (!Number.isSafeInteger(low) || !Number.isSafeInteger(high) || low > high)
    throw new RangeError("invalid bounds");
  if (!/^[+-]?\d+$/.test(text)) return null;
  const n = Number(text);
  return Number.isSafeInteger(n) && n >= low && n <= high ? n : null;
}

console.log(bounded("42", 0, 100));
console.log(bounded("42x", 0, 100));
console.log(bounded("999", 0, 100));
```

## Notes

Rejects whitespace and partial parses; bounds are inclusive and restricted to safe integers.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
