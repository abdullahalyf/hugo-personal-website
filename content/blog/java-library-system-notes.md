---
title: "Notes from building a library system in Java"
date: 2026-10-09
summary: "What the course project taught me about classes, responsibilities and keeping data on disk."
tags: ["java", "projects"]
cover: "java-library-system-notes"
---

The Library Management System was a course project: books, members, issuing and returning, and fines. It was my first program in Java that was more than one file.

## Classes should have one job

My first version had a single large class that did everything. It worked, and I could not change anything without breaking something else. I split it:

- `Book` holds the facts about a book.
- `Member` holds a member and the books they have out.
- `Library` knows the rules: who can borrow, for how long, what the fine is.
- A small menu class only reads input and prints output.

After that, changing the fine rule meant opening one file.

## Keeping data between runs

A console program forgets everything when it closes. I saved books and members to text files and read them back at start. It was not elegant, but it showed me why a real system uses a database: I had to handle a missing file, a half-written line and two records with the same ID myself.

## Checking input

Anything the user types can be wrong. A letter where a number belongs crashed my first version. Now every read goes through a small method that asks again until the input is valid.

## What I would change

- Use an `enum` for the state of a book, instead of strings that I could mistype.
- Write a few tests for the fine calculation, since it is the part with arithmetic.
- Keep the menu code even smaller.

The project did not teach me Java syntax so much as it taught me how to divide a program into pieces that can be understood one at a time.
