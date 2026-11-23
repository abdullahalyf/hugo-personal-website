---
title: "Arrays or linked lists: how I choose"
date: 2026-09-03
summary: "Both store a sequence. The difference shows up when you insert, search or ask for the tenth element."
tags: ["data structures", "c"]
cover: "arrays-or-linked-lists"
---

In the data structures course, arrays and linked lists came first, and the same question came with them: which one do I use?

## The short comparison

| Task | Array | Linked list |
| --- | --- | --- |
| Get item number `i` | Fast, one step | Slow, walk from the head |
| Insert at the front | Slow, shift everything | Fast, change one pointer |
| Insert in the middle | Slow, shift the rest | Fast once you hold the node |
| Memory | One block | One node per item, plus a pointer |
| Cache behaviour | Good | Poor |

## What I learned from using them

A linked list looks better on paper for inserting, but finding the place to insert still means walking the list. So the saving is smaller than the table suggests.

Arrays are also friendlier to the processor, because the items sit next to each other in memory. For most small programs I write, an array, or a `vector` in C++, is the simple and quick answer.

I reach for a linked list when:

- items are added and removed often at the ends,
- I do not know the size in advance and do not want to copy everything on growth,
- the problem is about the list itself, such as reversing it or detecting a loop.

## A mistake I made

In my first linked list I lost the head pointer while inserting, and the rest of the list was gone with no way back. Now I write the order down before touching any pointer: set the new node's `next` first, then change the old one.

Choosing a structure is mostly asking what the program does most often.
