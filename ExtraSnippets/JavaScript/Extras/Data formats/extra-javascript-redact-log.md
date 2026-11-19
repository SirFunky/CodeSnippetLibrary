---
id: "extra-javascript-redact-log"
language: "javascript"
title: "Omit selected property names from JSON output"
description: "Omit selected property names from JSON output."
category: "Data formats"
subcategory: "Practical extras"
tags: ["redact-log", "practical", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
const hidden = new Set(["password", "token"]);
const event = {
  user: "Ada",
  token: "secret",
  details: { password: "hidden", ok: true },
};
const text = JSON.stringify(event, (key, value) =>
  hidden.has(key) ? undefined : value,
);
console.log(text);
```

## Notes

Illustrative logging filter for plain acyclic data, with exact case-sensitive property names. It cannot guarantee that all sensitive data is removed; avoid logging secrets in the first place. toJSON/getters may run, and cyclic objects throw TypeError.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
