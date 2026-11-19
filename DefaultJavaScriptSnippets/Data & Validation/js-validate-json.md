---
id: "js-validate-json"
language: "javascript"
title: "Parse JSON and validate its shape"
description: "Parse JSON and validate its shape."
category: "Data & Validation"
tags: ["validate-json", "javascript"]
javascriptVersion: 2015
---

```javascript
function parseProfile(text) {
    const value = JSON.parse(text);
    if (value === null || typeof value !== "object" || Array.isArray(value)
        || typeof value.name !== "string" || !Number.isFinite(value.age)) {
        throw new TypeError("Expected an object with a name and finite age");
    }
    return { name: value.name, age: value.age };
}
```

## Notes

JSON.parse can throw SyntaxError; validation can throw TypeError. This validates only the displayed contract; it does not impose age bounds or forbid extra properties. Never assume parsed JSON is valid application data. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
