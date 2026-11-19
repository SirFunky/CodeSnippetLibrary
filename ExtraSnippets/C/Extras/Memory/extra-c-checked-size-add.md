---
id: "extra-c-checked-size-add"
language: "c"
title: "Check size arithmetic before combining buffers"
description: "Check size arithmetic before combining buffers."
category: "Memory"
subcategory: "Practical extras"
tags: ["checked-size-add", "practical", "c"]
cVersion: 11
imports: []
---

```c
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
static int size_add(size_t a, size_t b, size_t *out) {
    if (a > SIZE_MAX - b)
        return 0;
    *out = a + b;
    return 1;
}
int main(void) {
    size_t total = 0;
    if (size_add(12, 8, &total))
        printf("%zu\n", total);
    if (!size_add(SIZE_MAX, 1, &total))
        puts("overflow");
    return 0;
}
```

## Notes

out must point to writable size_t storage. On overflow it remains unchanged. Check space for terminators separately before allocating or copying.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
