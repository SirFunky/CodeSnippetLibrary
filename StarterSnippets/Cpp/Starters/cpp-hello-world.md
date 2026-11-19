---
id: "starter-cpp-hello-world"
language: "cpp"
title: "Hello World — C++"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "cpp"]
cppVersion: 14
imports: []
---

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!\n";
    return 0;
}
```

## Notes

Outputs Hello, World! followed by a newline.

Save as main.cpp. With Visual Studio C++ Build Tools, open a Developer Command Prompt and compile: cl /EHsc /std:c++14 main.cpp /Fe:hello.exe. Run: hello.exe. With GCC: g++ -std=c++14 main.cpp -o hello. Standard library only.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
