---
id: "extra-csharp-utc-roundtrip"
language: "csharp"
title: "Preserve an offset timestamp in round-trip format"
description: "Preserve an offset timestamp in round-trip format."
category: "Dates & Time"
subcategory: "Practical extras"
tags: ["utc-roundtrip", "practical", "csharp"]
csharpVersion: "8.0"
dotnetVersion: "8.0"
imports: []
---

```csharp
using System;
using System.Globalization;
class Program {
    static void Main() {
        var value = new DateTimeOffset(2026, 11, 19, 14, 30, 0, TimeSpan.FromHours(2));
        string saved = value.ToString("O", CultureInfo.InvariantCulture);
        var restored =
            DateTimeOffset.ParseExact(saved, "O", CultureInfo.InvariantCulture);
        Console.WriteLine(restored.UtcDateTime.ToString("yyyy-MM-dd HH:mm:ss",
                                                        CultureInfo.InvariantCulture));
        Console.WriteLine(
            restored.Offset.TotalHours.ToString(CultureInfo.InvariantCulture));
    }
}
```

## Notes

Round-trip format preserves offset and fractional precision. An offset is not a timezone with historical/daylight-saving rules. ParseExact throws FormatException on invalid persisted text.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
