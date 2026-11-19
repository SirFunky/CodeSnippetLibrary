---
id: "everyday-c-running-totals"
language: "c"
title: "Calculate checked running totals"
description: "Calculate checked running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "c"]
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
    const long a[] = {2, -1, 4};
    long sum = 0;
    for (size_t i = 0; i < 3; ++i) {
        long x = a[i];
        if ((x > 0 && sum > LONG_MAX - x) || (x < 0 && sum < LONG_MIN - x)) {
            puts("overflow");
            return 1;
        }
        sum += x;
        printf("%ld\n", sum);
    }
    return 0;
}
```

## Notes

Checks signed overflow before addition, avoiding undefined behavior.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
