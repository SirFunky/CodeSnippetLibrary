---
id: "everyday-c-transpose"
language: "c"
title: "Transpose a rectangular matrix"
description: "Transpose a rectangular matrix."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["transpose", "everyday", "c"]
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
    const int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int out[3][2];
    for (size_t r = 0; r < 2; ++r)
        for (size_t c = 0; c < 3; ++c)
            out[c][r] = a[r][c];
    for (size_t r = 0; r < 3; ++r)
        printf("%d,%d\n", out[r][0], out[r][1]);
    return 0;
}
```

## Notes

Fixed dimensions ensure a rectangular matrix and sufficient destination storage.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
