---
id: "ts-mapped-type"
language: "typescript"
title: "Make properties nullable with a mapped type"
description: "Make properties nullable with a mapped type."
category: "Utility Types"
subcategory: "Mapped types"
tags: ["mapped-type", "typescript"]
typescriptVersion: "4.9"
---

```typescript
type Nullable<T> = { [K in keyof T]: T[K] | null };
interface Contact { name: string; email: string }
const draft: Nullable<Contact> = { name: "Ada", email: null };
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
