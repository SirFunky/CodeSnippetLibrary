---
id: "everyday-typescript-collapse-spaces"
language: "typescript"
title: "Collapse runs of whitespace"
description: "Collapse runs of whitespace."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["collapse-spaces", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function collapse(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

console.log(collapse(" Ada\t  Linus\nGrace "));
```

## Notes

Normalizes whitespace into single spaces; do not use for code, passwords or data where whitespace is significant. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
