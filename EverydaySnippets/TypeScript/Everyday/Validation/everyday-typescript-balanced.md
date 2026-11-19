---
id: "everyday-typescript-balanced"
language: "typescript"
title: "Check balanced bracket characters"
description: "Check balanced bracket characters."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["balanced", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function balanced(text: string): boolean {
  const stack = [];
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  for (const c of text) {
    if ("([{".includes(c)) stack.push(c);
    else if (c in pairs) {
      if (stack.pop() !== pairs[c]) return false;
    }
  }
  return stack.length === 0;
}

console.log(balanced("{a:[(b)]}"));
console.log(balanced("([)]"));
```

## Notes

Checks (), [] and {} while ignoring other characters. It is not a parser and does not understand quoted strings or comments. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
