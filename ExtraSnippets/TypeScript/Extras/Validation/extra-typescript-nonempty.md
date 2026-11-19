---
id: "extra-typescript-nonempty"
language: "typescript"
title: "Narrow a list to a nonempty tuple"
description: "Narrow a list to a nonempty tuple."
category: "Validation"
subcategory: "Practical extras"
tags: ["nonempty", "practical", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function isNonEmpty<T>(values: T[]): values is [T, ...T[]] {
  return values.length > 0;
}
function firstLabel(values: string[]): string {
  return isNonEmpty(values) ? values[0] : "empty";
}
console.log(firstLabel(["Ada", "Linus"]));
console.log(firstLabel([]));
```

## Notes

The guard narrows the array to a nonempty tuple. Avoid removing elements through another reference after narrowing; the type cannot prevent external mutation.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
