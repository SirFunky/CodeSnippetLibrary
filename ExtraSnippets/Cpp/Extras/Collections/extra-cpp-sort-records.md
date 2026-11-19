---
id: "extra-cpp-sort-records"
language: "cpp"
title: "Sort records by multiple fields"
description: "Sort records by multiple fields."
category: "Collections"
subcategory: "Practical extras"
tags: ["sort-records", "practical", "cpp"]
cppVersion: 14
imports: []
---

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <tuple>
#include <vector>
struct Row {
    std::string team;
    int score;
    std::string name;
};
int main() {
    std::vector<Row> rows{{"B", 10, "Linus"}, {"A", 5, "Grace"}, {"A", 9, "Ada"}};
    std::stable_sort(rows.begin(), rows.end(), [](const Row &a, const Row &b) {
        if (a.team != b.team)
            return a.team < b.team;
        return a.score > b.score;
    });
    for (const auto &row : rows)
        std::cout << row.team << ":" << row.name << ":" << row.score << "\n";
}
```

## Notes

Team ascending, score descending, original order for exact ties. The comparator must remain a strict weak ordering; stable_sort preserves equal-key order.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
