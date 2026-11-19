---
id: "everyday-c-safe-divide"
language: "c"
title: "Handle invalid floating-point division"
description: "Handle invalid floating-point division."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "c"]
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
    const double a[] = {10, 1}, b[] = {4, 0};
    for (size_t i = 0; i < 2; ++i) {
        if (!isfinite(a[i]) || !isfinite(b[i]) || b[i] == 0) {
            puts("invalid");
            continue;
        }
        double q = a[i] / b[i];
        if (!isfinite(q))
            puts("invalid");
        else
            printf("%.1f\n", q);
    }
    return 0;
}
```

## Notes

Rejects non-finite inputs/results and a zero divisor. Floating-point rounding still applies.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
