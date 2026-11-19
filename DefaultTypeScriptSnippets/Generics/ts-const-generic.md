---
id: "ts-const-generic"
language: "typescript"
title: "Preserve literal values with a const type parameter"
description: "Preserve literal values with a const type parameter."
category: "Generics"
subcategory: "Literal inference"
tags: ["const-generic", "typescript"]
typescriptVersion: "5.0"
---

```typescript
function defineRoutes<const T extends Record<string, string>>(routes: T): T {
    return routes;
}
const routes = defineRoutes({ home: "/", settings: "/settings" });
```

## Notes

No third-party dependencies. TypeScript 5.0 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime. Const type parameters require TypeScript 5.0: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
