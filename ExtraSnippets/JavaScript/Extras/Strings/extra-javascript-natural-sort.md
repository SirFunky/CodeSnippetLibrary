---
id: "extra-javascript-natural-sort"
language: "javascript"
title: "Sort numbered names with a numeric collator"
description: "Sort numbered names with a numeric collator."
category: "Strings"
subcategory: "Practical extras"
tags: ["natural-sort", "practical", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
const names = ["file10", "file2", "file1"];
const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "variant",
});
console.log([...names].sort(collator.compare).join(","));
```

## Notes

Uses Intl locale data and numeric text comparison; ICU data can affect other locale-sensitive comparisons across runtimes. Copies the input before sorting.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
