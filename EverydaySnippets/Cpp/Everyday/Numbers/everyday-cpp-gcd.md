---
id: "everyday-cpp-gcd"
language: "cpp"
title: "Calculate the greatest common divisor"
description: "Calculate the greatest common divisor."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["gcd", "everyday", "cpp"]
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
    unsigned long a = 84, b = 30;
    while (b) {
        auto r = a % b;
        a = b;
        b = r;
    }
    std::cout << a << "\n";
}
```

## Notes

Unsigned Euclidean algorithm compatible with C++14. gcd(0,0) returns 0 by this convention.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
