---
id: "extra-java-base64-text"
language: "java"
title: "Round-trip UTF-8 text through Base64"
description: "Round-trip UTF-8 text through Base64."
category: "Data formats"
subcategory: "Practical extras"
tags: ["base64-text", "practical", "java"]
javaVersion: 8
imports: []
---

```java
import java.nio.charset.StandardCharsets;
import java.util.Base64;
public class Main {
    public static void main(String[] args) {
        String encoded = Base64.getEncoder().encodeToString(
            "Hello".getBytes(StandardCharsets.UTF_8));
        System.out.println(encoded);
        System.out.println(
            new String(Base64.getDecoder().decode(encoded), StandardCharsets.UTF_8));
        try {
            Base64.getDecoder().decode("!");
        } catch (IllegalArgumentException e) {
            System.out.println("invalid");
        }
    }
}
```

## Notes

Uses the basic Base64 alphabet. Invalid encoded text throws IllegalArgumentException. Base64 is representation, not encryption; decoded arbitrary bytes are not necessarily valid UTF-8.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
