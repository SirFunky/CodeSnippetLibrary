---
id: cpp-unique-pointer
title: Manage ownership with a unique pointer
description: Allocate an object with exclusive RAII ownership.
language: cpp
category: Memory management
subcategory: Smart pointers
tags:
  - memory
  - unique-ptr
  - raii
cppVersion: 14
imports:
  - <memory>
  - <string>
---

```cpp
auto name = std::make_unique<std::string>("Ada");
auto length = name->size();
```

## Notes

std::make_unique requires C++14. The object is destroyed automatically when the pointer leaves scope. unique_ptr cannot be copied; move it to transfer ownership. Prefer a normal local object when dynamic allocation is unnecessary.
