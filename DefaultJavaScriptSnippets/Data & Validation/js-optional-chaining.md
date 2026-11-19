---
id: "js-optional-chaining"
language: "javascript"
title: "Read nested data with optional chaining"
description: "Read nested data with optional chaining."
category: "Data & Validation"
tags: ["optional-chaining", "javascript"]
javascriptVersion: 2020
---

```javascript
function cityOf(profile) {
    return profile?.address?.city;
}
```

## Notes

Short-circuits on null or undefined. It does not validate the type of the final property or suppress errors thrown by getters. ES2020: https://tc39.es/ecma262/2020/ No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
