# FRIEND-ratul report — Ratul Hasan's site

Branch: `friend/ratul` · Style: **graphite** (green accent) · Hugo: 0.170.1 extended

This is the report `docs/FRIEND-SITE.md` asks for. It says what was filled
in, what was left out, what was rewritten, which photo went where, and what
Alif still needs to supply.

---

## 1. What was filled in

| Section | Where it came from |
|---|---|
| Name — "Ratul Hasan" | Q1 |
| Role — "CSE student & competitive programmer" | Q3 |
| Now-line | Q4 |
| Location — "Dhaka, Bangladesh" | Q5 |
| Facts (3) | Q3, Q5, Q17–Q19 |
| Academics — "SSC GPA 5.00", "HSC GPA 5.00", "CGPA 3.89, up from 3.50" | Q10 |
| `highlight_academics: true` | set, so the results lead the facts row |
| Semester results — 4 bars, 3.50 → 3.89, with each semester's focus | Q10 + the "Update" section of `info-from-alif.md` |
| Bio — 4 paragraphs | Q6, rewritten |
| Education — 3 entries (DIU, Milestone College, the school) | Q10 |
| Experience | **empty** — Q11 was not answered |
| Skills — 3 groups | Q12–Q14 |
| Projects | **empty** — the real list is not confirmed |
| Achievements — 4 entries | Q16 + the "Update" section |
| Languages — Bangla (native), English | Q17 |
| Hobbies — 3 (Motorcycles, Football, Travel) | Q18 |
| Gallery — 10 photos with captions | the input folder |
| Contact — email, phone, WhatsApp, note | Q19, Q20, Q22 + the "Update" section |
| Socials — GitHub (real), LinkedIn and Facebook ("soon") | Q21 + the "Update" section |
| CV | the supplied PDF, copied to `personal/cv.pdf` |

## 2. What was left out, and why

These are the empty spots on the site. Each one is empty because the fact
was not in the form, not because it was overlooked.

| Left out | Why |
|---|---|
| **Projects** | The real list was never given. `projects: []` with one commented example left in the file. The home page leads with the achievements instead, which is what Part A §4 of the template does when there are two or more achievements and fewer than two projects. |
| **Experience** | Q11 was not answered. The section hides itself. |
| **LinkedIn** | No URL. Shown as a muted "soon" slot, not a link. |
| **Facebook** | No URL. Shown as a muted "soon" slot, not a link. |
| **All the `start` and `end` years in `education`** | Only "Present" was known for DIU. Every year field is empty rather than guessed. |
| **Years on three of the four achievements** | Only the certificate's year (2026) was known. |
| **The level of English** | `languages:` says "English" with no level. |
| **Contest placements / ranks** | Nothing was said about a rank, so nothing was written. |
| **The hackathon names** | The site says "regular participant in departmental hackathons", which is what was said. The specific names were not given. |
| **The Milestone College photo** | Removed on instruction. The HSC entry has no image. |
| **The blue-uniform portrait** | `ratul-formal-portrait.png` was excluded on instruction and deleted from `personal/photos/`. |

The Projects page is not left bare: it shows a short note saying the
course projects are still being written up, with the skills underneath.

## 3. What was rewritten

Everything in the form was in Bangla or in casual shorthand. It was
rewritten into plain, confident English. **Only the words changed — no fact
was added, sharpened or guessed.**

| What | What it said | What it says now |
|---|---|---|
| Q6 (the bio) | a Bangla paragraph about studies, contests and work | four paragraphs: what he studies and why, the rising CGPA with the semester order, the contests and hackathons, and what he does outside it (motorcycles, Ronaldo, travel) and what he wants to do after graduation |
| Q10 (education) | the three institutions | each entry got a one-line detail: the rising CGPA at DIU, "GPA 5.00, with mathematics and computer science" at Milestone, "GPA 5.00" at the school |
| Q18 (hobbies) | three short lines | one sentence each, in the same voice — motorcycles ("I ride for the hour it takes to get somewhere, not to get there"), football (the Ronaldo consistency, not the goals), travel ("I would rather see one place properly than five places quickly") |
| Q3/Q4 (role and now) | short Bangla lines | one line each |
| the "Update" section | the semester CGPAs and the contest names | the four bars with each semester's focus, and the achievements as four rows |

Nothing was dropped for being awkward. Nothing was invented.

## 4. The photos

Every image in `_friends-input/ratul/` was opened and looked at before it
was placed.

### The slots

