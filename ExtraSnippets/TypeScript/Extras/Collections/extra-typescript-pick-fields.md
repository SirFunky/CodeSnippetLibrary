---
id: "extra-typescript-pick-fields"
language: "typescript"
title: "Copy selected object fields with key-safe types"
description: "Copy selected object fields with key-safe types."
category: "Collections"
subcategory: "Practical extras"
tags: ["pick-fields", "practical", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function pick<T extends object, K extends keyof T>(
  source: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = Object.create(null) as Pick<T, K>;
  for (const key of keys) result[key] = source[key];
  return result;
}
const user = { id: 7, name: "Ada", active: true };
console.log(JSON.stringify(pick(user, ["id", "name"])));
```

## Notes

Compile-time key checking and a null-prototype destination. Shallow copy; getters on the source execute when read. Types do not validate untrusted runtime JSON.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
