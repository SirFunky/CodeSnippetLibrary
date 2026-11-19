---
id: "everyday-cpp-partition"
language: "cpp"
title: "Partition values while preserving order"
description: "Partition values while preserving order."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["partition", "everyday", "cpp"]
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
    const std::vector<int> a{1, 2, 3, 4};
    std::vector<int> yes, no;
    std::partition_copy(a.begin(), a.end(), std::back_inserter(yes),
                        std::back_inserter(no), [](int n) { return n % 2 == 0; });
    for (const auto &row : {yes, no}) {
        for (std::size_t i = 0; i < row.size(); ++i)
            std::cout << (i ? "," : "") << row[i];
        std::cout << "\n";
    }
}
```

## Notes

partition_copy retains source order in both outputs; back inserters manage destination growth.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
