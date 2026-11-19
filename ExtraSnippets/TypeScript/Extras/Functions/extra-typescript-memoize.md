---
id: "extra-typescript-memoize"
language: "typescript"
title: "Memoize a pure function by a primitive key"
description: "Memoize a pure function by a primitive key."
category: "Functions"
subcategory: "Practical extras"
tags: ["memoize", "practical", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function memoize<K extends string | number, V>(
  compute: (key: K) => V,
): (key: K) => V {
  const cache = new Map<K, V>();
  return (key) => {
    if (cache.has(key)) return cache.get(key)!;
    const value = compute(key);
    cache.set(key, value);
    return value;
  };
}
let calls = 0;
const square = memoize((n: number) => {
  calls++;
  return n * n;
});
console.log(square(6));
console.log(square(6));
console.log(calls);
```

## Notes

Use a pure function whose output depends only on the key. Cache has no eviction and keeps values by reference; add a capacity/lifetime policy for long-running use. has() distinguishes a cached undefined value from a missing key.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
