---
id: "everyday-typescript-running-totals"
language: "typescript"
title: "Calculate running totals"
description: "Calculate running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function runningTotals(values: number[]): number[] {
  let sum = 0;
  return values.map((value) => (sum += value));
}

console.log(JSON.stringify(runningTotals([2, -1, 4])));
```

## Notes

Keeps source order and creates a new array. Validate numeric range/precision for application data. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
