---
title: "Dijkstra's algorithm in plain words"
date: 2026-10-04
summary: "How I explain shortest paths on a weighted graph to myself, without the proof."
tags: ["graphs", "algorithms"]
cover: "dijkstra-in-plain-words"
---

BFS finds the fewest roads. It does not know that one road is two minutes and another is twenty. When roads have different lengths, I use Dijkstra's algorithm.

## The idea

Keep, for every junction, the shortest distance found so far. At the start, the source is 0 and everything else is infinity. Then repeat:

1. Take the unvisited junction with the smallest known distance.
2. Look at each road leaving it. If going through this junction gives a shorter distance to the neighbour, update it.
3. Mark the junction as done.

Once a junction is taken in step 1, its distance is final. That is the part I find nice: nothing found later can beat it, because every remaining route starts at a junction that is already at least as far away.

## The catch

This only holds when no road has a negative weight. A road cannot take less than zero time, so for traffic it is fine, but it is the first thing to check on a new problem.

## Making it quick

Scanning all junctions for the smallest distance each time is slow on a large graph. A priority queue, such as `priority_queue` in C++, hands over the smallest one directly. For a small junction graph either way works, and I found the simple scan easier to get right the first time.

## Getting the route, not just the distance

I also store, for each junction, the one it was reached from. After the run, I follow those links back from the destination to the source and reverse the result. Distance alone does not tell a driver where to turn.
