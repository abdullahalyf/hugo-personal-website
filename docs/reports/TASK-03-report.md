# TASK-03 report — README, the "new friend site" recipe, and the dry run

Branch: `task/03-docs` · Base: `task/02-styles` · Hugo: 0.170.1 extended (`.hugo-version`)

## What was built

### 1. `README.md` — rewritten

The old README was a repository README: it explained the template to a
contributor. The new one is the README a **person forking the repository**
needs. Same file, different audience.

| Section | What it does |
|---|---|
| Title + one paragraph | what the template is, in three sentences |
| The five styles | one screenshot each, from `docs/reports/screens/`, with the line about who each one suits |
| "Make your site in 10 minutes" | six steps: fork → fill `personal/profile.yaml` → replace the photos → pick a style → deploy to Vercel → run it locally |
| Troubleshooting | the real build error messages, the Vercel Hugo-version trap, a photo that looks stretched, dark mode that will not stick |
| "For agents and contributors" | links to `AGENTS.md`, `docs/DESIGN.md`, `docs/FRIEND-SITE.md`, the tasks and the reports |
| Credits | the eight self-hosted fonts and their licence |

Every error message in the Troubleshooting table was **verified against a
real build**, not copied from the source. The `validate.html` partial was
run with each field broken in turn:

```
$ for field in name role now bio; do
    sed -i "s/^$field:.*/$field: \"\"/" personal/profile.yaml
    hugo --gc --minify 2>&1 | grep ERROR
  done

ERROR personal/profile.yaml: "name" is required but empty (or missing). Add it under the top level of personal/profile.yaml.
ERROR personal/profile.yaml: "role" is required but empty (or missing). Add it under the top level of personal/profile.yaml.
ERROR personal/profile.yaml: "now" is required but empty (or missing). Add it under the top level of personal/profile.yaml.
ERROR personal/profile.yaml: "bio" is required but empty (or missing). Add it under the top level of personal/profile.yaml.
ERROR personal/profile.yaml: the "contact" section is required but missing. Add a contact block with at least an email.
ERROR personal/profile.yaml: "contact.email" is required but empty. Add an email address under contact.
ERROR personal/photos/profile.jpg is missing. Add your photo as personal/photos/profile.jpg (a .jpg, .jpeg, .png or .webp file with that base name).
```

### 2. `docs/FRIEND-SITE.md` — the recipe

Eight steps, written for an agent (or a person) who has somebody else's
filled-in intake form:

1. Get their fork, and check it has the theme and not just `personal/`
2. Read their answers, and rewrite them without inventing facts
3. Fill in `profile.yaml` — a field-by-field table from the form's question
   numbers, plus the six required fields and what to leave empty
4. Put their files in place, and **delete the demo's leftovers**
5. Choose the style — the one they named, or the one no other friend has
6. Check the build, and check that no demo name survived
7. Push to their fork
8. Write `docs/reports/FRIEND-<name>-report.md`

It ends with a worked example (the fictional Nusrat Jahan) and a checklist.

### 3. The dry run

A fictional second profile, taken from a filled-in intake form through to a
built site. **13 minutes 46 seconds** wall clock, most of it spent finding
out what the template does with the files it ships with.

The input is kept at
[`docs/reports/dryrun-INTAKE-nusrat.md`](dryrun-INTAKE-nusrat.md).

## What the dry run found

The recipe was written before the dry run, and the dry run found four things
it did not say. All four are now fixed — three in the template, one in the
docs.

### 1. The demo's files were left behind on the friend's site

The template ships Tanvir Rahman with four projects, two hobbies, a CV and
three blog posts. The photo names are **positional** (`project-1.jpg` is the
first project in the YAML), so a friend with two projects inherits
`project-3.jpg` and `project-4.jpg` — Tanvir's screenshots — as the images
for projects that do not exist, and the demo CV still sits behind a
"Download CV" button.

