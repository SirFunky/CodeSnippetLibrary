---
id: "c-format-text"
language: "c"
title: "Format text and detect truncation"
description: "Format text and detect truncation."
category: "Strings & Numbers"
tags: ["format-text", "c"]
cVersion: 11
imports: ["<stdio.h>"]
---

```c
int main(void) {
    char buffer[32];
    int written = snprintf(buffer, sizeof buffer, "%s: %d", "Count", 42);
    if (written < 0 || (size_t)written >= sizeof buffer) {
        fputs("Formatting failed or truncated\n", stderr);
        return 1;
    }
    puts(buffer);
    return 0;
}
```

## Notes

snprintf returns the number of characters that would be written, excluding the terminator. A result at least as large as capacity means truncation. Keep format strings fixed when formatting external text. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
