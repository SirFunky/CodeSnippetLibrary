---
id: "go-sort-slice"
language: "go"
title: "Sort a cloned slice with slices"
description: "Sort a cloned slice with slices."
category: "Collections"
tags: ["sort-slice", "go"]
goVersion: "1.21"
imports: ["fmt", "slices"]
---

```go
package main

func main() {
    original := []int{10, 2, 1}
    sorted := slices.Clone(original)
    slices.Sort(sorted)
    fmt.Println(sorted)
    fmt.Println(original)
}
```

## Notes

The standard slices package requires Go 1.21. Sort changes its argument, so clone first to preserve the source. Clone is shallow for pointer-containing element types. https://go.dev/doc/go1.21 Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
