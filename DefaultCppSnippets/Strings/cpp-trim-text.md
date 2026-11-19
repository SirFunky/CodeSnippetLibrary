---
id: cpp-trim-text
title: Trim surrounding whitespace
description: Remove whitespace from both ends of a string.
language: cpp
category: Strings
subcategory: Formatting
tags:
  - string
  - trim
cppVersion: 14
imports:
  - <string>
  - <algorithm>
  - <cctype>
---

```cpp
std::string text = "  Ada  ";
auto whitespace = [](unsigned char c) { return std::isspace(c) != 0; };
auto first = std::find_if_not(text.begin(), text.end(), whitespace);
auto last = std::find_if_not(text.rbegin(), text.rend(), whitespace).base();
std::string trimmed = first < last ? std::string(first, last) : std::string{};
```

## Notes

Casting each input character to unsigned char avoids undefined behavior in std::isspace. Uses the current C locale, not Unicode whitespace rules. The source string is unchanged.
