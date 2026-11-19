---
id: cpp-erase-matching
title: Remove matching vector elements
description: Use std::erase_if to remove even numbers.
language: cpp
category: Collections
subcategory: Vectors
tags:
  - vector
  - erase
  - filter
cppVersion: 20
imports:
  - <vector>
---

```cpp
std::vector<int> values{1, 2, 3, 4, 5};
std::erase_if(values, [](int value) { return value % 2 == 0; });
```

## Notes

Requires C++20. Changes the vector and invalidates iterators/references at or after the erased positions. Surviving elements preserve their relative order.
