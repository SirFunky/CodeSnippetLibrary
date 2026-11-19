---
id: "c-array-mean"
language: "c"
title: "Calculate a mean with an empty-input check"
description: "Calculate a mean with an empty-input check."
category: "Collections"
tags: ["array-mean", "c"]
cVersion: 17
imports: ["<stddef.h>", "<stdio.h>"]
---

```c
static int mean(const double *values, size_t count, double *result) {
    if (values == NULL || result == NULL || count == 0) return 0;
    double total = 0.0;
    for (size_t i = 0; i < count; ++i) total += values[i];
    *result = total / (double)count;
    return 1;
}
int main(void) {
    double values[] = {2.0, 4.0, 6.0};
    double result = 0.0;
    if (!mean(values, sizeof values / sizeof values[0], &result)) return 1;
    printf("%.1f\n", result);
    return 0;
}
```

## Notes

Requires count accessible double elements. Finite sample values produce 4.0; large or non-finite inputs can overflow or propagate NaN/infinity. Uses a C17 supported baseline, not C17-only syntax. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
