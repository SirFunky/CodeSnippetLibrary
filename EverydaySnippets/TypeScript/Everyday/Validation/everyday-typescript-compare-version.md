---
id: "everyday-typescript-compare-version"
language: "typescript"
title: "Compare numeric dotted versions"
description: "Compare numeric dotted versions."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["compare-version", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function compareVersion(left: string, right: string): number {
  const parse = (text: string) => {
    if (!/^\d+(?:\.\d+)*$/.test(text))
      throw new Error("numeric dotted version required");
    const parts = text.split(".").map(Number);
    if (!parts.every(Number.isSafeInteger))
      throw new Error("component too large");
    return parts;
  };
  const a = parse(left),
    b = parse(right);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const delta = (a[i] ?? 0) - (b[i] ?? 0);
    if (delta) return delta < 0 ? -1 : 1;
  }
  return 0;
}

console.log(compareVersion("1.9", "1.10"));
console.log(compareVersion("2.0", "2"));
```

## Notes

Compares numeric components with missing trailing zeros. Not a SemVer parser: prerelease/build labels are rejected. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
