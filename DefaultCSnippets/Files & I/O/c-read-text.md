---
id: "c-read-text"
language: "c"
title: "Read a small text file with a size limit"
description: "Read a small text file with a size limit."
category: "Files & I/O"
tags: ["read-text", "c"]
cVersion: 11
imports: ["<stdio.h>"]
---

```c
int main(void) {
    FILE *file = fopen("example.txt", "rb");
    if (file == NULL) { perror("open"); return 1; }
    char buffer[1024];
    size_t length = fread(buffer, 1, sizeof buffer - 1, file);
    int failed = ferror(file);
    int extra = fgetc(file);
    failed = failed || ferror(file) || extra != EOF;
    if (fclose(file) != 0) failed = 1;
    if (failed) { fputs("Read failed or file too large\n", stderr); return 1; }
    buffer[length] = '\0';
    puts(buffer);
    return 0;
}
```

## Notes

Requires example.txt in the working directory, at most 1023 bytes. Rejects larger input instead of silently truncating it. Intended for text without embedded NUL bytes; use length-aware output for binary data. Standard C library only. This is a complete program; Copy with headers prepends the required includes.
