---
id: "ts-satisfies"
language: "typescript"
title: "Validate a configuration with satisfies"
description: "Validate a configuration with satisfies."
category: "Utility Types"
subcategory: "Configuration"
tags: ["satisfies", "typescript"]
typescriptVersion: "4.9"
---

```typescript
type Color = "red" | "green" | "blue";
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255],
} satisfies Record<Color, string | [number, number, number]>;
const green = palette.green.toUpperCase();
```

## Notes

No third-party dependencies. TypeScript 4.9 supported baseline; compile with strict mode and an ES2020 target/library. These examples need no browser or Node-specific APIs. Types are erased during compilation; readonly types do not freeze objects at runtime. The satisfies operator requires TypeScript 4.9: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html
