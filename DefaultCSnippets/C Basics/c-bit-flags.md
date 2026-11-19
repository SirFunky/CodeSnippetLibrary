---
id: "c-bit-flags"
language: "c"
title: "Set and clear unsigned bit flags"
description: "Set and clear unsigned bit flags."
category: "C Basics"
tags: ["bit-flags", "c"]
cVersion: 11
imports: ["<stdio.h>"]
---

```c
enum Permission { READ = 1u << 0, WRITE = 1u << 1, EXECUTE = 1u << 2 };
int main(void) {
    unsigned flags = READ | WRITE;
    flags &= ~(unsigned)WRITE;
    flags |= EXECUTE;
    printf("%u %d %d\n", flags, (flags & READ) != 0, (flags & WRITE) != 0);
    return 0;
}
```

## Notes

Uses unsigned masks to avoid signed bit operations. Shift counts must be smaller than the type width. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
