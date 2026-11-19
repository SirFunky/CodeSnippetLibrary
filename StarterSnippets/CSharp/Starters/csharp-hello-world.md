---
id: "starter-csharp-hello-world"
language: "csharp"
title: "Hello World — C#"
description: "A complete starter program to copy and adapt."
category: "Starter Templates"
subcategory: "Hello World"
tags: ["hello-world", "starter-template", "csharp"]
csharpVersion: "8.0"
dotnetVersion: "8.0"
imports: []
---

```csharp
using System;

internal static class Program
{
    private static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
```

## Notes

Outputs Hello, World! followed by a newline.

Create a console project with the .NET 8 SDK: dotnet new console -n HelloWorld. Save as Program.cs inside that project, replacing its generated source. Run: dotnet run --project HelloWorld. This uses C# 8-compatible syntax and targets .NET 8.

Use Copy code for the complete source, including any imports/headers. Use as template opens a new unsaved copy; choose your own ID/title before saving. No third-party application libraries are needed. Compiler/runtime tools are only required to run the program outside this library.
