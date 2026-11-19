---
id: "ts-template-types"
language: "typescript"
title: "Build event names with template literal types"
description: "Build event names with template literal types."
category: "Types & Validation"
subcategory: "Template literals"
tags: ["template-types", "typescript"]
typescriptVersion: "4.9"
---

```typescript
type Field = "name" | "email";
type ChangeEvent = `${Field}Changed`;
function label(event: ChangeEvent): string {
    return event.replace("Changed", " changed");
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
