---
id: "everyday-c-duration"
language: "c"
title: "Format elapsed seconds"
description: "Format elapsed seconds."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "c"]
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
    long seconds = 3661;
    if (seconds < 0)
        return 1;
    printf("%02ld:%02ld:%02ld\n", seconds / 3600, seconds % 3600 / 60, seconds % 60);
    return 0;
}
```

## Notes

Nonnegative duration, not a clock or timezone. Hours can exceed 23.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
