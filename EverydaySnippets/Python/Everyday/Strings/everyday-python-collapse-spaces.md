---
id: "everyday-python-collapse-spaces"
language: "python"
title: "Collapse runs of whitespace"
description: "Collapse runs of whitespace."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["collapse-spaces", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def collapse(text):
    return " ".join(text.split())

print(collapse(" Ada\t Linus\nGrace "))
```

## Notes

Normalizes Unicode whitespace. Do not apply to code, passwords or whitespace-sensitive data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
