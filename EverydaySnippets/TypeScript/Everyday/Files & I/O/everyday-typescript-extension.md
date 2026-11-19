---
id: "everyday-typescript-extension"
language: "typescript"
title: "Extract a filename extension"
description: "Extract a filename extension."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["extension", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function extension(path: string): string {
  const name = path.replace(/\\/g, "/").split("/").pop() ?? "";
  const dot = name.lastIndexOf(".");
  return dot > 0 && dot < name.length - 1
    ? name.slice(dot + 1).toLowerCase()
    : "";
}

console.log(extension("C:\\reports\\data.CSV"));
console.log(JSON.stringify(extension(".env")));
```

## Notes

Lexical path handling for slash/backslash separators. A lone dotfile has no extension. Extensions do not validate file content or trustworthiness. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
