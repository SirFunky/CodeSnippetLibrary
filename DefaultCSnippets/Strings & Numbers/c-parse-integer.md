---
id: "c-parse-integer"
language: "c"
title: "Parse an integer with error checks"
description: "Parse an integer with error checks."
category: "Strings & Numbers"
tags: ["parse-integer", "c"]
cVersion: 11
imports: ["<stdlib.h>", "<errno.h>", "<limits.h>", "<stdio.h>"]
---

```c
int main(void) {
    const char *text = "42";
    char *end = NULL;
    errno = 0;
    long parsed = strtol(text, &end, 10);
    if (text == end || *end != '\0' || errno == ERANGE
        || parsed < INT_MIN || parsed > INT_MAX) {
        fputs("Invalid integer\n", stderr);
        return 1;
    }
    int value = (int)parsed;
    printf("%d\n", value);
    return 0;
}
```

## Notes

Accepts leading whitespace and an optional sign; rejects trailing characters. strtol detects long overflow; the explicit bounds also check int range. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
