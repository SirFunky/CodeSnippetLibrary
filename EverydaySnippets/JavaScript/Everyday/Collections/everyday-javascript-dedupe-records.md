---
id: "everyday-javascript-dedupe-records"
language: "javascript"
title: "Keep the first record for each identifier"
description: "Keep the first record for each identifier."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["dedupe-records", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function uniqueRecords(records) {
  const seen = new Set();
  return records.filter((record) => {
    if (seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  });
}

console.log(
  JSON.stringify(
    uniqueRecords([
      { id: 1, name: "Ada" },
      { id: 1, name: "Other" },
      { id: 2, name: "Linus" },
    ]),
  ),
);
```

## Notes

Preserves the first record per ID and its original order. Objects are retained by reference. Choose a clear duplicate policy for real data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
