---
id: "everyday-cpp-transpose"
language: "cpp"
title: "Transpose a rectangular matrix"
description: "Transpose a rectangular matrix."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["transpose", "everyday", "cpp"]
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
    std::vector<std::vector<int>> rows{{1, 2, 3}, {4, 5, 6}};
    auto width = rows.empty() ? 0 : rows[0].size();
    for (const auto &row : rows)
        if (row.size() != width)
            throw std::invalid_argument("ragged matrix");
    for (std::size_t c = 0; c < width; ++c) {
        for (std::size_t r = 0; r < rows.size(); ++r)
            std::cout << (r ? "," : "") << rows[r][c];
        std::cout << "\n";
    }
}
```

## Notes

Ragged matrices rejected; empty input yields no rows.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
