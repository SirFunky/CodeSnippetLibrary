---
id: "everyday-python-dedupe-records"
language: "python"
title: "Keep the first record for each identifier"
description: "Keep the first record for each identifier."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["dedupe-records", "everyday", "python"]
pythonVersion: "3.9"
imports: []
---

```python
def unique_records(records):
    seen = set()
    result = []
    for record in records:
        if record["id"] not in seen:
            seen.add(record["id"])
            result.append(record)
    return result

records = [{"id": 1, "name": "Ada"}, {"id": 1, "name": "Other"}, {"id": 2, "name": "Linus"}]
print([r["name"] for r in unique_records(records)])
```

## Notes

Requires an id key with hashable values; missing keys raise KeyError. Preserves first occurrence and original dictionary references.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
