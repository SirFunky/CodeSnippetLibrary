---
id: "ts-typed-function"
language: "typescript"
title: "Write a typed function"
description: "Write a typed function."
category: "TypeScript Basics"
subcategory: "Functions"
tags: ["typed-function", "typescript"]
typescriptVersion: "4.9"
---

```typescript
function greet(name: string, excited = false): string {
    return `Hello, ${name}${excited ? "!" : "."}`;
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
