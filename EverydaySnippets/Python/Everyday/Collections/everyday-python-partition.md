---
id: "everyday-python-partition"
language: "python"
title: "Partition values in one pass"
description: "Partition values in one pass."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def partition(values, accept):
    yes, no = [], []
    for value in values:
        (yes if accept(value) else no).append(value)
    return yes, no

print(partition([1, 2, 3, 4], lambda n: n % 2 == 0))
```

## Notes

Preserves order within each partition; avoid predicates that mutate the source iterable.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
