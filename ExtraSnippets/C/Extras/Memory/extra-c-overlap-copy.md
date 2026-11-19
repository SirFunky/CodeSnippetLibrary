---
id: "extra-c-overlap-copy"
language: "c"
title: "Move overlapping bytes safely"
description: "Move overlapping bytes safely."
category: "Memory"
subcategory: "Practical extras"
tags: ["overlap-copy", "practical", "c"]
cVersion: 11
imports: []
---

```c
#include <stdio.h>
#include <string.h>
int main(void) {
    char text[] = "abcdef";
    const size_t remove_at = 2;
    const size_t length = strlen(text);
    if (remove_at >= length)
        return 1;
    memmove(text + remove_at, text + remove_at + 1, length - remove_at);
    puts(text);
    return 0;
}
```

## Notes

Removes one byte in place and includes the terminating NUL in the move. memmove permits overlap; memcpy does not. This is byte-oriented, not Unicode character deletion.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
