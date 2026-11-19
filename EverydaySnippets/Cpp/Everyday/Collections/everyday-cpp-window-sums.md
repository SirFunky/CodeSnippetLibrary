---
id: "everyday-cpp-window-sums"
language: "cpp"
title: "Calculate sliding window sums"
description: "Calculate sliding window sums."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["window-sums", "everyday", "cpp"]
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
    std::vector<std::int64_t> a{1, 2, 3, 4};
    std::size_t width = 3;
    if (!width)
        throw std::invalid_argument("width");
    std::int64_t sum = 0;
    for (std::size_t i = 0; i < a.size(); ++i) {
        sum += a[i];
        if (i >= width)
            sum -= a[i - width];
        if (i >= width - 1)
            std::cout << sum << "\n";
    }
}
```

## Notes

O(n); every intermediate sum must fit int64 to avoid signed overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
