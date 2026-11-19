---
id: "everyday-cpp-pagination"
language: "cpp"
title: "Calculate checked pagination bounds"
description: "Calculate checked pagination bounds."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "cpp"]
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
    std::size_t total = 23, page = 3, size = 10;
    if (page < 1 || size < 1)
        throw std::invalid_argument("bounds");
    auto start = total;
    if (page - 1 <= total / size)
        start = (page - 1) * size;
    auto end = size < total - start ? start + size : total;
    std::cout << start << "," << end << "\n";
}
```

## Notes

One-based page; end-exclusive offsets. Division before multiplication avoids unsigned overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
