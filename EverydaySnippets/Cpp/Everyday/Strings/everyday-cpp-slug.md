---
id: "everyday-cpp-slug"
language: "cpp"
title: "Create an ASCII slug"
description: "Create an ASCII slug."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["slug", "everyday", "cpp"]
cppVersion: 14
imports: []
---

```cpp
#include <algorithm>
#include <cmath>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <limits>
#include <locale>
#include <map>
#include <numeric>
#include <regex>
#include <set>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

int main() {
    std::string s = " Ada Lovelace! ";
    for (char &c : s)
        if (c >= 'A' && c <= 'Z')
            c = static_cast<char>(c - 'A' + 'a');
    s = std::regex_replace(s, std::regex("[^a-z0-9]+"), "-");
    s = std::regex_replace(s, std::regex("^-+|-+$"), "");
    std::cout << s << "\n";
}
```

## Notes

ASCII slug only; non-ASCII letters removed. Uniqueness must be handled separately.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
