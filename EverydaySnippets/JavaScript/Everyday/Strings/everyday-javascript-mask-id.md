---
id: "everyday-javascript-mask-id"
language: "javascript"
title: "Mask all but the last four characters"
description: "Mask all but the last four characters."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function mask(text) {
  return text.length <= 4 ? text : "*".repeat(text.length - 4) + text.slice(-4);
}

console.log(mask("ABC123456"));
console.log(mask("123"));
```

## Notes

Masks UTF-16 code units for a display identifier. This is presentation only, not encryption or removal of the original data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
