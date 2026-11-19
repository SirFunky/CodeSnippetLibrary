---
id: "everyday-python-safe-divide"
language: "python"
title: "Handle zero and non-finite division inputs"
description: "Handle zero and non-finite division inputs."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
import math

def divide(a, b):
    if not math.isfinite(a) or not math.isfinite(b) or b == 0:
        return None
    result = a / b
    return result if math.isfinite(result) else None

print(divide(10.0, 4.0))
print(divide(1.0, 0.0))
```

## Notes

For finite floating-point inputs; non-finite results return None. Floating-point rounding still applies.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
