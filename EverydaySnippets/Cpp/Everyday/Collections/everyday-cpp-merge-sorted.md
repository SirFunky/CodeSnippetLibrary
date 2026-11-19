---
id: "everyday-cpp-merge-sorted"
language: "cpp"
title: "Merge sorted vectors"
description: "Merge sorted vectors."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["merge-sorted", "everyday", "cpp"]
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
    std::vector<int> a{1, 3, 5}, b{2, 3, 4}, out;
    std::merge(a.begin(), a.end(), b.begin(), b.end(), std::back_inserter(out));
    for (std::size_t i = 0; i < out.size(); ++i)
        std::cout << (i ? "," : "") << out[i];
    std::cout << "\n";
}
```

## Notes

Both inputs must be ascending. Linear merge preserves duplicates.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
