---
title: "Read the problem twice, then write code"
date: 2026-08-12
summary: "Most of my wrong answers in contests came from a misread statement, not a weak algorithm."
tags: ["competitive programming", "habits"]
cover: "read-the-problem-twice"
---

When I started going to contests, I treated the statement as something to skim on the way to the code. That cost me more points than any hard algorithm did.

## What went wrong

Three kinds of mistake came up again and again:

- I missed a constraint, such as `n` up to 200,000, and wrote a solution that only worked for small input.
- I solved a slightly different problem from the one asked.
- I ignored the edge cases the statement hinted at: one element, all equal, already sorted.

None of these is an algorithm mistake. All of them are reading mistakes.

## What I do now

1. Read the whole statement once without touching the keyboard.
2. Read it again and underline the limits, the input format and the output format.
3. Work through the sample by hand and check that I get the same answer.
4. Write down two or three small cases of my own, including the smallest possible input.
5. Only then decide on an approach.

The constraints do a lot of the deciding. If `n` is 200,000, a loop inside a loop is out. If `n` is 20, trying every subset is on the table. I try to read the limits before I think about the idea.

## It feels slow, and it is not

Five minutes of careful reading feels like lost time in a contest with a clock running. In practice a wrong submission costs more: the penalty, and the ten minutes spent hunting a bug that was never in the code.

I still get this wrong when I am tired or in a hurry. The habit is simple, and keeping to it is the hard part.
