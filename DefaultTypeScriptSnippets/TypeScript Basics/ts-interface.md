---
id: "ts-interface"
language: "typescript"
title: "Describe an object with an interface"
description: "Describe an object with an interface."
category: "TypeScript Basics"
subcategory: "Objects"
tags: ["interface", "typescript"]
typescriptVersion: "4.9"
---

```typescript
interface User {
    readonly id: number;
    name: string;
    email?: string;
}
const user: User = { id: 1, name: "Ada" };
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
