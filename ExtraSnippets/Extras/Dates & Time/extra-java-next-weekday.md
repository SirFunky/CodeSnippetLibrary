---
id: "extra-java-next-weekday"
language: "java"
title: "Find the next Monday-to-Friday date"
description: "Find the next Monday-to-Friday date."
category: "Dates & Time"
subcategory: "Practical extras"
tags: ["next-weekday", "practical", "java"]
javaVersion: 8
imports: []
---

```java
import java.time.DayOfWeek;
import java.time.LocalDate;
public class Main {
    static LocalDate nextWeekday(LocalDate date) {
        LocalDate next = date.plusDays(1);
        while (next.getDayOfWeek() == DayOfWeek.SATURDAY ||
               next.getDayOfWeek() == DayOfWeek.SUNDAY)
            next = next.plusDays(1);
        return next;
    }
    public static void main(String[] args) {
        System.out.println(nextWeekday(LocalDate.of(2026, 11, 20)));
        System.out.println(nextWeekday(LocalDate.of(2026, 11, 23)));
    }
}
```

## Notes

Returns a strictly later weekday. Does not account for public holidays or local business calendars. Dates near LocalDate.MAX can throw DateTimeException when advanced.

Complete program with sample inputs and all required imports/headers. Standard library only. The app never runs this code. Declared versions are supported baselines; verification uses the toolchains documented in VERIFICATION.md.
