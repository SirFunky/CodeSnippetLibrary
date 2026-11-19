---
id: "everyday-python-csv-field"
language: "python"
title: "Escape one CSV field"
description: "Escape one CSV field."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["csv-field", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import csv
import io

def csv_field(value):
    buffer = io.StringIO(newline="")
    csv.writer(buffer, lineterminator="\r\n").writerow([value])
    return buffer.getvalue()[:-2]

print(csv_field('Ada, "A"'))
print(csv_field("plain"))
```

## Notes

Uses the standard CSV writer and removes only its known record terminator. Does not mitigate spreadsheet formula interpretation.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
