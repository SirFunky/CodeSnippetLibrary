---
id: "everyday-typescript-merge-sorted"
language: "typescript"
title: "Merge two sorted lists"
description: "Merge two sorted lists."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["merge-sorted", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function mergeSorted(a: number[], b: number[]): number[] {
  const out = [];
  let i = 0,
    j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}

console.log(JSON.stringify(mergeSorted([1, 3, 5], [2, 3, 4])));
```

## Notes

Both inputs must already be sorted ascending and contain comparable finite numbers. Duplicates are preserved. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
