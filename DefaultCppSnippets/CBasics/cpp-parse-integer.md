---
id: cpp-parse-integer
title: Parse an integer without exceptions
description: Parse the complete string with std::from_chars.
language: cpp
category: C++ Basics
subcategory: Parsing
tags:
  - integer
  - parse
  - from-chars
cppVersion: 17
imports:
  - <charconv>
  - <string>
  - <system_error>
---

```cpp
std::string text = "42";
int value = 0;
auto result = std::from_chars(text.data(), text.data() + text.size(), value);
bool parsed = result.ec == std::errc{}
    && result.ptr == text.data() + text.size();
```

## Notes

Requires C++17. from_chars does not skip leading whitespace and does not accept a leading plus sign for integers. Checking the end pointer rejects trailing characters. Check parsed before using value.
