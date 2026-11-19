---
id: "everyday-c-window-sums"
language: "c"
title: "Calculate sliding window sums"
description: "Calculate sliding window sums."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["window-sums", "everyday", "c"]
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
    size_t n = 4, width = 3;
    if (width == 0)
        return 1;
    long sum = 0;
    for (size_t i = 0; i < n; ++i) {
        sum += a[i];
        if (i >= width)
            sum -= a[i - width];
        if (i >= width - 1)
            printf("%ld\n", sum);
    }
    return 0;
}
```

## Notes

O(n) rolling sum. Every intermediate sum must fit long; use checked arithmetic for arbitrary data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
