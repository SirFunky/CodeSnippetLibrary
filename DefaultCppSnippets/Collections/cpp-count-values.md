---
id: cpp-count-values
title: Count occurrences in a map
description: Count how often each string occurs.
language: cpp
category: Collections
subcategory: Maps
tags:
  - map
  - count
cppVersion: 14
imports:
  - <unordered_map>
  - <string>
  - <vector>
  - <cstddef>
---

```cpp
std::vector<std::string> words{"one", "two", "one"};
std::unordered_map<std::string, std::size_t> counts;
for (const auto& word : words) {
    ++counts[word];
}
```

## Notes

operator[] inserts a missing key with a zero-initialized count. Iteration order is unspecified. Counts can wrap if std::size_t overflows.
