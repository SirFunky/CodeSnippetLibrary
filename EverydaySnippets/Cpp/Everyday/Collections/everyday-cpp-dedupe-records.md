---
id: "everyday-cpp-dedupe-records"
language: "cpp"
title: "Keep the first record for each ID"
description: "Keep the first record for each ID."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["dedupe-records", "everyday", "cpp"]
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
    struct Row {
        int id;
        std::string name;
    };
    const std::vector<Row> rows{{1, "Ada"}, {1, "Other"}, {2, "Linus"}};
    std::set<int> seen;
    for (const auto &row : rows)
        if (seen.insert(row.id).second)
            std::cout << row.id << ":" << row.name << "\n";
}
```

## Notes

Stable first-wins output; set lookup gives O(n log n) behavior.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
