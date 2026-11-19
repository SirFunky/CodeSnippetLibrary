---
id: "everyday-python-rotate"
language: "python"
title: "Rotate a list by a signed offset"
description: "Rotate a list by a signed offset."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["rotate", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def rotate(values, offset):
    if not values:
        return []
    offset %= len(values)
    return values[offset:] + values[:offset]

print(rotate([1, 2, 3, 4], -1))
```

## Notes

Positive integer offsets rotate left, negative offsets right. Returns a shallow copied list.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
