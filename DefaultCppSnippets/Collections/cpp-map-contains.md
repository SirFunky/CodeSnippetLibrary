---
id: cpp-map-contains
title: Check whether a map contains a key
description: Test for a key without inserting it.
language: cpp
category: Collections
subcategory: Maps
tags:
  - map
  - contains
cppVersion: 20
imports:
  - <unordered_map>
  - <string>
---

```cpp
std::unordered_map<std::string, int> ages{{"Ada", 36}};
bool known = ages.contains("Ada");
```

## Notes

Requires C++20. contains does not insert a missing key. For earlier standards, compare find(key) with end().
