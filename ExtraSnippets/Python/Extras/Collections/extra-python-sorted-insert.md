---
id: "extra-python-sorted-insert"
language: "python"
title: "Insert into an already sorted list"
description: "Insert into an already sorted list."
category: "Collections"
subcategory: "Practical extras"
tags: ["sorted-insert", "practical", "python"]
pythonVersion: "3.9"
imports: []
---

```python
from bisect import bisect_left, insort_right
values = [1, 3, 3, 7]
insort_right(values, 3)
print(values)
print(bisect_left(values, 3))
```

## Notes

Input must be ascending. insort_right places a duplicate after equal values and mutates the list; insertion is O(n) despite O(log n) position search.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
