---
id: "everyday-java-decimal-rounding"
language: "java"
title: "Round decimal text with an explicit policy"
description: "Round decimal text with an explicit policy."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["decimal-rounding", "everyday", "java"]
javaVersion: 8
imports: []
---

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        BigDecimal value = new BigDecimal("12.345");
        System.out.println(value.setScale(2, RoundingMode.HALF_UP).toPlainString());
        System.out.println(
            new BigDecimal("-0.005").setScale(2, RoundingMode.HALF_UP).toPlainString());
    }
}
```

## Notes

Construct BigDecimal from decimal text, not a binary floating-point value. HALF_UP is an explicit example policy; choose the rounding rule required by your application. Invalid text throws NumberFormatException.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
