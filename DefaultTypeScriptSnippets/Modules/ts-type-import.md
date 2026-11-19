---
id: "ts-type-import"
language: "typescript"
title: "Import a type from a local module"
description: "Import a type from a local module."
category: "Modules"
subcategory: "Imports"
tags: ["type-import", "typescript"]
typescriptVersion: "4.9"
imports: ["import type { User } from \"./models\""]
---

```typescript
const user: User = { id: 1, name: "Ada" };
const displayName: string = user.name;
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime. Requires a sibling models.ts module exporting: export interface User { id: number; name: string }. Use Copy with imports for the complete example.
