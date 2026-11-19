---
id: "ts-immutable-update"
language: "typescript"
title: "Update a readonly collection without mutation"
description: "Update a readonly collection without mutation."
category: "Collections"
subcategory: "Immutability"
tags: ["immutable-update", "typescript"]
typescriptVersion: "4.9"
---

```typescript
interface Item { readonly id: number; readonly done: boolean }
function markDone(items: readonly Item[], id: number): Item[] {
    return items.map(item => item.id === id ? { ...item, done: true } : item);
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
