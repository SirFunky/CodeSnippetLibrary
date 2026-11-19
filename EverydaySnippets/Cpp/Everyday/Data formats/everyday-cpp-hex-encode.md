---
id: "everyday-cpp-hex-encode"
language: "cpp"
title: "Encode bytes as hexadecimal"
description: "Encode bytes as hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-encode", "everyday", "cpp"]
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
    const std::vector<unsigned char> data{0, 15, 255};
    std::ostringstream out;
    out << std::hex << std::setfill('0');
    for (auto b : data)
        out << std::setw(2) << static_cast<unsigned int>(b);
    std::cout << out.str() << "\n";
}
```

## Notes

Stream formatting is isolated from std::cout. Representation, not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
