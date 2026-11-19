---
id: "c-static-assert"
language: "c"
title: "Check an assumption at compile time"
description: "Check an assumption at compile time."
category: "C Basics"
tags: ["static-assert", "c"]
cVersion: 11
imports: ["<limits.h>", "<stdio.h>"]
---

```c
_Static_assert(CHAR_BIT >= 8, "Requires at least eight bits per byte");
int main(void) {
    puts("Assumption checked");
    return 0;
}
```

## Notes

_Static_assert requires C11 and fails compilation if the condition is false. CHAR_BIT is implementation-defined; do not assume every C byte is exactly eight bits. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
