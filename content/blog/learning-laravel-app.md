---
title: "What I learned building my first Laravel app"
date: 2026-06-18
summary: "Four months, one internal tool for my campus club, and a lot of things I only understood after they broke."
description: "Notes from building a lost-and-found board for my campus club with Laravel, MySQL and a bit of JavaScript."
tags: ["laravel", "php", "projects"]
cover: "laravel-app"
---

The app is a lost-and-found board for our campus club. You post an item you
found, you claim an item you lost, and club admins can hide anything that turns
out to be spam. It is not a big idea and it is not a big codebase, but it is the
first thing I shipped that other people actually used, and most of what I know
about Laravel came from making it work badly first.

## The stack was already decided

Our club president had a free hosting credit for a small VPS, and a friend in
the fourth year was using Laravel for an API. So: Laravel, MySQL, Blade, and a
`<script>` tag where I needed something interactive. No build step, no npm, no
deployment pipeline. That constraint turned out to be the best thing that
happened to me, because I had to learn what the framework does instead of what
my tooling does.

## The part that took longest: keeping it simple

My first version had a single `items` table with a `category` column that
stored a plain string. It worked until the club had 60 items, and then "Phone"
and "Phones" and "mobile phone" and "smartphone" were four different categories
and the filter page was useless.

The fix was a real `categories` table with a foreign key, and an `item_claims`
table so a claim had its own timestamps instead of a boolean on the item. That
is the whole schema change:

```php
Schema::create('item_claims', function (Blueprint $table) {
    $table->id();
    $table->foreignId('item_id')->constrained()->cascadeOnDelete();
    $table->foreignId('claimed_by')->constrained('users')->cascadeOnDelete();
    $table->text('note')->nullable();
    $table->timestamps();

    $table->unique(['item_id', 'claimed_by']);
});
```

Two tables and one unique constraint later, the filter page was a single
`where('category_id', $request->integer('category'))`. I had been writing the
filter in raw SQL for an afternoon.

## What actually broke

Three things, in order of how long they took me to fix:

1. **Mass assignment.** A user posted an item and quietly set `claimed_by` to
   their own account. `fillable` was missing from the model, so every column
   was writable. It took me a week to notice because nothing looked wrong.
2. **The `N+1` problem.** The item list ran 40 queries for 20 items because I
   accessed `$item->user->name` inside the loop. Adding `->with('user')` cut the
   page from 240ms to 30ms. I noticed it because the dev tools network tab
   looked like a staircase.
3. **A cron job that silently failed.** A scheduled command cleared expired
   claims every hour. It worked in local development because I ran it by hand,
   and failed in production because the `schedule:run` cron entry was missing.
   The fix was one line of server config and a log line, but I lost two weeks of
   data before I looked at the logs properly.

## What I would tell my past self

- Write down the schema in plain text before you write the migration. Every
  bad decision I made came from a table I had never described out loud.
- Add `fillable` to every model on the day you create it, not the day you find
  the bug.
- Check the network tab before you optimise anything. Half the time I was
  guessing wrong about where the time went.
- Ship the smallest version first. The version that exists and has 12 users is
  worth more than the version in my notes with a nicer UI and zero users.

![The board as it looks now: a filter column on the left and a grid of item cards on the right.](blog/laravel-app-body.jpg)

The club still uses it. It has 214 items on it right now, and I check the claims
list more often than I check my own coursework.
