---
id: "everyday-go-transpose"
language: "go"
title: "Transpose a rectangular matrix"
description: "Transpose a rectangular matrix."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["transpose", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	a := [][]int{{1, 2, 3}, {4, 5, 6}}
	width := 0
	if len(a) > 0 {
		width = len(a[0])
	}
	for _, row := range a {
		if len(row) != width {
			panic("ragged matrix")
		}
	}
	for c := 0; c < width; c++ {
		row := make([]int, len(a))
		for r := range a {
			row[r] = a[r][c]
		}
		fmt.Println(row)
	}
}
```

## Notes

Rejects ragged input; empty matrix produces no rows.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
