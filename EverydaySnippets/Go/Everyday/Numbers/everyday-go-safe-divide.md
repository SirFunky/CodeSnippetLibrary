---
id: "everyday-go-safe-divide"
language: "go"
title: "Handle invalid floating-point division"
description: "Handle invalid floating-point division."
category: "Numbers"
subcategory: "Everyday tasks"
tags: ["safe-divide", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	for _, p := range [][2]float64{{10, 4}, {1, 0}} {
		a, b := p[0], p[1]
		if b == 0 || math.IsNaN(a) || math.IsNaN(b) || math.IsInf(a, 0) || math.IsInf(b, 0) {
			fmt.Println("invalid")
			continue
		}
		x := a / b
		if math.IsInf(x, 0) || math.IsNaN(x) {
			fmt.Println("invalid")
		} else {
			fmt.Println(x)
		}
	}
}
```

## Notes

Rejects zero/non-finite operands and non-finite results; normal floating-point rounding remains.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
