---
id: "everyday-python-merge-sorted"
language: "python"
title: "Merge sorted iterables lazily"
description: "Merge sorted iterables lazily."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["merge-sorted", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
from heapq import merge

a = [1, 3, 5]
b = [2, 3, 4]
print(list(merge(a, b)))
```

## Notes

Both inputs must already be sorted using the same ordering. merge is lazy; list materializes the result and preserves duplicates.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
