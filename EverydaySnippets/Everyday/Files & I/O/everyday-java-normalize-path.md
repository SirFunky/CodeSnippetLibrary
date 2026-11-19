---
id: "everyday-java-normalize-path"
language: "java"
title: "Normalize a path without accessing the filesystem"
description: "Normalize a path without accessing the filesystem."
category: "Files & I/O"
subcategory: "Everyday tasks"
tags: ["normalize-path", "everyday", "java"]
javaVersion: 8
imports: []
---

```java
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("reports", "drafts", "..", "final.txt").normalize();
        System.out.println(path.toString().replace('\\', '/'));
    }
}
```

## Notes

normalize is lexical: it does not resolve symbolic links, check existence or establish that a path is safe to access. Do not use it as a path-traversal defense.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
