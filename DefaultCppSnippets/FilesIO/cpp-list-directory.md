---
id: cpp-list-directory
title: List files in a directory
description: Collect immediate regular files using std::filesystem.
language: cpp
category: Files & I/O
subcategory: Directories
tags:
  - filesystem
  - directory
  - list
cppVersion: 17
imports:
  - <filesystem>
  - <vector>
---

```cpp
std::vector<std::filesystem::path> files;
for (const auto& entry : std::filesystem::directory_iterator(".")) {
    if (entry.is_regular_file()) files.push_back(entry.path());
}
```

## Notes

Requires C++17 filesystem support. Does not recurse and iteration order is unspecified. May throw std::filesystem::filesystem_error. is_regular_file follows symbolic links to their targets.
