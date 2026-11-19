---
id: "everyday-c-allocation"
language: "c"
title: "Allocate an overflow-checked array"
description: "Allocate an overflow-checked array."
category: "Memory"
subcategory: "Everyday tasks"
tags: ["allocation", "everyday", "c"]
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
    size_t count = 4;
    if (count > SIZE_MAX / sizeof(int))
        return 1;
    int *items = calloc(count, sizeof *items);
    if (!items && count != 0)
        return 1;
    for (size_t i = 0; i < count; ++i)
        items[i] = (int)i;
    for (size_t i = 0; i < count; ++i)
        printf("%s%d", i ? "," : "", items[i]);
    putchar('\n');
    free(items);
    return 0;
}
```

## Notes

Checks allocation size and failure; releases storage exactly once. Sample index values fit int.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
