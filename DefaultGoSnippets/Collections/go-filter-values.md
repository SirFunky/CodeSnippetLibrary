---
id: "go-filter-values"
language: "go"
title: "Filter a slice without modifying it"
description: "Filter a slice without modifying it."
category: "Collections"
tags: ["filter-values", "go"]
goVersion: "1.16"
imports: ["fmt"]
---

```go
package main

func main() {
    values := []int{-2, 1, 0, 3}
    positives := make([]int, 0, len(values))
    for _, value := range values {
        if value > 0 { positives = append(positives, value) }
    }
    fmt.Println(positives)
    fmt.Println(values)
}
```

## Notes

Uses a separate backing array. For pointer-containing element types, copying elements would still share the pointed-to objects. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
