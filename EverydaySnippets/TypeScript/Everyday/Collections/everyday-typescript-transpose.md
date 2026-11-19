---
id: "everyday-typescript-transpose"
language: "typescript"
title: "Transpose a rectangular matrix"
description: "Transpose a rectangular matrix."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["transpose", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function transpose(rows: number[][]): number[][] | null {
  if (rows.length === 0) return [];
  const width = rows[0].length;
  if (rows.some((row) => row.length !== width)) return null;
  return Array.from({ length: width }, (_, column) =>
    rows.map((row) => row[column]),
  );
}

console.log(
  JSON.stringify(
    transpose([
      [1, 2, 3],
      [4, 5, 6],
    ]),
  ),
);
console.log(transpose([[1], [2, 3]]));
```

## Notes

Rejects ragged matrices. Empty input and zero-width rows produce an empty matrix; elements are copied shallowly. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
