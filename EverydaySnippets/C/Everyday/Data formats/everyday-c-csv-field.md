---
id: "everyday-c-csv-field"
language: "c"
title: "Escape one CSV field"
description: "Escape one CSV field."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["csv-field", "everyday", "c"]
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
    const char *s = "Ada, \"A\"";
    int quote = strpbrk(s, ",\"\r\n") != NULL;
    if (quote)
        putchar('"');
    for (size_t i = 0; s[i]; ++i) {
        if (s[i] == '"')
            putchar('"');
        putchar((unsigned char)s[i]);
    }
    if (quote)
        putchar('"');
    putchar('\n');
    if (ferror(stdout))
        return 1;
    return 0;
}
```

## Notes

Streams a comma-separated field. Check write errors; spreadsheet formula interpretation is separate.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
