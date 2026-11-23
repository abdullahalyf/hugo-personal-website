---
title: "Sorting: what stuck after writing it by hand"
date: 2026-10-05
summary: "Bubble sort, merge sort and quick sort taught me different things, mostly about how cost grows with input size."
tags: ["algorithms", "c"]
cover: "sorting-what-stuck"
---

We wrote several sorting algorithms by hand in the course. I could have called a library function each time, but writing them showed me things a function call never would.

## Bubble sort

Compare neighbours, swap if they are in the wrong order, repeat. It is easy to write and easy to be right about. It is also slow: the work grows with the square of the input. At a few hundred items I did not notice. At a hundred thousand I did.

## Merge sort

Split the array in half, sort each half, merge the two sorted halves. The merge step is where I made my mistakes: forgetting to copy the leftover items once one half ran out. It needs extra memory, but the running time is steady whatever the input looks like.

## Quick sort

Pick a pivot, put smaller items on one side and larger on the other, then sort each side. It is usually fast and works in place. The pivot is the weak point: on an already sorted array, always picking the first item gives the slow worst case. Picking the middle item, or a random one, avoids that.

## What I take from it

- "How does the time grow when the input doubles?" is the question to ask, not "how long did it take?".
- Test on sorted, reverse-sorted and all-equal input. That is where sorting code breaks.
- In a contest I use the library sort. I write my own only when I need to understand or change what it does.

Writing each one once was worth it. I now read a running time as a statement about the algorithm, not about my laptop.
