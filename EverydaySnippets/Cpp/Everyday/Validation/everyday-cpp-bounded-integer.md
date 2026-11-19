---
id: "everyday-cpp-bounded-integer"
language: "cpp"
title: "Parse a bounded decimal integer"
description: "Parse a bounded decimal integer."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "cpp"]
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
    for (const std::string s : {"42", "42x", "999", "999999999999999999999"}) {
        try {
            if (!std::regex_match(s, std::regex("[+-]?[0-9]+")))
                throw std::invalid_argument("syntax");
            std::size_t used = 0;
            long n = std::stol(s, &used, 10);
            if (used != s.size() || n < 0 || n > 100)
                throw std::out_of_range("bounds");
            std::cout << n << "\n";
        } catch (const std::invalid_argument &) {
            std::cout << "invalid\n";
        } catch (const std::out_of_range &) {
            std::cout << "invalid\n";
        }
    }
}
```

## Notes

Handles syntax, conversion overflow and inclusive range failures. Does not accept partial parses.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
