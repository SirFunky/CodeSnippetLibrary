---
id: "everyday-javascript-safe-divide"
language: "javascript"
title: "Handle zero and non-finite division inputs"
description: "Handle zero and non-finite division inputs."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function divide(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return null;
  const result = a / b;
  return Number.isFinite(result) ? result : null;
}

console.log(divide(10, 4));
console.log(divide(1, 0));
```

## Notes

Returns null for invalid inputs, zero divisors and non-finite results. Floating-point rounding still applies.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
