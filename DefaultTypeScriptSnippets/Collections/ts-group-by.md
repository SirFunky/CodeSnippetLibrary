---
id: "ts-group-by"
language: "typescript"
title: "Group items with a generic function"
description: "Group items with a generic function."
category: "Collections"
subcategory: "Grouping"
tags: ["group-by", "typescript"]
typescriptVersion: "4.9"
---

```typescript
function groupBy<T, K>(items: readonly T[], keyOf: (item: T) => K): Map<K, T[]> {
    const groups = new Map<K, T[]>();
    for (const item of items) {
        const key = keyOf(item);
        const group = groups.get(key);
        if (group) group.push(item);
        else groups.set(key, [item]);
    }
    return groups;
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
