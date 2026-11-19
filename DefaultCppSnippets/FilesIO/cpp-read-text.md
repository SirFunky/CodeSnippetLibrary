---
id: cpp-read-text
title: Read a text file
description: Read the complete contents of a file as bytes.
language: cpp
category: Files & I/O
subcategory: Reading
tags:
  - file
  - read
  - stream
cppVersion: 14
imports:
  - <fstream>
  - <iterator>
  - <string>
  - <stdexcept>
---

```cpp
std::ifstream input("example.txt", std::ios::binary);
if (!input) throw std::runtime_error("Could not open example.txt");
std::string content((std::istreambuf_iterator<char>(input)),
    std::istreambuf_iterator<char>());
if (input.bad()) throw std::runtime_error("Could not read example.txt");
```

## Notes

Loads the entire file into memory. Binary mode preserves line endings on Windows. std::string stores bytes; UTF-8 text is not decoded or validated. The stream closes automatically when its scope ends.
