---
id: "everyday-javascript-slug"
language: "javascript"
title: "Create an ASCII slug"
description: "Create an ASCII slug."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["slug", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function slug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

console.log(slug("  Ada Lovelace! "));
```

## Notes

ASCII-only slug for display/routing. Non-ASCII letters are removed, not transliterated. Uniqueness must be handled separately.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
