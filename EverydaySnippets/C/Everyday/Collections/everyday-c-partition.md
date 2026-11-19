---
id: "everyday-c-partition"
language: "c"
title: "Partition values into bounded arrays"
description: "Partition values into bounded arrays."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "c"]
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
    const int a[] = {1, 2, 3, 4};
    int even[4], odd[4];
    size_t ne = 0, no = 0;
    for (size_t i = 0; i < 4; ++i) {
        if (a[i] % 2 == 0)
            even[ne++] = a[i];
        else
            odd[no++] = a[i];
    }
    for (size_t i = 0; i < ne; ++i)
        printf("%s%d", i ? "," : "", even[i]);
    putchar('\n');
    for (size_t i = 0; i < no; ++i)
        printf("%s%d", i ? "," : "", odd[i]);
    putchar('\n');
    return 0;
}
```

## Notes

Each output has source capacity, so every possible partition fits; source order retained.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
