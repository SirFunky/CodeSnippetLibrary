---
id: "everyday-go-bounded-integer"
language: "go"
title: "Parse a bounded decimal integer"
description: "Parse a bounded decimal integer."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["bounded-integer", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	for _, s := range []string{"42", "42x", "999"} {
		n, err := strconv.ParseInt(s, 10, 32)
		if err != nil || n < 0 || n > 100 {
			fmt.Println("invalid")
		} else {
			fmt.Println(n)
		}
	}
}
```

## Notes

Base 10, signed 32-bit parse, inclusive bounds. Rejects partial input and whitespace.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
