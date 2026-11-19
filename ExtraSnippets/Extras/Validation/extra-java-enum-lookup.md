---
id: "extra-java-enum-lookup"
language: "java"
title: "Parse an enum with an explicit fallback"
description: "Parse an enum with an explicit fallback."
category: "Validation"
subcategory: "Practical extras"
tags: ["enum-lookup", "practical", "java"]
javaVersion: 8
imports: []
---

```java
import java.util.Locale;
public class Main {
    enum Status { PENDING, PAID, UNKNOWN }
    static Status parse(String text) {
        if (text == null)
            return Status.UNKNOWN;
        try {
            return Status.valueOf(text.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            return Status.UNKNOWN;
        }
    }
    public static void main(String[] args) {
        System.out.println(parse(" paid "));
        System.out.println(parse("missing"));
        System.out.println(parse(null));
    }
}
```

## Notes

Locale-independent matching with a deliberate UNKNOWN fallback. Distinguish unknown input from a valid business state if your domain requires an error instead.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
