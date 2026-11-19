---
id: "go-unique-values"
language: "go"
title: "Remove duplicates with a generic function"
description: "Remove duplicates with a generic function."
category: "Generics"
tags: ["unique-values", "go"]
goVersion: "1.18"
imports: ["fmt"]
---

```go
package main

func unique[T comparable](values []T) []T {
    seen := make(map[T]struct{}, len(values))
    result := make([]T, 0, len(values))
    for _, value := range values {
        if _, exists := seen[value]; !exists {
            seen[value] = struct{}{}
            result = append(result, value)
        }
    }
    return result
}
func main() {
    fmt.Println(unique([]int{3, 1, 3, 2, 1}))
}
```

## Notes

Type parameters and comparable require Go 1.18. Preserves first occurrence order. Equality follows Go comparison rules; floating-point NaN values do not compare equal. Use concrete safely comparable inputs, especially if passing interface values. Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
