---
title: "Why C was a good first language for me"
date: 2026-10-01
summary: "C is small enough to hold in your head, and it makes you see what the computer is doing."
tags: ["c", "learning"]
cover: "why-i-started-with-c"
---

My first semester was programming fundamentals in C. At the time I thought of it as an old language I had to get through. A few semesters later I think it was the right place to start.

## It is small

The core of C fits in your head: variables, loops, functions, arrays, pointers, structs. There is no large library to learn before you can do something useful. When a program fails, the cause is almost always in the few lines in front of you.

## It shows you the machine

In C you decide how big an array is. You see that a string is a row of characters ending in a zero. You learn what happens when you read past the end of an array, which is that something strange happens and nothing tells you why.

That is uncomfortable, but it is the useful kind of discomfort. Later, when I used `vector` in C++ or `ArrayList` in Java, I knew what they were doing for me.

## Pointers

Pointers were the hardest part. What helped was drawing them: a box for each variable, its address written under it, an arrow from the pointer to the box it holds. When I could draw a program on paper, I could usually fix it.

## What I would tell a new student

- Type the examples yourself. Do not paste them.
- Compile with warnings turned on, and read them.
- Draw memory on paper until you stop needing to.

I use C++ and Java more often now, but when something behaves oddly, I still think about it the way C taught me to.
