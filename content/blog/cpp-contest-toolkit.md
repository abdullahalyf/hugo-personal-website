---
title: "The small C++ toolkit I use in contests"
date: 2026-10-02
summary: "Four parts of the standard library cover most of what I need under time pressure."
tags: ["c++", "competitive programming"]
cover: "cpp-contest-toolkit"
---

C++ is the language I reach for in contests, mostly because of its standard library. I do not use all of it. A small set does most of the work.

## vector

A resizable array. I use it for almost everything that is a list. Remember that indexing past the end is not checked unless you use `.at()`, so a wrong index can fail quietly.

## sort

`sort(v.begin(), v.end())` sorts in `O(n log n)`. A custom comparison, written as a small lambda, lets me sort pairs by the second value or sort in descending order without extra code.

## map and set

Both keep keys in order and find a key in `O(log n)`. I use `map` for counting how often something appears and `set` for removing duplicates or asking whether a value was seen. When order does not matter, the `unordered_` versions are usually faster, but I have been caught by slow worst cases, so I use them with care.

## priority_queue

The largest item comes out first. For Dijkstra I want the smallest, so I either store negative distances or declare the queue with `greater`.

## Habits that save time

- Read input fast: turn off the sync with C stdio and untie `cin` from `cout`, or large inputs can time out.
- Use `long long` whenever a sum or product might pass about two billion. An `int` overflow gives a wrong answer with no error.
- Keep a short template file with the includes and the fast input lines, and start every problem from it.

None of this is clever. It is a short list I have repeated enough that I do not have to think about it, which leaves room to think about the problem.
