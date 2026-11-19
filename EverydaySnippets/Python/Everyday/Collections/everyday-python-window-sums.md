---
id: "everyday-python-window-sums"
language: "python"
title: "Calculate sliding window sums"
description: "Calculate sliding window sums."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["window-sums", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def window_sums(values, width):
    if not isinstance(width, int) or width < 1:
        raise ValueError("positive integer width required")
    if width > len(values):
        return []
    total = sum(values[:width])
    result = [total]
    for i in range(width, len(values)):
        total += values[i] - values[i - width]
        result.append(total)
    return result

print(window_sums([1, 2, 3, 4], 3))
```

## Notes

O(n) rolling sums. Floating-point inputs can accumulate rounding error; sample inputs are integers.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
