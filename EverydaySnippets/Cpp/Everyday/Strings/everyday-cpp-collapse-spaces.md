---
id: "everyday-cpp-collapse-spaces"
language: "cpp"
title: "Collapse runs of whitespace"
description: "Collapse runs of whitespace."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["collapse-spaces", "everyday", "cpp"]
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
    std::istringstream input(" Ada\t Linus\nGrace ");
    std::string word;
    bool first = true;
    while (input >> word) {
        if (!first)
            std::cout << ' ';
        std::cout << word;
        first = false;
    }
    std::cout << "\n";
}
```

## Notes

Uses the stream locale whitespace rules. Do not apply to code or whitespace-sensitive data.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
