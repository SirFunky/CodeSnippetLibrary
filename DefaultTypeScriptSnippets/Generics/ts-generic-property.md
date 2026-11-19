---
id: "ts-generic-property"
language: "typescript"
title: "Read a property with a generic key"
description: "Read a property with a generic key."
category: "Generics"
subcategory: "Constraints"
tags: ["generic-property", "typescript"]
typescriptVersion: "4.9"
---

```typescript
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}
const person = { name: "Ada", age: 37 };
const name = getProperty(person, "name");
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
