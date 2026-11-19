---
id: "everyday-go-parse-flag"
language: "go"
title: "Parse a configuration boolean"
description: "Parse a configuration boolean."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["parse-flag", "everyday", "go"]
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
	for _, s := range []string{"true", "maybe"} {
		b, err := strconv.ParseBool(s)
		if err != nil {
			fmt.Println("invalid")
		} else {
			fmt.Println(b)
		}
	}
}
```

## Notes

ParseBool accepts its documented true/false/1/0 spellings, not yes/no or surrounding spaces.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
