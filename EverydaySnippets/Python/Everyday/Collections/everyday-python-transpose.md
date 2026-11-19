---
id: "everyday-python-transpose"
language: "python"
title: "Transpose a rectangular matrix"
description: "Transpose a rectangular matrix."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["transpose", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def transpose(rows):
    if not rows:
        return []
    width = len(rows[0])
    if any(len(row) != width for row in rows):
        return None
    return [list(column) for column in zip(*rows)]

print(transpose([[1, 2, 3], [4, 5, 6]]))
print(transpose([[1], [2, 3]]))
```

## Notes

Checks row lengths before zip, avoiding silent truncation of ragged data. Element references remain shared.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
