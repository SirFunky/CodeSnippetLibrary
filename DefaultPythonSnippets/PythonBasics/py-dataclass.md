---
id: py-dataclass
title: Define a data class
description: Generate initialization, comparison and representation methods.
language: python
category: Python Basics
subcategory: Classes
tags:
  - class
  - dataclass
pythonVersion: "3.7"
imports:
  - from dataclasses import dataclass
---

```python
@dataclass
class Person:
    name: str
    age: int

person = Person("Ada", 36)
```

## Notes

Annotations are not runtime validation. Data classes are mutable by default. Use field(default_factory=list) for mutable field defaults.
