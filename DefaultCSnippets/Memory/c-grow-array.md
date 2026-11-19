---
id: "c-grow-array"
language: "c"
title: "Grow an allocation without losing it on failure"
description: "Grow an allocation without losing it on failure."
category: "Memory"
tags: ["grow-array", "c"]
cVersion: 11
imports: ["<stdlib.h>", "<stdint.h>", "<stdio.h>"]
---

```c
int main(void) {
    size_t count = 2;
    int *values = malloc(count * sizeof *values);
    if (values == NULL) return 1;
    values[0] = 10; values[1] = 20;
    size_t new_count = 4;
    if (new_count == 0 || new_count > SIZE_MAX / sizeof *values) { free(values); return 1; }
    int *grown = realloc(values, new_count * sizeof *values);
    if (grown == NULL) { free(values); return 1; }
    values = grown;
    for (size_t i = count; i < new_count; ++i) values[i] = 0;
    printf("%d %d %d %d\n", values[0], values[1], values[2], values[3]);
    free(values);
    return 0;
}
```

## Notes

Store realloc in a temporary pointer. On failure, the original allocation is still owned by the caller. On success, old aliases must no longer be used; new elements are uninitialized until explicitly set. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
