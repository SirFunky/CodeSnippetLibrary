---
id: "js-async-function"
language: "javascript"
title: "Combine independent async operations"
description: "Combine independent async operations."
category: "Async"
tags: ["async-function", "javascript"]
javascriptVersion: 2017
---

```javascript
async function loadSummary(loadUser, loadCount) {
    const [user, count] = await Promise.all([loadUser(), loadCount()]);
    return { user, count };
}
```

## Notes

Pass functions returning promises; this example makes no network calls. Both functions are invoked before awaiting. A rejection rejects the returned promise but does not cancel other work. No third-party packages. ECMAScript year describes language/built-in requirements, not a browser or Node version.
