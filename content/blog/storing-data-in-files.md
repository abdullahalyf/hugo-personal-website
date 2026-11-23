---
title: "Storing data in files for a console application"
date: 2026-10-06
summary: "The Hospital Management System kept everything in files. Here is what that taught me about why databases exist."
tags: ["c++", "projects"]
cover: "storing-data-in-files"
---

A hospital management system, built with a classmate, is a C++ console program that keeps patients, doctors, appointments and billing. It has no database. Every record lives in a file on disk.

## How it works

Each kind of record has its own file. One line is one record, with the fields separated by a character that cannot appear in a name. At start the program reads the files into memory. When something changes, it writes the file back.

## What I had to deal with myself

- **Finding a record.** To look up one patient, the program reads through the file until it finds the ID. That is fine for fifty patients and would be slow for fifty thousand.
- **Unique IDs.** Nothing stops me from giving two patients the same ID, so my code has to check.
- **Updating one line.** A text file cannot change one line in place. I rewrite the whole file, or write a new one and replace the old.
- **Crashes.** If the program stops half way through writing, the file is left half written. I write to a temporary file first and rename it when it is complete.
- **Linked data.** An appointment refers to a patient and a doctor. If I delete the patient, the appointment points at nothing.

## What it taught me

Each item on that list is something a database does for you: indexes, unique keys, safe updates, transactions, relationships between tables. I could have read that in a textbook. Hitting each problem in my own program made it stick.

I would not build a real system this way. For learning, it was one of the most useful projects I did.
