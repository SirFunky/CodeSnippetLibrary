---
id: "everyday-go-hex-decode"
language: "go"
title: "Validate and decode hexadecimal"
description: "Validate and decode hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-decode", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"encoding/hex"
	"fmt"
)

func main() {
	for _, s := range []string{"000fff", "0x"} {
		b, err := hex.DecodeString(s)
		if err != nil {
			fmt.Println("invalid")
			continue
		}
		fmt.Println(b)
	}
}
```

## Notes

Discard partial bytes when DecodeString reports an error.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
