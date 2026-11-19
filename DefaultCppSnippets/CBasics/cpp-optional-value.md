---
id: cpp-optional-value
title: Represent a possibly missing value
description: Use std::optional to make absence explicit.
language: cpp
category: C++ Basics
subcategory: Optional values
tags:
  - optional
  - find
cppVersion: 17
imports:
  - <optional>
  - <vector>
  - <algorithm>
---

```cpp
std::vector<int> values{1, 2, 3};
auto found = std::find(values.begin(), values.end(), 2);
std::optional<int> result;
if (found != values.end()) result = *found;
int value = result.value_or(0);
```

## Notes

Requires C++17. An empty optional contains no int. value_or returns a fallback without throwing; value() throws std::bad_optional_access when empty.
