---
id: "ts-partial-update"
language: "typescript"
title: "Apply a typed partial update"
description: "Apply a typed partial update."
category: "Utility Types"
subcategory: "Partial"
tags: ["partial-update", "typescript"]
typescriptVersion: "4.9"
---

```typescript
interface Settings { theme: "dark" | "light"; fontSize: number }
function updateSettings(current: Settings, patch: Partial<Settings>): Settings {
    return { ...current, ...patch };
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