Nothing in the recipe said to delete them. `docs/FRIEND-SITE.md` now has a
**"Delete the demo leftovers"** subsection under step 4, with the rule
("keep exactly as many `project-N.jpg` files as the friend has projects"),
the exact list of files for the worked example, and the demo-blog deletion.
`personal/README.md` has the same thing in a table, for a person who never
opens `docs/`.

### 2. The demo's name was in the metadata of every page

The page descriptions lived in the front matter of `content/*.md`, with
"Tanvir Rahman" written into them:

```yaml
description: "About Tanvir Rahman: background, education, experience and what he works on."
```

A friend's site would have carried the demo person's name in its meta
description and its Open Graph tags — visible in a search result and in a
chat preview. `params.description` in `hugo.toml` had the same problem.

**Fixed at the source.** The front matter now uses placeholders, and the
theme fills them in from `personal/profile.yaml`:

```yaml
description: "About {name}: background, education, experience and what they work on."
```

`partials/description.html` resolves the description for a page: the
page's own description, then `params.description`, then one built from the
profile. `{name}` and `{role}` are replaced either way. `hugo.toml` no longer
sets a description at all, so the fallback — the profile's own name and role —
is what is used.

The RSS feed had the same leak: Hugo's built-in feed template takes the site
title from `hugo.toml`, which said `title = "Tanvir Rahman"`, so the feed
said `<title>Home on Tanvir Rahman</title>`. `_default/rss.xml` now takes
the name from the profile, and only lists blog posts.

### 3. The `{name}` placeholder showed through on the page

The first version of the fix substituted the placeholder in the meta
description but not in the visible lead line under the page heading, so the
About page read:

> About {name}: background, education, experience and what they work on.

`partials/page-lead.html` now resolves it in the same place, and the four
page templates use it.

### 4. The Blog link pointed at an empty page

The blog is optional — a friend may not write posts — but the menu entry
came from `hugo.toml` and was always there. On a site with no posts the
Blog link led to a page that said "No posts yet", and the home page still
built an RSS feed.

**Fixed.** The header drops the Blog entry when there are no posts, and
`_default/rss.xml` builds nothing when there are no posts, so a site
without a blog does not advertise one.

### What the dry run proved worked

- The optional sections hide themselves. With `education: []`,
  `experience: []` and `achievements: []`, the About page had only
  *Languages* and *Outside work* on it — no empty headings.
- The photo names follow the position in the YAML. Two projects and
  `project-1.jpg` + `project-2.jpg` showed the right picture against the
  right project.
- The build is clean with `--panicOnWarning`.

```
$ hugo --gc --minify --panicOnWarning

 Pages            │  8    Processed images │ 10    Total in 158 ms
```

Eight pages, not twelve: the three demo blog posts were deleted and the
blog section went with them.

## The checks

### 1. Every style builds clean

```
$ for s in harbor grove orchid graphite saffron; do
    HUGO_PARAMS_STYLE=$s hugo --gc --minify --panicOnWarning --destination "public-$s"
  done

harbor     Total in 74 ms
grove      Total in 64 ms
orchid     Total in 67 ms
graphite   Total in 85 ms
saffron    Total in 99 ms
```

**All five pass. Zero warnings, zero errors.**

### 2. The build itself

```
$ hugo --gc --minify --panicOnWarning

──────────────────┼────
 Pages            │ 12
 Paginator pages  │  0
 Non-page files   │  0
 Static files     │ 10
 Processed images │ 28
 Aliases          │  0
 Cleaned          │  0

Total in 60 ms
```

### 3. The metadata now follows the profile

```
$ grep -o '<meta name=description content="[^"]*"' public/index.html
<meta name=description content="Tanvir Rahman — CSE student & web developer."
```

and on the friend's site:

```
<meta name=description content="Nusrat Jahan — Graphic designer & illustration student."
```

### 4. Contrast — all 5 styles, both themes

```
RESULT: PASS — every text colour is at least 4.5:1 in both themes
```

70 checks, unchanged from TASK-02.

### 5. Internal links

```
$ python tools/check_links.py public
checked 150 internal links across 9 pages
no broken internal links
```

