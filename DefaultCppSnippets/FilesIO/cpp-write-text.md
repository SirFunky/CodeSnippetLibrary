---
id: cpp-write-text
title: Write a text file
description: Create or replace a file and detect write errors.
language: cpp
category: Files & I/O
subcategory: Writing
tags:
  - file
  - write
  - stream
cppVersion: 14
imports:
  - <fstream>
---

```cpp
std::ofstream output;
output.exceptions(std::ios::failbit | std::ios::badbit);
output.open("output.txt", std::ios::binary | std::ios::trunc);
output << "Hello, C++!";
output.close();
```

## Notes

Replaces existing content. Parent directories must exist. Throws std::ios_base::failure on open/write/close failure. Explicit close checks final flush errors. Bytes are written without an automatic encoding conversion.
