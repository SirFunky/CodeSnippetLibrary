---
id: cpp-filter-map
title: Filter and transform a vector
description: Keep positive values and double them.
language: cpp
category: Collections
subcategory: Algorithms
tags:
  - vector
  - filter
  - transform
cppVersion: 14
imports:
  - <vector>
  - <algorithm>
  - <iterator>
---

```cpp
std::vector<int> values{-2, 1, 0, 3};
std::vector<int> positives;
std::copy_if(values.begin(), values.end(), std::back_inserter(positives),
    [](auto value) { return value > 0; });
std::transform(positives.begin(), positives.end(), positives.begin(),
    [](auto value) { return value * 2; });
```

## Notes

Generic lambda parameters require C++14. Integer multiplication must stay within the representable range; signed overflow is undefined behavior.
