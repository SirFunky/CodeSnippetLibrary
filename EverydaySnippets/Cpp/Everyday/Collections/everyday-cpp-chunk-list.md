---
id: "everyday-cpp-chunk-list"
language: "cpp"
title: "Process a vector in bounded chunks"
description: "Process a vector in bounded chunks."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["chunk-list", "everyday", "cpp"]
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
    const std::vector<int> a{1, 2, 3, 4, 5};
    std::size_t width = 2;
    if (!width)
        throw std::invalid_argument("width");
    for (std::size_t i = 0; i < a.size();) {
        auto count = std::min(width, a.size() - i);
        for (std::size_t j = 0; j < count; ++j)
            std::cout << (j ? "," : "") << a[i + j];
        std::cout << "\n";
        i += count;
    }
}
```

## Notes

Processes chunks without copying. Remaining-length arithmetic avoids overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