| Slot | Source file | What it shows | Note |
|---|---|---|---|
| `profile.jpg` | `1-profile-photo/ratul-main-portrait.jpg` | Ratul in a white shirt on the DIU campus, the dome behind him | Cropped 4:5 (829×1036), centred on him with the dome still behind his head |
| `avatar.jpg` | `1-profile-photo/ratul-suit-avatar.png` | the small formal headshot, black suit, white background | Square crop (1108×1108), head centred |
| `edu-1.jpg` | `5-school-college-photos/3-university/images.jpg` | the Daffodil International University building | Beside the DIU entry |
| `edu-3.jpg` | `5-school-college-photos/1-school/WhatsApp Image 2026-11-23 at 21.29.40.jpeg` | Liaquat Ali Memorial High School | Beside the SSC entry. It is `edu-3` because Milestone College has no photo — the position follows the YAML, not the file |
| `award-1.jpg` | `6-achievements-certificates/WhatsApp Image 2026-11-23 at 21.30.49.jpeg` | the "Unlock the Algorithm" certificate | Turned a quarter turn anticlockwise so the text reads left to right |
| `hobby-1.jpg` | `3-hobby-photos/WhatsApp Image 2026-11-23 at 21.29.41.jpeg` | Ratul on the motorcycle at golden hour | Beside "Motorcycles" |
| `hobby-2.jpg` | `3-hobby-photos/WhatsApp Image 2026-23 at 21.29.41.jpeg` | the trees | Beside "Travel" |

### The gallery

Ten photos, in the order they are listed in `profile.yaml`:

| File | Caption |
|---|---|
| `campus-congregation.jpg` | Convocation morning at Daffodil International University |
| `campus-pool.jpg` | The campus from above |
| `campus-aerial.jpg` | DIU from the air |
| `cow.jpg` | A detour on the way to somewhere |
| `bridge.jpg` | Crossing the river on the way home |
| `dusk.jpg` | Last light over the field |
| `trees.jpg` | Somewhere under the trees |
| `river.jpg` | A boat on the water |
| `birds.jpg` | Birds over the water |
| `night-ride.jpg` | One more ride before the light goes |

### What was dropped, and why

| Dropped | Why |
|---|---|
| `1-profile-photo/ratul-formal-portrait.png` | The blue-uniform portrait. Excluded on instruction, and deleted from `personal/photos/` so it cannot reach the site. |
| The Milestone College logo/photo | Removed on instruction. It also came out of the input folder. The two files in `2-college/` turned out to be DIU campus shots (the congregation and the pool), so they were reclassified rather than dropped. |
| `1-profile-photo/WhatsApp Image 2026-11-23 at 21.29.41.jpeg` | The same photograph as `ratul-main-portrait.jpg` — pixel-identical (verified: mean absolute difference 0.0 across all three channels). It is the uncropped original under a WhatsApp name. Keeping one copy of one picture is enough. |

Nothing else was dropped. Every other image in the folder is on the site.

### EXIF

Every file was re-saved through Pillow without its EXIF block. The inputs
carried no EXIF, but re-saving guarantees it for anything added later.

## 5. The style

**graphite**, with the accent overridden to a deep green in
`assets/css/override.css`:

```css
:root { --accent: #1F6B4A; --accent-ink: #FFFFFF; --accent-strong: #175440; }
[data-theme="dark"] { --accent: #6FD3A3; --accent-ink: #10241C; --accent-strong: #93E3BE; }
```

The template's graphite is grey. The green is Ratul's own — it ties the
header avatar ring, the CGPA bars and the avatar in the contact block
together, and it keeps the site from looking like the demo.

## 6. The build

```
$ hugo --gc --minify --panicOnWarning

 Pages            │  8
 Paginator pages  │  0
 Non-page files   │  0
 Static files     │ 10
 Processed images │ 37
 Aliases          │  0
 Cleaned          │  0

Total in 8193 ms
```

Zero warnings, zero errors. Eight pages — the three demo blog posts were
deleted, and the blog section went with them.

The checks all pass: contrast (all 5 styles, both themes), internal links,
`prefers-reduced-motion`, all 25 style/layout combinations, the 12
hostile-profile polish cases, keyboard focus rings, and no demo name
anywhere in `public/`.

## 7. What Ratul should look at by eye

1. **The bio.** It was rewritten from his own answers. Does it sound like
   him? Does it claim anything he would not claim?
2. **The portrait crop.** The campus photo, 4:5, centred on him with the
   dome behind. Is that the right amount of space?
3. **The avatar.** The black-suit headshot is used in the header ring, the
   contact block and the link preview. A different photo from the big
   portrait on purpose.
4. **The certificate.** It should read left to right now, in a landscape
   frame.
5. **The gallery.** Ten photos. Are any of them weak enough to drop?
6. **The CV.** The PDF that was supplied, behind the "Download CV" button.
7. **The hobby photos.** The motorcycle shot is beside "Motorcycles"; the
   trees are beside "Travel". Does that pairing feel right?

---

## Need from Alif

Nothing on this list was invented. Each item is a fact the site is
currently missing.

| # | What is needed | Where it goes |
|---|---|---|
| 1 | **The real email address** | `contact.email` — currently the placeholder `ratul.hasan@example.com`. This is the only thing on the site that is not real. |
| 2 | **The LinkedIn URL** | `socials` → the LinkedIn entry's `url` |
| 3 | **The Facebook URL** | `socials` → the Facebook entry's `url` |
| 4 | **The years** — when he started DIU, Milestone College and the school | `education` → `start` and `end` |
| 5 | **The real project list** — title, what it does, the tech, a live link or a repo | `projects` |
| 6 | **The hackathon names and years** | `achievements` |
| 7 | **Any contest placement** | `achievements` |
| 8 | **The level of English** | `languages` |

To add any of them, edit `personal/profile.yaml` and rebuild. The
commented example in `projects:` shows the shape.
