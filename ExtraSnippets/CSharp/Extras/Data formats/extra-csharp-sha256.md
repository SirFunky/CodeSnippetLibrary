---
id: "extra-csharp-sha256"
language: "csharp"
title: "Calculate a SHA-256 content fingerprint"
description: "Calculate a SHA-256 content fingerprint."
category: "Data formats"
subcategory: "Practical extras"
tags: ["sha256", "practical", "csharp"]
csharpVersion: "8.0"
dotnetVersion: "8.0"
imports: []
---

```csharp
using System;
using System.Security.Cryptography;
using System.Text;
class Program {
    static void Main() {
        byte[] hash = SHA256.HashData(Encoding.UTF8.GetBytes("hello"));
        Console.WriteLine(Convert.ToHexString(hash).ToLowerInvariant());
    }
}
```

## Notes

Computes a deterministic content fingerprint with .NET 8 APIs. An unkeyed hash does not authenticate a sender and is not a password hashing scheme.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
