---
id: "everyday-typescript-partition"
language: "typescript"
title: "Partition values in one pass"
description: "Partition values in one pass."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function partition(
  values: number[],
  accept: (value: number) => boolean,
): number[][] {
  const yes: number[] = [],
    no: number[] = [];
  for (const value of values) (accept(value) ? yes : no).push(value);
  return [yes, no];
}

console.log(JSON.stringify(partition([1, 2, 3, 4], (n) => n % 2 === 0)));
```

## Notes

Preserves input order in each partition. The predicate should not mutate the source collection. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
