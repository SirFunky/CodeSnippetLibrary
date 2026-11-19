---
id: "ts-const-tuple"
language: "typescript"
title: "Infer a readonly tuple from arguments"
description: "Infer a readonly tuple from arguments."
category: "Generics"
subcategory: "Tuples"
tags: ["const-tuple", "typescript"]
typescriptVersion: "5.0"
---

```typescript
function tuple<const T extends readonly unknown[]>(...values: T): T {
    return values;
}
const point = tuple("origin", 0, 0);
```

## Notes

No third-party dependencies. TypeScript 5.0 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime. Const type parameters require TypeScript 5.0: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
