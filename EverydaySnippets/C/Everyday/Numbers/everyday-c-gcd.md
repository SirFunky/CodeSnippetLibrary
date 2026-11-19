---
id: "everyday-c-gcd"
language: "c"
title: "Calculate the greatest common divisor"
description: "Calculate the greatest common divisor."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["gcd", "everyday", "c"]
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
    unsigned long a = 84, b = 30;
    while (b != 0) {
        unsigned long r = a % b;
        a = b;
        b = r;
    }
    printf("%lu\n", a);
    return 0;
}
```

## Notes

Unsigned Euclidean algorithm, including gcd(0,n)=n. gcd(0,0) returns 0 by this convention.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
