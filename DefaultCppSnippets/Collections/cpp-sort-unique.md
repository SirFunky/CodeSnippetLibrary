---
id: cpp-sort-unique
title: Sort and deduplicate a vector
description: Sort values, then erase adjacent duplicates.
language: cpp
category: Collections
subcategory: Vectors
tags:
  - vector
  - sort
  - unique
cppVersion: 14
imports:
  - <vector>
  - <algorithm>
---

```cpp
std::vector<int> values{3, 1, 3, 2, 1};
std::sort(values.begin(), values.end());
values.erase(std::unique(values.begin(), values.end()), values.end());
```

## Notes

Changes the vector and its order. std::unique moves duplicates to the end but does not shrink the container; erase performs the removal.
