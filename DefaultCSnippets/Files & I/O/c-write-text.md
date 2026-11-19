---
id: "c-write-text"
language: "c"
title: "Write a text file and check close errors"
description: "Write a text file and check close errors."
category: "Files & I/O"
tags: ["write-text", "c"]
cVersion: 11
imports: ["<stdio.h>", "<string.h>"]
---

```c
int main(void) {
    const char *text = "Hello, C!";
    FILE *file = fopen("output.txt", "wb");
    if (file == NULL) { perror("open"); return 1; }
    size_t length = strlen(text);
    int failed = fwrite(text, 1, length, file) != length;
    if (fclose(file) != 0) failed = 1;
    if (failed) { fputs("Write failed\n", stderr); return 1; }
    puts("Written");
    return 0;
}
```

## Notes

Creates or truncates output.txt in the working directory. fclose is checked because buffered writes can fail during close. This is not an atomic file replacement. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
