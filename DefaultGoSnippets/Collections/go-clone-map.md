---
id: "go-clone-map"
language: "go"
title: "Clone a map before updating it"
description: "Clone a map before updating it."
category: "Collections"
tags: ["clone-map", "go"]
goVersion: "1.21"
imports: ["fmt", "maps"]
---

```go
package main

func main() {
    original := map[string]int{"Ada": 37}
    updated := maps.Clone(original)
    updated["Ada"] = 38
    fmt.Println(original["Ada"], updated["Ada"])
}
```

## Notes

The standard maps package requires Go 1.21. Clone is shallow and retains nil for nil input; allocate a map before writing if the input may be nil. No map is safe for unsynchronized concurrent writes. https://go.dev/doc/go1.21 Standard library only. This is a complete main package; Copy with imports inserts the required imports after package main.
