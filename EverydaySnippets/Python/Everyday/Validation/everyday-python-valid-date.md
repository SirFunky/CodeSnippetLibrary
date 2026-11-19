---
id: "everyday-python-valid-date"
language: "python"
title: "Validate Gregorian date components"
description: "Validate Gregorian date components."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["valid-date", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
from datetime import date

def valid_date(year, month, day):
    try:
        date(year, month, day)
        return True
    except (ValueError, TypeError):
        return False

print(valid_date(2024, 2, 29))
print(valid_date(2023, 2, 29))
```

## Notes

Uses datetime.date, including its supported year range 1–9999. Does not validate time or historical local-calendar transitions.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
