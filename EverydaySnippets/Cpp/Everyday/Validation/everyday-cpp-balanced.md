---
id: "everyday-cpp-balanced"
language: "cpp"
title: "Check balanced bracket characters"
description: "Check balanced bracket characters."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["balanced", "everyday", "cpp"]
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
    for (const std::string s : {"{a:[(b)]}", "([)]"}) {
        std::vector<char> stack;
        const std::map<char, char> pairs{{')', '('}, {']', '['}, {'}', '{'}};
        bool ok = true;
        for (char c : s) {
            if (std::string("([{").find(c) != std::string::npos)
                stack.push_back(c);
            else {
                auto it = pairs.find(c);
                if (it != pairs.end()) {
                    if (stack.empty() || stack.back() != it->second) {
                        ok = false;
                        break;
                    }
                    stack.pop_back();
                }
            }
        }
        std::cout << std::boolalpha << (ok && stack.empty()) << "\n";
    }
}
```

## Notes

Ignores other characters; does not parse quoted strings or comments.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
