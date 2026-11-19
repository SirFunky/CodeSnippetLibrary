---
id: "everyday-c-hex-decode"
language: "c"
title: "Validate hexadecimal bytes"
description: "Validate hexadecimal bytes."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-decode", "everyday", "c"]
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
    const char *tests[] = {"000fff", "0x"};
    for (size_t t = 0; t < 2; ++t) {
        const char *s = tests[t];
        size_t n = strlen(s);
        int valid = n % 2 == 0;
        for (size_t i = 0; i < n; ++i)
            if (!isxdigit((unsigned char)s[i]))
                valid = 0;
        if (!valid) {
            puts("invalid");
            continue;
        }
        for (size_t i = 0; i < n; i += 2) {
            char pair[3] = {s[i], s[i + 1], 0};
            printf("%s%lu", i ? "," : "", strtoul(pair, NULL, 16));
        }
        putchar('\n');
    }
    return 0;
}
```

## Notes

Validates the complete even-length string before conversion. C locale hexadecimal digits, no prefix.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
