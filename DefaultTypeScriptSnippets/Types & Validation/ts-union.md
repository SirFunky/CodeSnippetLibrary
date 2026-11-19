---
id: "ts-union"
language: "typescript"
title: "Narrow a union by a discriminant"
description: "Narrow a union by a discriminant."
category: "Types & Validation"
subcategory: "Unions"
tags: ["union", "typescript"]
typescriptVersion: "4.9"
---

```typescript
type Result = { ok: true; value: number } | { ok: false; error: string };
function describe(result: Result): string {
    return result.ok ? `Value: ${result.value}` : result.error;
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
