---
id: "starter-c-hello-world"
language: "c"
title: "Hello World — C"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "c"]
cVersion: 11
imports: []
---

```c
#include <stdio.h>

int main(void) {
    puts("Hello, World!");
    return 0;
}
```

## Notes

Outputs Hello, World! followed by a newline.

Save as main.c. In a Visual Studio Developer Command Prompt: cl /TC /std:c11 main.c /Fe:hello.exe. Run: hello.exe. With GCC: gcc -std=c11 main.c -o hello. Standard library only.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
