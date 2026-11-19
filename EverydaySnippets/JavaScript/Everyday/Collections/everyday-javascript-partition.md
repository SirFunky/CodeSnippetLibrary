---
id: "everyday-javascript-partition"
language: "javascript"
title: "Partition values in one pass"
description: "Partition values in one pass."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function partition(values, accept) {
  const yes = [],
    no = [];
  for (const value of values) (accept(value) ? yes : no).push(value);
  return [yes, no];
}

console.log(JSON.stringify(partition([1, 2, 3, 4], (n) => n % 2 === 0)));
```

## Notes

Preserves input order in each partition. The predicate should not mutate the source collection.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
