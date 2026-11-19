---
id: "everyday-c-balanced"
language: "c"
title: "Check balanced bracket characters"
description: "Check balanced bracket characters."
category: "Validation"
subcategory: "Everyday tasks"
tags: ["balanced", "everyday", "c"]
cVersion: 11
imports: []
---

```c
#include <ctype.h>
#include <errno.h>
#include <limits.h>
#include <math.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    const char *tests[] = {"{a:[(b)]}", "([)]"};
    for (size_t t = 0; t < 2; ++t) {
        char stack[64];
        size_t top = 0;
        int ok = 1;
        for (size_t i = 0; tests[t][i]; ++i) {
            char c = tests[t][i];
            const char *close = strchr(")]}", c);
            if (strchr("([{", c)) {
                if (top == sizeof stack) {
                    ok = 0;
                    break;
                }
                stack[top++] = c;
            } else if (close) {
                size_t p = (size_t)(close - ")]}");
                if (top == 0 || stack[--top] != "([{"[p]) {
                    ok = 0;
                    break;
                }
            }
        }
        puts(ok && top == 0 ? "true" : "false");
    }
    return 0;
}
```

## Notes

Bounded stack rejects overflow. Ignores nonbrackets; does not understand quoted strings/comments.

Complete program. Required imports/headers and sample inputs are included in Copy code. Standard library only; no third-party packages. Change the sample inputs for your project. Declared versions are supported baselines, not claims that every feature first appeared there. The library never runs this program.
