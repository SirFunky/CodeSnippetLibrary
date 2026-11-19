---
id: "everyday-cpp-safe-divide"
language: "cpp"
title: "Handle invalid floating-point division"
description: "Handle invalid floating-point division."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "cpp"]
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
    for (const auto &p : std::vector<std::pair<double, double>>{{10, 4}, {1, 0}}) {
        double a = p.first, b = p.second;
        if (!std::isfinite(a) || !std::isfinite(b) || b == 0) {
            std::cout << "invalid\n";
            continue;
        }
        double q = a / b;
        if (!std::isfinite(q))
            std::cout << "invalid\n";
        else
            std::cout << q << "\n";
    }
}
```

## Notes

Rejects zero/non-finite operands and non-finite results. Binary rounding still applies.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
