---
id: "c-struct"
language: "c"
title: "Initialize a struct with designated fields"
description: "Initialize a struct with designated fields."
category: "C Basics"
tags: ["struct", "c"]
cVersion: 11
imports: ["<stdio.h>"]
---

```c
struct Point { int x; int y; };
int main(void) {
    struct Point point = { .y = 20, .x = 10 };
    printf("%d %d\n", point.x, point.y);
    return 0;
}
```

## Notes

Designated initializers select fields by name; omitted fields are zero-initialized. The example uses a C11 supported baseline, though this syntax was introduced in C99. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
