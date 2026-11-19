---
id: "everyday-javascript-csv-field"
language: "javascript"
title: "Escape one CSV field"
description: "Escape one CSV field."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["csv-field", "everyday", "javascript"]
javascriptVersion: 2020
imports: []
---

```javascript
function csvField(value) {
  return /[",\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
}

console.log(csvField('Ada, "A"'));
console.log(csvField("plain"));
```

## Notes

Escapes a single comma-separated CSV field. This does not mitigate spreadsheet formula interpretation or parse complete CSV documents.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
