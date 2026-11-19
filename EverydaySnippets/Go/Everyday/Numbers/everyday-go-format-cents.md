---
id: "everyday-go-format-cents"
language: "go"
title: "Format signed integer cents"
description: "Format signed integer cents."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["format-cents", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func main() {
	for _, c := range []int64{12345, -5} {
		sign := ""
		q, r := c/100, c%100
		if c < 0 {
			sign = "-"
			q = -q
			r = -r
		}
		fmt.Printf("%s%d.%02d\n", sign, q, r)
	}
}
```

## Notes

Quotient/remainder approach also handles minimum int64 without negating it directly. Literal decimal point.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
