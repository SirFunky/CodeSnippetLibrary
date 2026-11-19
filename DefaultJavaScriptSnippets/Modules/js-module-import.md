---
id: "js-module-import"
language: "javascript"
title: "Import a function from a local module"
description: "Import a function from a local module."
category: "Modules"
tags: ["module-import", "javascript"]
javascriptVersion: 2015
imports: ["import { greet } from \"./greeting.js\""]
---

```javascript
const message = greet("Ada");
```

## Notes

Requires a sibling greeting.js ES module exporting: export function greet(name) { return `Hello, ${name}!`; }. In Node, use type: module in package.json or a matching .mjs module path; browsers require module loading and a suitable local server. Use Copy with imports for the full source. The library itself makes no module or network requests. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
