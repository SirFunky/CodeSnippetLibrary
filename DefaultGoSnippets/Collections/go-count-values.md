---
id: "go-count-values"
language: "go"
title: "Count occurrences using a map"
description: "Count occurrences using a map."
category: "Collections"
tags: ["count-values", "go"]
goVersion: "1.16"
imports: ["fmt"]
---

```go
package main

func main() {
    counts := make(map[string]int)
    for _, word := range []string{"one", "two", "one"} {
        counts[word]++
    }
    fmt.Println(counts["one"], counts["two"], counts["missing"])
}
```

## Notes

A missing integer map entry reads as zero. Map iteration order is unspecified; use explicit keys or sort keys when deterministic output is needed. Concurrent map writes need synchronization. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
