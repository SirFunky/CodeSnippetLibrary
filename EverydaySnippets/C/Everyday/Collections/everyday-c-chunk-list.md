---
id: "everyday-c-chunk-list"
language: "c"
title: "Process an array in bounded chunks"
description: "Process an array in bounded chunks."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["chunk-list", "everyday", "c"]
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
    const int a[] = {1, 2, 3, 4, 5};
    size_t n = sizeof a / sizeof a[0], width = 2;
    if (width == 0)
        return 1;
    for (size_t i = 0; i < n;) {
        size_t count = width < n - i ? width : n - i;
        for (size_t j = 0; j < count; ++j)
            printf("%s%d", j ? "," : "", a[i + j]);
        putchar('\n');
        i += count;
    }
    return 0;
}
```

## Notes

Processes nonempty chunks without copying; checks remaining length before adding offsets.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
