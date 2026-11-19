---
id: "everyday-go-rotate"
language: "go"
title: "Rotate a slice by a signed offset"
description: "Rotate a slice by a signed offset."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["rotate", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	a := []int{1, 2, 3, 4}
	offset := -1
	out := []int{}
	if len(a) > 0 {
		n := offset % len(a)
		if n < 0 {
			n += len(a)
		}
		out = append(out, a[n:]...)
		out = append(out, a[:n]...)
	}
	fmt.Println(out)
}
```

## Notes

Positive left, negative right. New backing storage prevents changing the source.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
