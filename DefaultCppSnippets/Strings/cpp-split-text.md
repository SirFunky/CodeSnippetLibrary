---
id: cpp-split-text
title: Split a delimited string
description: Split text on a single character delimiter.
language: cpp
category: Strings
subcategory: Parsing
tags:
  - string
  - split
cppVersion: 14
imports:
  - <string>
  - <sstream>
  - <vector>
---

```cpp
std::istringstream input("Ada,Linus,Grace");
std::vector<std::string> values;
std::string value;
while (std::getline(input, value, ',')) {
    values.push_back(value);
}
```

## Notes

This is not a CSV parser: quoted delimiters are not handled. Consecutive delimiters create empty fields; a trailing delimiter does not add a final empty field.
