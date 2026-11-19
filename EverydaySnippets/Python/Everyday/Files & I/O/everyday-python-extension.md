---
id: "everyday-python-extension"
language: "python"
title: "Extract a filename extension lexically"
description: "Extract a filename extension lexically."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["extension", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def extension(path):
    name = path.replace("\\", "/").rsplit("/", 1)[-1]
    dot = name.rfind(".")
    return name[dot + 1:].lower() if 0 < dot < len(name) - 1 else ""

print(extension("C:/reports/data.CSV"))
print(repr(extension(".env")))
```

## Notes

Handles slash and backslash separators; a lone dotfile has no extension. Does not read files or validate their contents.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
