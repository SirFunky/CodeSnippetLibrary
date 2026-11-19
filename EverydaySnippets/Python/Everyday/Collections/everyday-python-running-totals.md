---
id: "everyday-python-running-totals"
language: "python"
title: "Calculate running totals"
description: "Calculate running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
from itertools import accumulate

values = [2, -1, 4]
print(list(accumulate(values)))
```

## Notes

Keeps source order. Floating-point inputs retain normal rounding limitations.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
