---
id: "everyday-python-parse-flag"
language: "python"
title: "Parse a configuration boolean explicitly"
description: "Parse a configuration boolean explicitly."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["parse-flag", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def parse_flag(text):
    value = text.strip().casefold()
    if value in {"true", "yes", "1"}:
        return True
    if value in {"false", "no", "0"}:
        return False
    return None

print(parse_flag(" YES "))
print(parse_flag("maybe"))
```

## Notes

Defines the accepted vocabulary. bool("false") is true because the string is nonempty; do not use that as a configuration parser.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
