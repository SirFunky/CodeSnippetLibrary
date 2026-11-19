---
id: "everyday-typescript-window-sums"
language: "typescript"
title: "Calculate sliding window sums"
description: "Calculate sliding window sums."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["window-sums", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function windowSums(values: number[], width: number): number[] {
  if (!Number.isInteger(width) || width < 1)
    throw new RangeError("positive width required");
  if (width > values.length) return [];
  const out = [];
  let sum = values.slice(0, width).reduce((a, b) => a + b, 0);
  out.push(sum);
  for (let i = width; i < values.length; i++) {
    sum += values[i] - values[i - width];
    out.push(sum);
  }
  return out;
}

console.log(JSON.stringify(windowSums([1, 2, 3, 4], 3)));
```

## Notes

O(n) rolling sums. Finite numeric inputs and sums within the required precision/range are caller preconditions. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
