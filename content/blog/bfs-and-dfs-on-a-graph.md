---
title: "BFS and DFS: the same graph, two ways of walking it"
date: 2026-10-03
summary: "Breadth-first and depth-first search visit the same nodes in a different order, and the order decides what each is good for."
tags: ["graphs", "algorithms"]
cover: "bfs-and-dfs-on-a-graph"
---

In a group traffic rules project, the roads between junctions are a graph. Junctions are nodes and roads are edges. Two basic ways of walking that graph are breadth-first search (BFS) and depth-first search (DFS).

## BFS: ring by ring

BFS starts at one junction, visits all its neighbours, then all of their neighbours, and so on. It uses a **queue**: first in, first out.

Because it moves outward one step at a time, the first time BFS reaches a node it has used the fewest edges. So on a graph where every road counts the same, BFS gives the shortest path by number of edges.

## DFS: as far as it goes

DFS picks one road and follows it until it cannot go further, then backs up and tries another. It uses a **stack**, or the call stack when written with recursion.

It is a good fit for questions such as: can I reach this node, is there a cycle, which parts of the graph are connected to each other.

## The code is nearly the same

Swap the queue for a stack and BFS becomes DFS. That surprised me. I now think of them as one idea with one data structure changed.

## Things I got wrong

- I forgot to mark a node as visited and the program ran forever on a graph with a cycle.
- I marked nodes as visited when I took them off the queue instead of when I put them on, which made the queue grow with duplicates.

Both fixes are one line. Both cost me an evening to find.