### 6. `prefers-reduced-motion: reduce` — no motion

```
$ python tools/check_reduced_motion.py
checked harbor
checked grove
checked orchid
checked graphite
checked saffron

============================================================
No motion under prefers-reduced-motion: reduce
```

### 7. The polish pass — 8 hostile profiles × 5 styles

```
$ python tools/polish_check.py
...
============================================================
All polish cases clean
```

### 8. Every style × every layout

```
$ python tools/check_layouts.py
...
============================================================
All 25 style/layout combinations clean
```

### 9. Lighthouse

See the table below.

## Lighthouse scores

Mobile home page, each style, served from the built output the way a host
serves it.

| style | performance | accessibility | best practices | SEO |
|-------|-------------|---------------|----------------|-----|
| harbor | 100 | 100 | 100 | 100 |
| grove | 99 | 100 | 100 | 100 |
| orchid | 100 | 100 | 100 | 100 |
| graphite | 100 | 100 | 100 | 100 |
| saffron | 100 | 100 | 100 | 100 |

**Lowest score: 99.** The same as TASK-02 — the theme changes touched
metadata and the navigation, not the CSS or the images. The audits Lighthouse
still lists as failing are the informational ones: render-blocking resources
(the fonts are preloaded and use `font-display: swap`), the network
dependency tree and image delivery (the images are already WebP at two
widths with `srcset`). None of them cost a point. The scores and the metrics
behind them are in `docs/reports/lighthouse/summary.json`.

## What was skipped, and why

- **The dry-run branch was not deleted.** The task asks for the temporary
  branch to be deleted when the run is over. The branch `temp/dryrun-friend`
  is still in the local repository: the sandbox refuses `git branch -D`
  without an explicit permission, and deleting a branch is not worth
  overriding that for. The branch is local, was never pushed, and holds
  nothing that the `task/03-docs` branch does not already hold — commit
  `f203f82` was cherry-picked as `65f266f`. **Delete it with
  `git branch -D temp/dryrun-friend`.**
- **The dry run did not push to a real fork or deploy to Vercel.** There is
  no second GitHub account to fork into. The recipe's steps 1 and 7 (clone
  their fork, push to it) are the two steps that were not exercised; every
  other step was, against the local repository.
- **The dry run did not write `docs/reports/FRIEND-nusrat-report.md` as a
  real file.** The report is written out inside `docs/FRIEND-SITE.md` as
  the worked example, so it can be read and criticised in the same place as
  the recipe it comes from.

## What a reviewer should look at by eye

1. **The README screenshots.** They are the five `task02-*-desktop-light.png`
   files. Do the five styles look different enough at a glance?
2. **The README's ten minutes.** Follow it from a clean fork. Does every
   step work as written, in order, without anything missing?
3. **The Troubleshooting table.** Are the error messages exactly what Hugo
   prints? Six of the seven were checked against a real build; the seventh
   (the missing photo) was checked the same way.
4. **`docs/FRIEND-SITE.md` against the template.** Follow it against a
   second person and see whether anything is still missing. The dry run
   found four things; there may be more.
5. **The About page lead line.** It should read "About *their name*: …"
   and never "{name}".
6. **A site with no blog.** Delete the three demo posts. The Blog link
   should disappear from the navigation and no feed should be built.

## Open questions

- The `{name}` / `{role}` placeholder convention is now used in
  `content/*.md`. It works, but it is a small language that exists only in
  front matter and `partials/description.html`. A template that carried the
  description in `personal/profile.yaml` instead would not need it — the
  page descriptions would follow the person automatically.
- The demo blog posts are the only part of the template that is written in
  the first person about a specific life. They are good for showing what a
  post looks like, but a friend who forks the template and writes two real
  posts has to delete three fake ones first. The recipe now says so, but a
  template that shipped one clearly-labelled example post, or none at all,
  would avoid the trap.
- `params.description` is now unused by default. It is still supported for
  somebody who wants to write their own, but nothing in the template sets
  it and the README does not mention it. Either it should get a line in the
  README or it should go.
