---
id: "everyday-go-merge-sorted"
language: "go"
title: "Merge two sorted slices"
description: "Merge two sorted slices."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["merge-sorted", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	a, b := []int{1, 3, 5}, []int{2, 3, 4}
	out := []int{}
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] <= b[j] {
			out = append(out, a[i])
			i++
		} else {
			out = append(out, b[j])
			j++
		}
	}
	out = append(out, a[i:]...)
	out = append(out, b[j:]...)
	fmt.Println(out)
}
```

## Notes

Both inputs must be ascending. Linear merge preserves duplicates.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
