---
id: "everyday-javascript-hex-decode"
language: "javascript"
title: "Validate and decode hexadecimal bytes"
description: "Validate and decode hexadecimal bytes."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-decode", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function unhex(text) {
  if (text.length % 2 || !/^[0-9a-f]*$/i.test(text)) return null;
  const result = [];
  for (let i = 0; i < text.length; i += 2)
    result.push(parseInt(text.slice(i, i + 2), 16));
  return result;
}

console.log(JSON.stringify(unhex("000fff")));
console.log(unhex("0x"));
```

## Notes

Requires an even number of hexadecimal digits and no prefix/whitespace. Invalid input returns null rather than partially decoding.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
