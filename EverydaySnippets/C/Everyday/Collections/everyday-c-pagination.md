---
id: "everyday-c-pagination"
language: "c"
title: "Calculate checked pagination bounds"
description: "Calculate checked pagination bounds."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "c"]
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
    size_t total = 23, page = 3, size = 10;
    if (page < 1 || size < 1)
        return 1;
    size_t start = total;
    if (page - 1 <= total / size)
        start = (page - 1) * size;
    size_t end = size < total - start ? start + size : total;
    printf("%zu,%zu\n", start, end);
    return 0;
}
```

## Notes

One-based page with end-exclusive offsets; division before multiplication avoids size_t overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
