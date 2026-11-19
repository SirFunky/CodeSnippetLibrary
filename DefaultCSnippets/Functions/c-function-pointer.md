---
id: "c-function-pointer"
language: "c"
title: "Pass a function as a callback"
description: "Pass a function as a callback."
category: "Functions"
tags: ["function-pointer", "c"]
cVersion: 17
imports: ["<stdio.h>"]
---

```c
static int square_small(int value) { return value * value; }
static int apply(int value, int (*operation)(int)) { return operation(value); }
int main(void) {
    printf("%d\n", apply(6, square_small));
    return 0;
}
```

## Notes

The callback must be non-NULL and match the signature. This sample input fits int; validate bounds before squaring arbitrary input to avoid signed overflow. Uses a C17 supported baseline, not C17-only syntax. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
