---
id: "extra-cpp-little-endian"
language: "cpp"
title: "Decode four little-endian bytes"
description: "Decode four little-endian bytes."
category: "Data formats"
subcategory: "Practical extras"
tags: ["little-endian", "practical", "cpp"]
cppVersion: 14
imports: []
---

```cpp
#include <array>
#include <cstdint>
#include <iostream>
int main() {
    const std::array<unsigned char, 4> bytes{{0x78, 0x56, 0x34, 0x12}};
    std::uint32_t value = 0;
    for (unsigned int i = 0; i < 4; ++i)
        value |= static_cast<std::uint32_t>(bytes[i]) << (8 * i);
    std::cout << std::hex << value << "\n";
}
```

## Notes

Explicit byte order avoids alignment, aliasing and host-endianness assumptions. Requires 8-bit unsigned char and uint32_t support, as on the tested Windows target. Validate length before using external buffers.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
