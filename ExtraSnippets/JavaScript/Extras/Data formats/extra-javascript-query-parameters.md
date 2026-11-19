---
id: "extra-javascript-query-parameters"
language: "javascript"
title: "Encode URL query parameters without a request"
description: "Encode URL query parameters without a request."
category: "Data formats"
subcategory: "Practical extras"
tags: ["query-parameters", "practical", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
const params = new URLSearchParams();
params.set("q", "Ada & Linus");
params.set("page", "2");
console.log(params.toString());
```

## Notes

Uses URLSearchParams in modern browsers and Node. Pure encoding, no network request; validate destination URLs separately.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
