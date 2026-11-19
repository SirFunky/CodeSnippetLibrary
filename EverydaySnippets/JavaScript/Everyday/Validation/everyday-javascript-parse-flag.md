---
id: "everyday-javascript-parse-flag"
language: "javascript"
title: "Parse a configuration boolean explicitly"
description: "Parse a configuration boolean explicitly."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["parse-flag", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function parseFlag(text) {
  switch (text.trim().toLowerCase()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
      return false;
    default:
      return null;
  }
}

console.log(parseFlag(" YES "));
console.log(parseFlag("maybe"));
```

## Notes

Defines the accepted vocabulary explicitly. Do not convert arbitrary nonempty strings to boolean.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
