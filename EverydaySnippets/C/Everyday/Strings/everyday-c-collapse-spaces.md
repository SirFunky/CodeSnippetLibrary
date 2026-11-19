---
id: "everyday-c-collapse-spaces"
language: "c"
title: "Collapse ASCII whitespace"
description: "Collapse ASCII whitespace."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["collapse-spaces", "everyday", "c"]
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
    const char *s = " Ada\t Linus\nGrace ";
    char out[64];
    size_t j = 0;
    int gap = 0;
    for (size_t i = 0; s[i]; ++i) {
        unsigned char c = (unsigned char)s[i];
        if (isspace(c)) {
            if (j)
                gap = 1;
        } else {
            if (j + (size_t)gap + 1 >= sizeof out)
                return 1;
            if (gap)
                out[j++] = ' ';
            out[j++] = (char)c;
            gap = 0;
        }
    }
    out[j] = '\0';
    puts(out);
    return 0;
}
```

## Notes

C locale byte classification, not Unicode normalization. Explicit destination bounds leave room for NUL.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
