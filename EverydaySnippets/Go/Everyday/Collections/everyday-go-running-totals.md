---
id: "everyday-go-running-totals"
language: "go"
title: "Calculate running totals"
description: "Calculate running totals."
category: "Collections"
subcategory: "Everyday tasks"
tags: ["running-totals", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	sum := int64(0)
	out := []int64{}
	for _, n := range []int64{2, -1, 4} {
		sum += n
		out = append(out, sum)
	}
	fmt.Println(out)
}
```

## Notes

Input and every intermediate sum must fit int64; add checked arithmetic for untrusted large values.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
