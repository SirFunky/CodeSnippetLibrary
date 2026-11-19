---
id: "everyday-typescript-valid-date"
language: "typescript"
title: "Validate Gregorian year-month-day components"
description: "Validate Gregorian year-month-day components."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["valid-date", "everyday", "typescript"]
typescriptVersion: "4.9"
imports: []
---

```typescript
function validDate(year: number, month: number, day: number): boolean {
  if (
    ![year, month, day].every(Number.isInteger) ||
    year < 1 ||
    year > 9999 ||
    month < 1 ||
    month > 12
  )
    return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= days[month - 1];
}

console.log(validDate(2024, 2, 29));
console.log(validDate(2023, 2, 29));
```

## Notes

Validates Gregorian calendar components, years 1–9999. It does not validate times or historical local-calendar transitions. Compile with strict TypeScript and an ES2020 library/target; the demo runs in Node or a browser console.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
