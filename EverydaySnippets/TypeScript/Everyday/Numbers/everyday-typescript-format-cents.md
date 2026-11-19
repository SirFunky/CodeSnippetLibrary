---
id: "everyday-typescript-format-cents"
language: "typescript"
title: "Format signed integer cents"
description: "Format signed integer cents."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["format-cents", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function money(cents: number): string {
  if (!Number.isSafeInteger(cents))
    throw new RangeError("integer cents required");
  const n = Math.abs(cents);
  return (
    (cents < 0 ? "-" : "") +
    Math.floor(n / 100) +
    "." +
    String(n % 100).padStart(2, "0")
  );
}

console.log(money(12345));
console.log(money(-5));
```

## Notes

Formats integer minor units using a literal decimal point. Currency choice, locale and decimal-to-cent rounding are caller responsibilities. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
