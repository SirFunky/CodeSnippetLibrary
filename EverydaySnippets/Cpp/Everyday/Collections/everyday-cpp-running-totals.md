---
id: "everyday-cpp-running-totals"
language: "cpp"
title: "Calculate checked running totals"
description: "Calculate checked running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "cpp"]
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
    std::int64_t sum = 0;
    for (std::int64_t x : {2, -1, 4}) {
        if ((x > 0 && sum > std::numeric_limits<std::int64_t>::max() - x) ||
            (x < 0 && sum < std::numeric_limits<std::int64_t>::min() - x))
            throw std::overflow_error("sum");
        sum += x;
        std::cout << sum << "\n";
    }
}
```

## Notes

Checks signed overflow before addition.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
