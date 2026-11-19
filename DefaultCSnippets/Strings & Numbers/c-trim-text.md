---
id: "c-trim-text"
language: "c"
title: "Trim whitespace in a mutable string"
description: "Trim whitespace in a mutable string."
category: "Strings & Numbers"
tags: ["trim-text", "c"]
cVersion: 11
imports: ["<ctype.h>", "<string.h>", "<stdio.h>"]
---

```c
static void trim(char *text) {
    char *start = text;
    while (isspace((unsigned char)*start)) ++start;
    size_t length = strlen(start);
    while (length > 0 && isspace((unsigned char)start[length - 1])) --length;
    memmove(text, start, length);
    text[length] = '\0';
}
int main(void) {
    char text[] = "  Ada \t";
    trim(text);
    puts(text);
    return 0;
}
```

## Notes

Requires a writable, NUL-terminated string. Cast chars to unsigned char before ctype calls. Whitespace follows the active C locale; this is not Unicode-aware trimming. Empty/all-whitespace strings become empty. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
