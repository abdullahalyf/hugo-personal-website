# FRIEND-SITE.md — the recipe for building somebody else's site

This is the recipe for an agent (or a person) who is building a personal
website for a friend, using this template.

**The rule that matters most: do not invent anything.** Every word on the
site has to come from the friend's own answers. If they did not answer
something, leave it empty — the site hides the section — and list it in the
report at the end. A site with three honest sections is better than a site
with seven sections somebody made up.

---

## What you get

Two things:

1. The friend's filled-in copy of `docs/INTAKE-FORM.md` — their answers, in
   Bangla or English, however they wrote them.
2. Their photos: a portrait, optionally a CV, optionally photos for their
   projects and hobbies.

## What you produce

1. Their fork of this repository, with `personal/` filled in.
2. A report at `docs/reports/FRIEND-<name>-report.md`.

---

## Step 1 — get their fork

Ask the friend to fork the repository on GitHub and give you the URL. Their
username is question 24 on the intake form.

```bash
git clone https://github.com/<their-username>/<their-repo>.git
cd <their-repo>
```

Do not work in this repository. Every friend gets their own fork, and their
content goes into their fork.

Check that the fork has the theme and the template, not just the `personal/`
folder:

```bash
ls themes/folio/layouts/ hugo.toml .hugo-version
```

If those are missing, their fork was made from the wrong base — ask them to
re-fork from `abdullahalyf/hugo-personal-website`.

## Step 2 — read their answers properly

Read the whole intake form first, before touching any file. Then read
`personal/profile.yaml` in their fork: it holds the demo content, and every
field you need is already there with a comment explaining it.

Work through the form in order and note, for each answer:

- what it maps to in `profile.yaml`
- whether it is present or missing
- whether it needs rewriting or can be used close to as written

**The rewriting rule.** Their answers will be in Bangla, in casual English, or
in shorthand. The site is in plain, professional English. Rewrite each answer
into that voice — but only the words. Do not add a project they did not
mention, do not sharpen a claim they did not make, do not guess a year, a
grade, a company or a link. If they said "made a website for my uncle's
shop", write that. If they did not say what tech it uses, leave `tech: []`.

## Step 3 — fill in `personal/profile.yaml`

Replace the demo content. The fields, in the order they appear in the file:

| Field | From the form | Notes |
|---|---|---|
| `name` | Q1 | Required. The name as it should appear on the site. |
| `short_name` | Q2 | Optional. Used in greetings. |
| `role` | Q3 | Required. One line: who they are. |
| `now` | Q4 | Required. One sentence: what they are doing now. |
| `photo_alt` | — | `Portrait of <name>`. Write it for someone who cannot see the photo. |
| `location` | Q5 | City or area only. They were asked not to give a full address. |
| `facts` | Q3, Q5, Q17–Q19 | 3–4 short facts for the home page. |
| `bio` | Q6 | Required. 4–6 lines, in English. The first paragraph is the one shown on the home page. |
| `education` | Q10 | Newest first. `degree`, `institution`, `start`, `end`, `detail`. |
| `experience` | Q11 | Newest first. `title`, `org`, `start`, `end`, `detail`. |
| `skills` | Q12–Q14 | Groups of `items`. The first two groups appear on the home page. |
| `projects` | Q15 | 2–6. `title`, `summary`, `tech`, `live`, `code`, `featured`. |
| `achievements` | Q16 | `year`, `title`, `issuer`. |
| `languages` | Q17 | Plain list. |
| `hobbies` | Q18 | `title` and `text` for each. |
| `contact.email` | Q19 | Required. |
| `contact.phone` | Q20 | Only if they said yes. |
| `contact.note` | Q22 | One line for the contact page. |
| `socials` | Q21 | `name` and `url` for each. Allowed names: `github`, `linkedin`, `facebook`, `x`, `instagram`, `youtube`, `website`, `behance`, `dribbble`, `medium`. |

### What to leave empty

Anything the friend did not answer. The site hides those sections by itself:

```yaml
projects: []          # the whole projects section disappears
achievements: []      # and the achievements section
hobbies: []           # and the hobbies section
languages: []         # and the languages list
socials: []           # and the social row
phone: ""             # and the phone number
cv_url: ""            # and the Download CV button
```

Do not write `null`, do not write "TBD", do not write "Not provided yet".
Leave them empty and say so in the report.

### The six required fields

The build fails if any of these is empty, and the error message says which:

- `name`
- `role`
- `now`
- `bio`
- `contact.email`
- `photos/profile.jpg` (a file, not a field)

If the friend did not answer one of these, ask them. Do not guess.

## Step 4 — put their files in place

The site finds files by name, so the names have to match exactly.

```
personal/photos/profile.jpg     ← their portrait          (required)
personal/photos/project-1.jpg   ← screenshot of project 1
personal/photos/project-2.jpg   ← screenshot of project 2
personal/photos/hobby-1.jpg     ← photo of hobby 1
personal/cv.pdf                 ← their CV                (optional)
```

The number is the **position in `profile.yaml`**, not a number the friend
chose. If their first project in the file has no screenshot, the second
project's photo is `project-1.jpg`, and there is no `project-2.jpg`.

To be sure, check what the site actually asks for:

```bash
grep -rn "photos/project-" themes/folio/layouts/
```

`.jpg`, `.jpeg`, `.png` and `.webp` all work. The site converts them to
WebP itself, so leave them as they are.

A missing file is not an error. If they have no photo for a project, that
project is simply shown without one.

## Step 5 — choose the style

The friend may have named one on the form (Q23). If they did, use it. If
they said "any", or left it blank, pick the one that has not been used yet
by the other friends — each style should belong to one person so that two
sites do not look like the same site.

