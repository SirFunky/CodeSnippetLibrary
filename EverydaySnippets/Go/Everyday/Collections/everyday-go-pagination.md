---
id: "everyday-go-pagination"
language: "go"
title: "Calculate checked pagination bounds"
description: "Calculate checked pagination bounds."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["pagination", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	total, page, size := int64(23), int64(3), int64(10)
	if total < 0 || page < 1 || size < 1 {
		panic("invalid bounds")
	}
	start := total
	if page-1 <= total/size {
		start = (page - 1) * size
	}
	end := total
	if size < total-start {
		end = start + size
	}
	fmt.Printf("%d,%d\n", start, end)
}
```

## Notes

One-based pages, end-exclusive offsets. Bounds before multiplication avoid int64 overflow.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
