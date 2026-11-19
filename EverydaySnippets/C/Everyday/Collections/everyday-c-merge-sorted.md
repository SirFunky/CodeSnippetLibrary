---
id: "everyday-c-merge-sorted"
language: "c"
title: "Merge sorted arrays into a sized buffer"
description: "Merge sorted arrays into a sized buffer."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["merge-sorted", "everyday", "c"]
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
    const int a[] = {1, 3, 5}, b[] = {2, 3, 4};
    int out[6];
    size_t i = 0, j = 0, k = 0;
    while (i < 3 && j < 3)
        out[k++] = a[i] <= b[j] ? a[i++] : b[j++];
    while (i < 3)
        out[k++] = a[i++];
    while (j < 3)
        out[k++] = b[j++];
    for (i = 0; i < k; ++i)
        printf("%s%d", i ? "," : "", out[i]);
    putchar('\n');
    return 0;
}
```

## Notes

Inputs already ascending; destination capacity equals combined lengths. Duplicates retained.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
