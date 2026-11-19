---
id: "extra-go-wrapped-error"
language: "go"
title: "Recognize an error through wrapping"
description: "Recognize an error through wrapping."
category: "Errors"
subcategory: "Practical extras"
tags: ["wrapped-error", "practical", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"errors"
	"fmt"
)

var ErrMissing = errors.New("missing record")

func lookup() error { return fmt.Errorf("lookup customer: %w", ErrMissing) }
func main() {
	err := lookup()
	fmt.Println(errors.Is(err, ErrMissing))
	fmt.Println(errors.Is(err, errors.New("missing record")))
}
```

## Notes

Use %w to preserve error identity through wrapping and errors.Is to inspect it. A new error with the same message is a different sentinel; do not compare error strings.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
