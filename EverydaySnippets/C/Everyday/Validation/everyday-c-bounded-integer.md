---
id: "everyday-c-bounded-integer"
language: "c"
title: "Parse a bounded decimal integer"
description: "Parse a bounded decimal integer."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "c"]
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
    const char *tests[] = {"42", "42x", "999", "999999999999999999999999"};
    for (size_t i = 0; i < 4; ++i) {
        const char *s = tests[i];
        char *end = NULL;
        errno = 0;
        long n = strtol(s, &end, 10);
        int lexical = *s != '\0' && !isspace((unsigned char)*s);
        if (!lexical || end == s || *end != '\0' || errno == ERANGE || n < 0 || n > 100)
            puts("invalid");
        else
            printf("%ld\n", n);
    }
    return 0;
}
```

## Notes

Checks errno, consumed input, leading whitespace and inclusive bounds. strtol is not used as a partial parser.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
