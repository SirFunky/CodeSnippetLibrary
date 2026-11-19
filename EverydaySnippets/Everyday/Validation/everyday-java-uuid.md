---
id: "everyday-java-uuid"
language: "java"
title: "Create and validate UUID text"
description: "Create and validate UUID text."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["uuid", "everyday", "java"]
javaVersion: 8
imports: []
---

```java
import java.util.UUID;

public class Main {
    public static void main(String[] args) {
        String text = UUID.randomUUID().toString();
        UUID parsed = UUID.fromString(text);
        System.out.println(parsed.version() == 4);
        System.out.println(parsed.toString().equals(text));
    }
}
```

## Notes

Uses a random version-4 UUID. Validation by UUID.fromString alone is not an authorization or trust check; this sample round-trips generated canonical text.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
