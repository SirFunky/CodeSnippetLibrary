---
id: py-parse-date
title: Parse an ISO date
description: Convert an ISO-formatted date into a date object.
language: python
category: Utilities
subcategory: Date & time
tags:
  - date
  - iso
  - parse
pythonVersion: "3.7"
imports:
  - from datetime import date
---

```python
day = date.fromisoformat("2026-11-19")
print(day.strftime("%Y-%m-%d"))
```

## Notes

Raises ValueError for an invalid date. date has no time zone or time-of-day component. fromisoformat was added in Python 3.7.
