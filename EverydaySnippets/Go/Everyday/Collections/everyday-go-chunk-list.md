---
id: "everyday-go-chunk-list"
language: "go"
title: "Split a slice into copied chunks"
description: "Split a slice into copied chunks."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["chunk-list", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	a := []int{1, 2, 3, 4, 5}
	size := 2
	if size < 1 {
		panic("positive size required")
	}
	for i := 0; i < len(a); {
		n := size
		if n > len(a)-i {
			n = len(a) - i
		}
		chunk := append([]int(nil), a[i:i+n]...)
		fmt.Println(chunk)
		i += n
	}
}
```

## Notes

Copies each chunk, avoiding shared slice backing arrays. Element references would still be shared.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
