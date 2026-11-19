---
id: "everyday-python-format-cents"
language: "python"
title: "Format signed integer cents"
description: "Format signed integer cents."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["format-cents", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def money(cents):
    if not isinstance(cents, int) or isinstance(cents, bool):
        raise TypeError("integer cents required")
    amount = abs(cents)
    whole, fraction = divmod(amount, 100)
    return f'{"-" if cents < 0 else ""}{whole}.{fraction:02d}'

print(money(12345))
print(money(-5))
```

## Notes

Formats integer minor units with a literal decimal point. Currency, locale and decimal-input rounding are separate decisions.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
