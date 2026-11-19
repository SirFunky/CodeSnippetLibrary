---
id: "c-allocate-array"
language: "c"
title: "Allocate and free an array"
description: "Allocate and free an array."
category: "Memory"
tags: ["allocate-array", "c"]
cVersion: 11
imports: ["<stdlib.h>", "<stdint.h>", "<stdio.h>"]
---

```c
int main(void) {
    size_t count = 4;
    if (count == 0 || count > SIZE_MAX / sizeof(int)) return 1;
    int *values = calloc(count, sizeof *values);
    if (values == NULL) return 1;
    for (size_t i = 0; i < count; ++i) values[i] = (int)i + 1;
    printf("%d\n", values[3]);
    free(values);
    return 0;
}
```

## Notes

Checks allocation size and failure. The sample count is bounded at four before converting indexes to int. The caller owns the allocated memory and must free it once. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
