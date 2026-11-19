---
id: "c-generic-selection"
language: "c"
title: "Choose a type label with generic selection"
description: "Choose a type label with generic selection."
category: "C Basics"
tags: ["generic-selection", "c"]
cVersion: 11
imports: ["<stdio.h>"]
---

```c
#define TYPE_NAME(value) _Generic((value), int: "int", double: "double", default: "other")
int main(void) {
    puts(TYPE_NAME(42));
    puts(TYPE_NAME(3.14));
    return 0;
}
```

## Notes

_Generic requires C11. The controlling expression is not evaluated. This example labels only int and double and falls back for other types. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
