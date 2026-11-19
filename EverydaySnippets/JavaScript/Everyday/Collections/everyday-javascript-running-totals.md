---
id: "everyday-javascript-running-totals"
language: "javascript"
title: "Calculate running totals"
description: "Calculate running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function runningTotals(values) {
  let sum = 0;
  return values.map((value) => (sum += value));
}

console.log(JSON.stringify(runningTotals([2, -1, 4])));
```

## Notes

Keeps source order and creates a new array. Validate numeric range/precision for application data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
