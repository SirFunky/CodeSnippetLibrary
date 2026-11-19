---
id: "everyday-c-valid-date"
language: "c"
title: "Validate Gregorian calendar components"
description: "Validate Gregorian calendar components."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["valid-date", "everyday", "c"]
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
    const int years[] = {2024, 2023};
    for (size_t i = 0; i < 2; ++i) {
        int y = years[i], m = 2, d = 29;
        int days[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int leap = y % 4 == 0 && (y % 100 != 0 || y % 400 == 0);
        if (leap)
            days[1] = 29;
        int ok = y >= 1 && y <= 9999 && m >= 1 && m <= 12 && d >= 1 && d <= days[m - 1];
        puts(ok ? "true" : "false");
    }
    return 0;
}
```

## Notes

Year range 1–9999 and Gregorian leap-year rules. Does not validate clock times.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
