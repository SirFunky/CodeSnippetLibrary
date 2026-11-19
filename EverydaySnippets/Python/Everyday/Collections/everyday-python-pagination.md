---
id: "everyday-python-pagination"
language: "python"
title: "Calculate checked pagination bounds"
description: "Calculate checked pagination bounds."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def page_bounds(total, page, size):
    if not all(isinstance(n, int) and not isinstance(n, bool) for n in (total, page, size)):
        return None
    if total < 0 or page < 1 or size < 1:
        return None
    start = min((page - 1) * size, total)
    return start, min(start + size, total)

print(page_bounds(23, 3, 10))
print(page_bounds(23, 0, 10))
```

## Notes

One-based page numbers; zero-based end-exclusive bounds. Out-of-range pages produce an empty slice.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