| style | for |
|---|---|
| `harbor` | calm, engineering |
| `grove` | warm, academic |
| `orchid` | creative, confident |
| `graphite` | a résumé to be read carefully |
| `saffron` | bright, friendly |

Set it in `hugo.toml`:

```toml
[params]
  style = "orchid"
```

Leave `layout` alone unless the friend asked for something specific — each
style already has the right hero layout for it.

## Step 6 — check the build

```bash
hugo --gc --minify --panicOnWarning
```

This must finish with **zero warnings and zero errors**. `--panicOnWarning`
turns a warning into a failure, which is what CI does, so it catches the
same problems CI would.

If it fails, read the error: it names the file and the field.

```
ERROR personal/profile.yaml: "name" is required but empty (or missing).
```

Then look at the site before you push:

```bash
hugo server
```

Check the home page, the about page, the projects page and the contact page.
Switch to dark mode with the toggle in the header. Narrow the window to
about 375px wide and check it again on a phone.

## Step 7 — push to their fork

```bash
git checkout -b <their-username>/<name>   # or just work on the default branch
git add personal/ hugo.toml
git commit -m "Personal site for <Name>"
git push
```

Their Vercel project rebuilds automatically. If they have not set Vercel up
yet, the steps are in the main `README.md` under "Deploy to Vercel".

## Step 8 — write the report

At `docs/reports/FRIEND-<name>-report.md`, in their fork. It should say:

1. **What was filled in** — which sections are on the site and where each
   one came from (which question).
2. **What was left out and why** — every section that is empty because the
   friend did not answer, or did not want it. List them by name. This is
   the part that matters: it tells the friend what to add later.
3. **What was rewritten** — if you rewrote an answer into English, say
   which ones, so the friend can check the wording. If you had to drop a
   detail because it was not in the form, say that too.
4. **The style you chose**, and why.
5. **The build output** — the real command and its real result.
6. **What the friend should look at by eye** — the wording of their bio,
   whether the portrait is cropped well, whether the projects are in the
   right order.

---

## A worked example

The friend answered:

> 1. নাম: নুসরাত জাহান
> 3. এক লাইনে: Graphic designer & illustration student
> 4. এখন: Third-year graphic design student at Shanto-Bangla Institute, working on a visual identity for a local tea brand.
> 6. নিজের সম্পর্কে: আমি ভালোবাসি রং আর টাইপোগ্রাফি নিয়ে কাজ করতে। মানুষের গল্প বলার জন্য ডিজাইন শিখেছি। ভবিষ্যতে ব্র্যান্ড ডিজাইনার হতে চাই।
> 12. প্রোগ্রামিং ভাষা: একটুই না, ডিজাইনে ফোটোশপ আর ইলাস্ট্রেটর
> 15. প্রজেক্ট: ১. "Chai Campaign" — local tea brand poster series, made in Illustrator; ২. "Book Cover" — cover for a local poetry collection, Photoshop; live links নেই
> 19. ইমেইল: nusrat@example.com
> 23. স্টাইল: যেকোনো একটা
> 24. GitHub: nusratj

What goes into `profile.yaml`:

```yaml
name: "Nusrat Jahan"
short_name: "Nusrat"
role: "Graphic designer & illustration student"
now: "Third-year graphic design student at Shanto-Bangla Institute, working on a visual identity for a local tea brand."
photo_alt: "Portrait of Nusrat Jahan"
location: ""

facts:
  - "Graphic Design, Shanto-Bangla Institute"
  - "Based in Dhaka"
  - "Available for internships"

bio: |
  I love working with colour and type. My focus is visual identity — the
  kind of work where a poster has to do one thing and do it well.

  I taught myself design by rebuilding brands I liked and studying why
  they worked. Most of my projects are for small local businesses that
  need good design and cannot pay a studio's prices.

  I want to work in brand design, ideally somewhere where the work ships
  often and the people making it care about the details.

skills:
  - group: "Design"
    items: ["Adobe Illustrator", "Adobe Photoshop", "Typography", "Branding"]
  - group: "Tools"
    items: ["Figma", "After Effects"]

projects:
  - title: "Chai Campaign"
    summary: "A poster series for a local tea brand, made in Illustrator."
    tech: ["Adobe Illustrator"]
    live: ""
    code: ""
    featured: true
  - title: "Book Cover"
    summary: "The cover for a local poetry collection, designed in Photoshop."
    tech: ["Adobe Photoshop"]
    live: ""
    code: ""
    featured: true

contact:
  email: "nusrat@example.com"
  phone: ""
  note: "Open to internships and freelance work."

socials: []
```

Note what is **not** there:

- `location` — she did not answer Q5, so it is empty.
- `languages` — Q17 was not answered.
- `hobbies` — Q18 was not answered.
- `education` — Q10 was not answered, so the section is hidden. **Ask her
  for it**; it is the one a visitor will look for first.
- `phone` — Q20 was not answered.
- `live` and `code` on both projects — she said there are no live links, so
  the buttons are not shown.
- `experience` and `achievements` — not answered.

The report says all of that, so she can add anything she wants to.

---

## The checklist

- [ ] Fork cloned, and it has `themes/`, `hugo.toml` and `.hugo-version`
- [ ] `name`, `role`, `now`, `bio`, `contact.email` are all filled in
- [ ] `personal/photos/profile.jpg` exists
- [ ] Project and hobby photos are named by their position in the YAML
- [ ] The style is set in `hugo.toml`
- [ ] `hugo --gc --minify --panicOnWarning` passes with no warnings
- [ ] The site was looked at in the browser, in light and dark, wide and narrow
- [ ] Pushed to their fork
- [ ] `docs/reports/FRIEND-<name>-report.md` written, listing what was left out
