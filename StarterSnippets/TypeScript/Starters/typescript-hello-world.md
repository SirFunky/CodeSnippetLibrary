---
id: "starter-typescript-hello-world"
language: "typescript"
title: "Hello World — TypeScript"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function main(): void {
    const message: string = "Hello, World!";
    console.log(message);
}

main();
```

## Notes

Outputs Hello, World! followed by a newline.

Save as main.ts. With a TypeScript 4.9+ compiler installed: tsc main.ts --strict --target ES2020 --module commonjs. Run the emitted file with an ES2020-capable Node runtime: node main.js. This source has no imports/exports; it runs as a standalone program.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
