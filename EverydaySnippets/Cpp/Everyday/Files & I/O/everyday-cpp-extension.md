---
id: "everyday-cpp-extension"
language: "cpp"
title: "Extract an ASCII filename extension"
description: "Extract an ASCII filename extension."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["extension", "everyday", "cpp"]
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
    std::string path = R"(C:eports\data.CSV)";
    auto sep = path.find_last_of("/\\");
    auto name = sep == std::string::npos ? path : path.substr(sep + 1);
    auto dot = name.find_last_of('.');
    std::string ext;
    if (dot != std::string::npos && dot > 0 && dot + 1 < name.size())
        ext = name.substr(dot + 1);
    for (char &c : ext)
        if (c >= 'A' && c <= 'Z')
            c = static_cast<char>(c - 'A' + 'a');
    std::cout << ext << "\n";
}
```

## Notes

Lexical slash/backslash handling; a dotfile has no extension. Does not validate contents.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
