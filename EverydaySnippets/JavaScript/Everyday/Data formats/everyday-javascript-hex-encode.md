---
id: "everyday-javascript-hex-encode"
language: "javascript"
title: "Encode byte values as hexadecimal"
description: "Encode byte values as hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-encode", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function hex(bytes) {
  if (bytes.some((n) => !Number.isInteger(n) || n < 0 || n > 255))
    throw new RangeError("byte out of range");
  return bytes.map((n) => n.toString(16).padStart(2, "0")).join("");
}

console.log(hex([0, 15, 255]));
try {
  hex([256]);
} catch {
  console.log("invalid");
}
```

## Notes

Accepts integer bytes only. Encoding is reversible formatting, not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
