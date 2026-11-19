---
id: "everyday-typescript-slug"
language: "typescript"
title: "Create an ASCII slug"
description: "Create an ASCII slug."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["slug", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

console.log(slug("  Ada Lovelace! "));
```

## Notes

ASCII-only slug for display/routing. Non-ASCII letters are removed, not transliterated. Uniqueness must be handled separately. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
