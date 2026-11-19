---
id: "everyday-python-duration"
language: "python"
title: "Format an elapsed duration as HH:MM:SS"
description: "Format an elapsed duration as HH:MM:SS."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def duration(seconds):
    if not isinstance(seconds, int) or isinstance(seconds, bool) or seconds < 0:
        return None
    hours, rest = divmod(seconds, 3600)
    minutes, seconds = divmod(rest, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

print(duration(3661))
print(duration(-1))
```

## Notes

Elapsed duration, not timezone-aware clock time. Hours may exceed 23.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
