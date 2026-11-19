---
id: "everyday-c-mask-id"
language: "c"
title: "Mask an ASCII identifier"
description: "Mask an ASCII identifier."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "c"]
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
    char s[] = "ABC123456";
    size_t n = strlen(s);
    for (size_t i = 0; i < n && n - i > 4; ++i)
        s[i] = '*';
    puts(s);
    return 0;
}
```

## Notes

Byte-based display masking; not appropriate for multi-byte character boundaries or encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
