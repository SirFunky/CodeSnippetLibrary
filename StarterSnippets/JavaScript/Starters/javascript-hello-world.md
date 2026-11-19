---
id: "starter-javascript-hello-world"
language: "javascript"
title: "Hello World — JavaScript"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "javascript"]
javascriptVersion: 2015
imports: []
---

```javascript
function main() {
    const message = "Hello, World!";
    console.log(message);
}

main();
```

## Notes

Outputs Hello, World! followed by a newline.

Save as main.js. Run with an ES2015-capable Node runtime: node main.js. In a browser, load the file with a script element and read the developer console; output is not written into the page. console is provided by the host environment, not ECMAScript itself.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
