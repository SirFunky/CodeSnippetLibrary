---
id: py-read-csv
title: Read CSV rows by column name
description: Read UTF-8 CSV records using the header row.
language: python
category: Data formats
subcategory: CSV
tags:
  - csv
  - file
  - read
pythonVersion: "3.0"
imports:
  - import csv
---

```python
with open("people.csv", encoding="utf-8", newline="") as source:
    for row in csv.DictReader(source):
        print(row["name"])
```

## Notes

The file must have a header containing name. newline="" lets the CSV module handle line endings correctly on Windows. The context manager closes the file.
