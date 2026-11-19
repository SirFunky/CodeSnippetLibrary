---
id: "everyday-go-hex-encode"
language: "go"
title: "Encode bytes as hexadecimal"
description: "Encode bytes as hexadecimal."
category: "Data formats"
subcategory: "Everyday tasks"
tags: ["hex-encode", "everyday", "go"]
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
	fmt.Println(hex.EncodeToString([]byte{0, 15, 255}))
}
```

## Notes

Reversible encoding, not encryption.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
