---
id: "everyday-cpp-format-cents"
language: "cpp"
title: "Format signed integer cents"
description: "Format signed integer cents."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["format-cents", "everyday", "cpp"]
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
    for (std::int64_t c : {12345, -5}) {
        auto q = c / 100, r = c % 100;
        std::cout << (c < 0 ? "-" : "") << (q < 0 ? -q : q) << "." << std::setfill('0')
                  << std::setw(2) << (r < 0 ? -r : r) << "\n";
    }
}
```

## Notes

Quotient/remainder avoids negating the minimum int64 value directly. Literal decimal point.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
