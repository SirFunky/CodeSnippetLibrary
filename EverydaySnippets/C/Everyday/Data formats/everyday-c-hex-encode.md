---
id: "everyday-c-hex-encode"
language: "c"
title: "Encode bytes as hexadecimal"
description: "Encode bytes as hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-encode", "everyday", "c"]
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
    const unsigned char data[] = {0, 15, 255};
    for (size_t i = 0; i < sizeof data; ++i)
        printf("%02x", (unsigned int)data[i]);
    putchar('\n');
    return 0;
}
```

## Notes

Unsigned bytes promoted to unsigned int for the printf format. Encoding is not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
