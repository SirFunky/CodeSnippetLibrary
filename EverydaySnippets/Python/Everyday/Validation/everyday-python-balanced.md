---
id: "everyday-python-balanced"
language: "python"
title: "Check balanced bracket characters"
description: "Check balanced bracket characters."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["balanced", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def balanced(text):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for char in text:
        if char in "([{":
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack

print(balanced("{a:[(b)]}"))
print(balanced("([)]"))
```

## Notes

Checks brackets while ignoring other characters. Not a language parser: quoted strings and comments are not recognized.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
