---
id: "everyday-cpp-csv-field"
language: "cpp"
title: "Escape one CSV field"
description: "Escape one CSV field."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["csv-field", "everyday", "cpp"]
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
    std::string s = "Ada, \"A\"";
    bool quote = s.find_first_of(",\"\r\n") != std::string::npos;
    if (quote)
        std::cout << '"';
    for (char c : s) {
        if (c == '"')
            std::cout << '"';
        std::cout << c;
    }
    if (quote)
        std::cout << '"';
    std::cout << '\n';
}
```

## Notes

Quotes a comma-separated field, not a whole CSV document. Spreadsheet formula policy is separate.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
