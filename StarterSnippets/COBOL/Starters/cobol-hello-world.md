---
id: "starter-cobol-hello-world"
language: "cobol"
title: "Hello World — COBOL"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "cobol"]
cobolVersion: 2002
cobolFormat: "free"
imports: []
---

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO-WORLD.
PROCEDURE DIVISION.
    DISPLAY "Hello, World!"
    STOP RUN.
```

## Notes

Outputs Hello, World! followed by a newline.

Free-format COBOL 2002 starter. Save as hello.cob. With GnuCOBOL and its C toolchain installed: cobc -x -free -std=cobol2002 -o hello.exe hello.cob. Run: hello.exe. It needs no files or copybooks. Other compiler vendors may require different options.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
