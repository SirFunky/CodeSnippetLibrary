---
id: "everyday-cpp-valid-date"
language: "cpp"
title: "Validate Gregorian calendar components"
description: "Validate Gregorian calendar components."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["valid-date", "everyday", "cpp"]
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
    for (int y : {2024, 2023}) {
        int m = 2, d = 29;
        std::vector<int> days{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0))
            days[1] = 29;
        bool valid = y >= 1 && y <= 9999 && m >= 1 && m <= 12 && d >= 1 &&
                     d <= days[static_cast<std::size_t>(m - 1)];
        std::cout << std::boolalpha << valid << "\n";
    }
}
```

## Notes

Gregorian years 1–9999, no historical local-calendar transitions or time-of-day validation.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
