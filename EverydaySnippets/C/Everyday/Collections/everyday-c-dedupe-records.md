---
id: "everyday-c-dedupe-records"
language: "c"
title: "Keep the first record for each identifier"
description: "Keep the first record for each identifier."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["dedupe-records", "everyday", "c"]
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
    struct Row {
        int id;
        const char *name;
    };
    const struct Row rows[] = {{1, "Ada"}, {1, "Other"}, {2, "Linus"}};
    for (size_t i = 0; i < 3; ++i) {
        int seen = 0;
        for (size_t j = 0; j < i; ++j)
            if (rows[j].id == rows[i].id)
                seen = 1;
        if (!seen)
            printf("%d:%s\n", rows[i].id, rows[i].name);
    }
    return 0;
}
```

## Notes

Simple O(n squared) first-wins scan is suitable for small arrays, not large datasets.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
