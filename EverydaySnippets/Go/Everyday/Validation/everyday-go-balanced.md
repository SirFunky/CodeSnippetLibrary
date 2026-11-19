---
id: "everyday-go-balanced"
language: "go"
title: "Check balanced bracket characters"
description: "Check balanced bracket characters."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["balanced", "everyday", "go"]
goVersion: "1.20"
imports: []
---

```go
package main

import (
	"fmt"
)

func balanced(s string) bool {
	stack := []rune{}
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
	for _, c := range s {
		switch c {
		case '(', '[', '{':
			stack = append(stack, c)
		default:
			if open, ok := pairs[c]; ok {
				if len(stack) == 0 || stack[len(stack)-1] != open {
					return false
				}
				stack = stack[:len(stack)-1]
			}
		}
	}
	return len(stack) == 0
}
func main() {
	fmt.Println(balanced("{a:[(b)]}"))
	fmt.Println(balanced("([)]"))
}
```

## Notes

Not a programming-language parser; quotes/comments are ignored.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
