---
id: "everyday-cpp-binary-search"
language: "cpp"
title: "Find a value using lower_bound"
description: "Find a value using lower_bound."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["binary-search", "everyday", "cpp"]
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
    const std::vector<int> a{1, 3, 5, 7, 9};
    auto it = std::lower_bound(a.begin(), a.end(), 7);
    if (it != a.end() && *it == 7)
        std::cout << std::distance(a.begin(), it) << "\n";
    else
        std::cout << "missing\n";
}
```

## Notes

Ascending input required; verifies equality after finding the insertion position.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
