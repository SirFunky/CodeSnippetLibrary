---
id: "ts-type-guard"
language: "typescript"
title: "Validate unknown data with a type guard"
description: "Validate unknown data with a type guard."
category: "Types & Validation"
subcategory: "Validation"
tags: ["type-guard", "typescript"]
typescriptVersion: "4.9"
---

```typescript
interface Profile { name: string; age: number }
function isProfile(value: unknown): value is Profile {
    if (typeof value !== "object" || value === null) return false;
    const candidate = value as Record<string, unknown>;
    return typeof candidate.name === "string"
        && typeof candidate.age === "number"
        && Number.isFinite(candidate.age);
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime. Validates only the displayed Profile contract; extra properties are allowed. Type assertions alone do not validate external data.
