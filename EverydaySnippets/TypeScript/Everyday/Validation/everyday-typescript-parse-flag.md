---
id: "everyday-typescript-parse-flag"
language: "typescript"
title: "Parse a configuration boolean explicitly"
description: "Parse a configuration boolean explicitly."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["parse-flag", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function parseFlag(text: string): boolean | null {
  switch (text.trim().toLowerCase()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
      return false;
    default:
      return null;
  }
}

console.log(parseFlag(" YES "));
console.log(parseFlag("maybe"));
```

## Notes

Defines the accepted vocabulary explicitly. Do not convert arbitrary nonempty strings to boolean. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
