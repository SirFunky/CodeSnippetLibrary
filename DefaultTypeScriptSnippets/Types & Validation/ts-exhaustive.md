---
id: "ts-exhaustive"
language: "typescript"
title: "Check a switch exhaustively"
description: "Check a switch exhaustively."
category: "Types & Validation"
subcategory: "Unions"
tags: ["exhaustive", "typescript"]
typescriptVersion: "4.9"
---

```typescript
type Shape = { kind: "circle"; radius: number }
    | { kind: "rectangle"; width: number; height: number };
function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "rectangle": return shape.width * shape.height;
        default: {
            const unreachable: never = shape;
            throw new Error(`Unexpected shape: ${JSON.stringify(unreachable)}`);
        }
    }
}
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime.
