---
id: "everyday-c-binary-search"
language: "c"
title: "Find a value with binary search"
description: "Find a value with binary search."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["binary-search", "everyday", "c"]
cVersion: 11
imports: []
---

```c
#include <ctype.h>
#include <errno.h>
#include <limits.h>
#include <math.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    const int a[] = {1, 3, 5, 7, 9};
    size_t lo = 0, hi = 5;
    const int target = 7;
    while (lo < hi) {
        size_t mid = lo + (hi - lo) / 2;
        if (a[mid] < target)
            lo = mid + 1;
        else
            hi = mid;
    }
    if (lo < 5 && a[lo] == target)
        printf("%zu\n", lo);
    else
        puts("missing");
    return 0;
}
```

## Notes

Ascending input required. Half-open bounds avoid unsigned underflow and midpoint overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
