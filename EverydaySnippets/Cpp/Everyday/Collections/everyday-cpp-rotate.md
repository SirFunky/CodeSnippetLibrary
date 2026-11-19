---
id: "everyday-cpp-rotate"
language: "cpp"
title: "Rotate a vector by a signed offset"
description: "Rotate a vector by a signed offset."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["rotate", "everyday", "cpp"]
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
    std::vector<int> a{1, 2, 3, 4};
    int offset = -1;
    if (!a.empty()) {
        const auto n = static_cast<int>(a.size());
        int shift = offset % n;
        if (shift < 0)
            shift += n;
        std::rotate(a.begin(), a.begin() + shift, a.end());
    }
    for (std::size_t i = 0; i < a.size(); ++i)
        std::cout << (i ? "," : "") << a[i];
    std::cout << "\n";
}
```

## Notes

In-place left rotation, negative offsets right. Precondition: vector length fits int for this offset representation.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
