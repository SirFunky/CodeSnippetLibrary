---
id: "everyday-kotlin-balanced"
language: "kotlin"
title: "Check balanced bracket characters"
description: "Check balanced bracket characters."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["balanced", "everyday", "kotlin"]
kotlinVersion: "1.8"
jvmTarget: 8
imports: []
---

```kotlin
fun main()  {
    fun balanced(s:String):Boolean  {
        val stack=java.util.ArrayDeque<Char>()
        val pairs=mapOf(')' to '(',']' to '[','}' to '{')
        for(c in s) {
            if(c in "([{")stack.push(c) else if(c in pairs && (stack.isEmpty() || stack.pop()!=pairs[c]))return false
        }
        return stack.isEmpty()
    }
    println(balanced("{a:[(b)]}"))
    println(balanced("([)]"))
}
```

## Notes

Ignores nonbrackets; not a parser for quoted strings/comments.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
