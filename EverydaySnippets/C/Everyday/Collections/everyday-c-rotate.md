---
id: "everyday-c-rotate"
language: "c"
title: "Rotate an array by a signed offset"
description: "Rotate an array by a signed offset."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["rotate", "everyday", "c"]
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
    int out[4];
    const int n = 4, offset = -1;
    int shift = offset % n;
    if (shift < 0)
        shift += n;
    for (int i = 0; i < n; ++i)
        out[i] = a[(i + shift) % n];
    for (int i = 0; i < n; ++i)
        printf("%s%d", i ? "," : "", out[i]);
    putchar('\n');
    return 0;
}
```

## Notes

Fixed positive length avoids modulo by zero. Positive left, negative right. Array sizes and index sums fit int here.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
