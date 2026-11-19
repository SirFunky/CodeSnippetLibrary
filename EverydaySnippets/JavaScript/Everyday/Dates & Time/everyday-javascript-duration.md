---
id: "everyday-javascript-duration"
language: "javascript"
title: "Format an elapsed duration as HH:MM:SS"
description: "Format an elapsed duration as HH:MM:SS."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function duration(seconds) {
  if (!Number.isSafeInteger(seconds) || seconds < 0) return null;
  const h = Math.floor(seconds / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

console.log(duration(3661));
console.log(duration(-1));
```

## Notes

An elapsed duration, not a clock time or timezone-aware timestamp. Hours may exceed 23.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
