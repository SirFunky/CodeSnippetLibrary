---
id: "everyday-go-window-sums"
language: "go"
title: "Calculate sliding window sums"
description: "Calculate sliding window sums."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["window-sums", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	a := []int64{1, 2, 3, 4}
	width := 3
	if width < 1 {
		panic("positive width required")
	}
	var sum int64
	out := []int64{}
	for i, n := range a {
		sum += n
		if i >= width {
			sum -= a[i-width]
		}
		if i >= width-1 {
			out = append(out, sum)
		}
	}
	fmt.Println(out)
}
```

## Notes

All intermediate sums must fit int64. Width beyond input yields an empty result.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
