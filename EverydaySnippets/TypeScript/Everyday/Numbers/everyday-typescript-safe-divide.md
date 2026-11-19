---
id: "everyday-typescript-safe-divide"
language: "typescript"
title: "Handle zero and non-finite division inputs"
description: "Handle zero and non-finite division inputs."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function divide(a: number, b: number): number | null {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return null;
  const result = a / b;
  return Number.isFinite(result) ? result : null;
}

console.log(divide(10, 4));
console.log(divide(1, 0));
```

## Notes

Returns null for invalid inputs, zero divisors and non-finite results. Floating-point rounding still applies. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
