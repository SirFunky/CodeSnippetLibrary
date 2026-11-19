---
id: cpp-join-text
title: Join strings with a delimiter
description: Combine names without a trailing separator.
language: cpp
category: Strings
subcategory: Formatting
tags:
  - string
  - join
cppVersion: 14
imports:
  - <string>
  - <sstream>
  - <vector>
---

```cpp
std::vector<std::string> names{"Ada", "Linus"};
std::ostringstream output;
for (std::size_t i = 0; i < names.size(); ++i) {
    if (i != 0) output << ", ";
    output << names[i];
}
std::string joined = output.str();
```

## Notes

Preserves input order. An empty vector produces an empty string. This formats text without CSV escaping.
