---
id: "everyday-c-extension"
language: "c"
title: "Extract an ASCII filename extension"
description: "Extract an ASCII filename extension."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["extension", "everyday", "c"]
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
    const char *path = "C:\\reports\\data.CSV", *name = path;
    for (const char *p = path; *p; ++p)
        if (*p == '/' || *p == '\\')
            name = p + 1;
    const char *dot = strrchr(name, '.');
    if (dot && dot != name && dot[1])
        for (const char *p = dot + 1; *p; ++p)
            putchar(tolower((unsigned char)*p));
    putchar('\n');
    return 0;
}
```

## Notes

Byte-based lexical path handling; dotfiles have no extension. Does not validate contents.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
