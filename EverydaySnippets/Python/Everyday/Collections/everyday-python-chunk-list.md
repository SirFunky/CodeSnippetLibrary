---
id: "everyday-python-chunk-list"
language: "python"
title: "Split a list into bounded chunks"
description: "Split a list into bounded chunks."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["chunk-list", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def chunks(values, size):
    if not isinstance(size, int) or isinstance(size, bool) or size < 1:
        raise ValueError("positive integer size required")
    return [values[i:i + size] for i in range(0, len(values), size)]

print(chunks([1, 2, 3, 4, 5], 2))
print(chunks([], 2))
```

## Notes

Each slice is a new list but referenced objects remain shared. Nonpositive chunk sizes are rejected.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
