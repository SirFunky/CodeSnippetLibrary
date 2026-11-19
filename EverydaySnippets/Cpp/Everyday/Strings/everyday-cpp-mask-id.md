---
id: "everyday-cpp-mask-id"
language: "cpp"
title: "Mask an ASCII identifier"
description: "Mask an ASCII identifier."
category: "Strings"
subcategory: "Everyday tasks"
tags: ["mask-id", "everyday", "cpp"]
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
    std::string s = "ABC123456";
    if (s.size() > 4)
        s.replace(0, s.size() - 4, s.size() - 4, '*');
    std::cout << s << "\n";
}
```

## Notes

Byte-based masking, not Unicode grapheme handling or encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
