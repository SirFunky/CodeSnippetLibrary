---
id: "everyday-cpp-hex-decode"
language: "cpp"
title: "Validate and decode hexadecimal"
description: "Validate and decode hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-decode", "everyday", "cpp"]
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
    for (const std::string s : {"000fff", "0x"}) {
        if (s.size() % 2 || !std::regex_match(s, std::regex("[0-9a-fA-F]*"))) {
            std::cout << "invalid\n";
            continue;
        }
        for (std::size_t i = 0; i < s.size(); i += 2)
            std::cout << (i ? "," : "") << std::stoul(s.substr(i, 2), nullptr, 16);
        std::cout << "\n";
    }
}
```

## Notes

Validates the entire even-length input before converting two-digit components.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
