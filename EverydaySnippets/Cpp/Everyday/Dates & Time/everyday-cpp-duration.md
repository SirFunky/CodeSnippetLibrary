---
id: "everyday-cpp-duration"
language: "cpp"
title: "Format elapsed seconds"
description: "Format elapsed seconds."
category: "Dates & Time"
subcategory: "Everyday tasks"
tags: ["duration", "everyday", "cpp"]
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
    std::int64_t s = 3661;
    if (s < 0)
        throw std::invalid_argument("nonnegative seconds");
    std::cout << std::setfill('0') << std::setw(2) << s / 3600 << ":" << std::setw(2)
              << s % 3600 / 60 << ":" << std::setw(2) << s % 60 << "\n";
}
```

## Notes

Elapsed whole seconds, not a clock/timezone. Hours can exceed 23.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
