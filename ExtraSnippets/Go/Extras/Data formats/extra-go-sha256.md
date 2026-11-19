---
id: "extra-go-sha256"
language: "go"
title: "Calculate a SHA-256 content fingerprint"
description: "Calculate a SHA-256 content fingerprint."
category: "Data formats"
subcategory: "Practical extras"
tags: ["sha256", "practical", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"crypto/sha256"
	"fmt"
)

func main() {
	sum := sha256.Sum256([]byte("hello"))
	fmt.Printf("%x\n", sum)
}
```

## Notes

Content fingerprint only. An unkeyed hash does not authenticate a sender and is not suitable for password storage.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
