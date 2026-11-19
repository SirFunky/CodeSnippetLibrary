---
id: "everyday-c-format-cents"
language: "c"
title: "Format signed integer cents"
description: "Format signed integer cents."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["format-cents", "everyday", "c"]
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
    const long values[] = {12345, -5, LONG_MIN};
    for (size_t i = 0; i < 2; ++i) {
        long c = values[i], q = c / 100, r = c % 100;
        printf("%s%ld.%02ld\n", c < 0 ? "-" : "", q < 0 ? -q : q, r < 0 ? -r : r);
    }
    return 0;
}
```

## Notes

Quotient/remainder can also handle LONG_MIN without negating it directly. Sample displays two amounts.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
