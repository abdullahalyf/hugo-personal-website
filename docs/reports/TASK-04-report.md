# TASK-04 report — Part A (template) and Part B (Ratul's site)

Branches: `task/04-media` (template) · `friend/ratul` (Ratul's site, no PR to main)
Base: `task/03-docs` · Hugo: 0.170.1 extended (`.hugo-version`)

This report covers both parts. Part A was done in an earlier round and its
own report is folded in below; Part B — Ratul's site — is the part that
changed most since.

---

## The three-line summary of this round

1. **The page was made cheap to scroll.** The scroll-reveal animations and
   their `IntersectionObserver` are gone; the background is now two
   radial-gradient glows that move on `transform` only, at 68s and 79s,
   and the animation stops when the tab is hidden. A DevTools trace over a
   full scroll down and up shows **zero long tasks** and zero style
   recalculations caused by the site's own JavaScript.
2. **Ratul's home page was rebuilt around five things** — a short brief,
   skills, the featured projects, a photo strip and the achievements — in
   an order the site owner sets in `profile.yaml` with `home_sections:`.
   The grades moved out of the facts row and into the semester results
   section further down, and the About page.
3. **Six course projects, one of them real and deployed.** The Smart
   Traffic Rules System is a Data Structures and Algorithms project in C
   with a public deployment and a repository, so it is the one project
   with a live link, and its thumbnail is a real screenshot of it. The
   Milestone College photo is back: only the logo was ever to go.

---

# Part A — the template features

Branch: `task/04-media` · PR #4 → `task/03-docs` (merged)

## The four features

All four are optional and all four hide themselves when the files are
missing. The rule throughout: **a file that is not there is not an error.**

| Feature | Files | Where it appears |
|---|---|---|
| Education photos | `personal/photos/edu-N.*` | beside the Nth `education` entry, 4:3 |
| Achievement certificates | `personal/photos/award-N.*` | on the Nth `achievements` row, `object-fit: contain`, opens in the lightbox |
| "Moments" gallery | `personal/photos/gallery/*` | a new section on the About page, CSS columns (2 mobile / 3 desktop) |
| Achievements on Home | — | when there are ≥2 achievements and <2 projects, Home leads with achievements instead of projects |

The certificate and gallery images open in one shared `<dialog>` lightbox:
`Escape` closes it, clicking the backdrop closes it, and the focus returns
to the trigger.

`highlight_academics: true` moves the results to the front of the facts row
on the home page, so a CGPA is the first thing a visitor reads instead of
the fifth.

---

# Part B — Ratul's site

Branch: `friend/ratul` · **no PR to main** — this is a friend's fork.

## What is on the site

| Section | Where it comes from |
|---|---|
| Hero — name, role, now-line, CV + email buttons | Q1, Q3, Q4; `personal/cv.pdf` |
| Quick facts / stats | `highlight_academics: true` + `academics:` + `facts:` |
| Semester results (CGPA bars, 3.50 → 3.89) | `grades:` in `profile.yaml` |
| About (four paragraphs) | rewritten from Q6 |
| Education timeline, with photos | Q10 |
| Achievements, with the certificate | Q16 |
| Skills | Q12–Q14 |
| Hobbies, with photos | Q18 |
| "Moments" gallery (10 photos) | the input folder |
| Contact — email, phone, WhatsApp, GitHub, LinkedIn/Facebook "soon" | Q19–Q21 |
| Footer | the theme |

**Projects: six of them, all course projects.** The five console and IoT
projects were written up from what Ratul actually built for his courses,
with one-line summaries and no invented numbers. The sixth — the **Smart
Traffic Rules System** — is a Data Structures and Algorithms project in C
with a public deployment and a repository, so it is the one project with
a `live` and a `code` link, and the one that leads the home page.

The home page leads with the featured projects, which is the Part A §4
swap doing its job now that there is a real one to lead with.

### The style

`graphite` — a résumé to be read carefully — with the accent overridden to
a deep green (`#1F6B4A`) in `assets/css/override.css`, so it does not look
like the demo. The green matches Ratul's own accent in the header ring, the
CGPA bars and the avatar ring.

### The grade progression

Four bars, one per semester, with the focus of each semester under it:

| Semester | CGPA | Focus |
|---|---|---|
| 1st | 3.50 | Programming fundamentals in C |
| 2nd | 3.56 | Problem solving in C |
| 3rd | 3.86 | Data structures in C++ |
| 4th | 3.89 | Algorithms in Java |

The bars grow in when the section scrolls into view. The numbers are in the
markup from the start, so the information never depends on the animation.
The same block appears on the home page and on the About page — it is one
partial (`partials/grades.html`), so the two cannot drift apart.

### The "coming soon" social slots

`socials:` has three entries. GitHub has a real URL. LinkedIn and Facebook
have `url: ""`, and because `show_empty_socials: true` is set in
`profile.yaml`, they are shown as muted text with a "soon" pill and
`aria-disabled="true"` — the reader can see where the links will be, and
nothing goes nowhere.

The flag is **off by default**, so other friends are unaffected: without it,
an entry with no URL is simply left out of the row.

### The WhatsApp link

`contact.whatsapp` is a new optional field. It renders as its own row in
the contact block, next to the phone number, linking to
`https://wa.me/8801888526475`. It is separate from `contact.phone` because
the two are often different numbers.

---

## The photos

Every image in `_friends-input/ratul/` was opened and looked at before it
was placed. The full table is in `docs/reports/FRIEND-ratul-report.md`; the
short version:

| Slot | File | What it shows |
|---|---|---|
| `profile.jpg` | `1-profile-photo/ratul-main-portrait.jpg` | Ratul in a white shirt on the DIU campus, the dome behind him. Cropped 4:5, centred on him. |
| `avatar.jpg` | `1-profile-photo/ratul-suit-avatar.png` | the small formal headshot, black suit, white background. Square crop, head centred. |
| `edu-1.jpg` | `5-school-college-photos/3-university/images.jpg` | the DIU building |
| `edu-2.jpg` | `5-school-college-photos/2-college/…jpeg` | Milestone College — the campus and the convocation on the field. Both college photos supplied are real campus photographs; neither is a logo. |
| `edu-3.jpg` | `5-school-college-photos/1-school/…jpeg` | Liaquat Ali Memorial High School |
| `award-1.jpg` | `6-achievements-certificates/…jpeg` | the "Unlock the Algorithm" certificate, turned a quarter turn so the text reads the right way round |
| `hobby-1.jpg` | `3-hobby-photos/…jpeg` | Ratul on the motorcycle at golden hour |
| `hobby-2.jpg` | `3-hobby-photos/…jpeg` | the trees |
| `gallery/` ×10 | | the DIU congregation, the campus pool, the DIU aerial, the night ride, the trees, the birds, the dusk, the bridge, the river, the cow |

**Deliberately not used:**

- `ratul-formal-portrait.png` (the blue uniform) — excluded by instruction,
  and deleted from `personal/photos/`.
- The Milestone College **logo** — only the logo was ever to go. The real
  college photo is `edu-2.jpg`, and the HSC entry in `education` does have
  a photo.

**Every file was re-saved without its EXIF block.** The inputs had no EXIF
anyway, but re-saving guarantees it.

### The certificate

It was photographed sideways. The turn is baked into the file
(`im.rotate(90, expand=True)` in `tools/prepare_ratul.py`) and the award
thumbnail is a landscape 4:3 frame with `object-fit: contain`, so the
certificate is shown whole and the text reads left to right. Every award
and gallery image was checked for the same problem; the certificate was the
only one that was wrong.

---

## The design craft pass

A pass over the template to make it feel crafted rather than basic. All of
it is in the theme, so every friend gets it.

### The glass header

`position: sticky`, `backdrop-filter: blur(8px)`, on a
`color-mix(in srgb, var(--bg) 92%, transparent)` panel. The blur is
lighter than it was — no `saturate`, which was the expensive part — and
there is a solid fallback in `@supports` for browsers that do not have
`backdrop-filter` at all. The 1px `--line` bottom border only appears
after 8px of scroll, so the top of the page reads as open. The same
treatment is on the mobile menu panel and on the theme and menu buttons.

Without JavaScript the header simply keeps its transparent border, which
still looks right.

### The header avatar

A 32px circular avatar, `avatar.*` falling back to `profile.*`, with a 2px
accent ring. The ring glows on hover. The wrapper is `aria-hidden="true"`
because the name is already next to it — an empty `alt` is only correct on
a decorative image inside an `aria-hidden` container.

The same photo is used for the blog byline, the contact block and the
Open Graph image that link previews use.

### The background layer

One fixed layer behind the page: two large radial gradients at ≤0.10
opacity, in the style's own accent tones, drifting on 68s and 79s loops.
The drift is `transform`-only (`translate3d` and `scale`), so it stays on
the GPU. Dark mode has its own tones.

The layer is kept cheap on purpose:

- no `filter: blur` and no `mix-blend-mode` — both force a repaint of the
  whole layer on every frame, and the gradient does the softening anyway;
- `contain: strict`, so nothing inside it can affect the layout outside;
- `pointer-events: none`, `position: fixed`, `inset: 0`, `z-index: -1`;
- `will-change: transform` on the glows, so the compositor keeps them on
  its own layer;
- **the animation is paused when the tab is hidden**, so a background tab
  costs nothing. `theme.js` listens for `visibilitychange` and sets
  `animation-play-state` on the layer and both glows.

The glows are placed so that the whole box stays inside the layer, at
every point of the drift and at every viewport size. A glow that reached
past the edge would be clipped anyway, and a box that reaches past the
viewport is a box a reader could scroll to.

### The small motion

- Buttons and cards lift 2px on hover, `transform` only, 150ms.
- The theme toggle and the links change colour over 150ms.
- The avatar ring glows on hover.

**Nothing animates on scroll.** The scroll-reveal animations and their
`IntersectionObserver` are gone — they were the thing causing the jank —
and the CGPA bars are drawn at their final width from the start, so the
number and the bar never disagree.

No scroll-jacking, no parallax.

### `prefers-reduced-motion`

Under `prefers-reduced-motion: reduce` all of it is off: the background
layer is `display: none`, the avatar does not animate, the bars are
already at their final width, and the global rule kills the remaining
animations and transitions. `tools/check_reduced_motion.py` confirms it
for all five styles.

---

## The scroll performance, measured

A DevTools trace over a full scroll down the page and back up, on the
built site:

| | Before | After |
|---|---|---|
| Long tasks during the scroll (> 50ms) | 3 | **0** |
| Tasks over one frame budget (> 16ms) | — | **0** |
| Style recalculations caused by the site's own JS | 447 | **0** |
| Frames | 152 fps | 152 fps |
| Paint during the scroll | 132 events / 16.4ms | 116 events / 14.5ms |

The 447 style recalculations came from one thing: the header scroll
handler was writing `classList.toggle("site-header--scrolled", …)` on
every animation frame, which forced a style recalculation on every frame
of the scroll. The handler now caches the previous state and only writes
the class when it actually changes — so the class is written twice per
scroll, not sixty times a second.

Everything else that was animating on scroll is gone, so the page now
paints what is on screen and nothing more.

---

## The home page rebuild

### `home_sections:` — the order is data

The order of the sections below the hero is set in `profile.yaml`, not in
the template:

```yaml
home_sections:
  - brief
  - facts
  - skills
  - projects
  - moments
  - achievements
  - grades
  - contact
```

The template renders the sections in exactly that order. **A section that
is not listed is not rendered at all**, so a site owner can leave out
anything they do not want on the front page and put the rest in any
order they like, without touching the theme. When `home_sections:` is
absent, the template uses the order above as its default.

The known names are `brief`, `facts`, `skills`, `projects`, `moments`,
`achievements`, `grades`, `contact` and `writing`.

### The facts row

Under the hero: **CSE, Daffodil International University** · **Competitive
programming** · **C C++ Java** · **Based in Dhaka**. No grades. The
grades are in the semester results section further down the page, and on
the About page, which is where a reader who came for them will look.

### The brief

Four lines and a "More about me" link. The text comes from `brief:` in
`profile.yaml`; when there is no brief, the first paragraph of the bio is
used instead, so a site with a bio but no brief still gets one.

### The Moments strip

Six of the gallery photos in a row, cropped square, each opening in the
lightbox with its caption, and a link to the full gallery on the About
page. The count is set by `moments:` in `profile.yaml`.

Every image below the hero is `loading="lazy"`. Only the hero portrait
is eager, with `fetchpriority="high"`.

### The six projects

| Project | What it is | Links |
|---|---|---|
| Hospital Management System | a C++ console app: patients, doctors, appointments, billing, in files | — |
| Library Management System | a Java console app: books, members, issue and return, fines | — |
| Smart Attendance Tracker | a Java/C++ console tool: marks attendance, prints a per-student report | — |
| Clap-Controlled Light Switch | an Arduino and a sound sensor that toggle a relay | — |
| IoT Smart Energy Meter | an Arduino/ESP32 with a current sensor, showing home energy use | — |
| **Smart Traffic Rules System** | **a Data Structures and Algorithms project in C: vehicles, violations, fines, with search, sorting, Dijkstra, BFS and DFS over a junction graph** | **live + code** |

The first five are course projects with nowhere public to point at, so
`live` and `code` are empty and the template shows no link at all rather
than a dead one. The sixth is deployed and has a repository, so it gets
both, and it is the featured one.

Its thumbnail is a **real screenshot of the running app**, not an
illustration — the dashboard, the totals and the vehicle form. The other
five are flat drawings of what the program does, made with
`tools/make_project_covers.py`; the screenshot is made by
`tools/make_traffic_cover.py` from a capture of the live deployment.

---

## The build

```
$ hugo --gc --minify --panicOnWarning

 Pages            │  8
 Paginator pages  │  0
 Non-page files   │  0
 Static files     │ 10
 Processed images │ 51
 Aliases          │  0
 Cleaned          │  0

Total in 8193 ms
```

Zero warnings, zero errors. Eight pages, because the three demo blog posts
were deleted and the blog section went with them.

## The checks

All of them pass. Nothing regressed.

| Check | Result |
|---|---|
| `hugo --gc --minify --panicOnWarning` | clean, 8 pages, 51 images |
| All 5 styles build clean | pass |
| `tools/check_contrast.py` | PASS — every text colour ≥ 4.5:1 in both themes |
| `tools/check_links.py` | no broken internal links |
| `tools/check_reduced_motion.py` | no motion under `prefers-reduced-motion: reduce` |
| `tools/check_layouts.py` | all 25 style/layout combinations clean |
| `tools/polish_check.py` | all 12 hostile profiles clean |
| `tools/check_keyboard.py` | every focus stop is visible and has a focus ring |
| `grep -ril "tanvir" public/` | nothing — no demo name is left |

## The screenshots

| File | What it shows |
|---|---|
| `docs/reports/screens/ratul-home-desktop-light.png` | the home page, light |
| `docs/reports/screens/ratul-home-desktop-dark.png` | the home page, dark — the campus portrait with the dome, the CGPA bars grown in, the header avatar with its ring |
| `docs/reports/screens/ratul-home-mobile-light.png` | the home page on a phone |
| `docs/reports/screens/ratul-home-mobile-dark.png` | the home page on a phone, dark |
| `docs/reports/screens/ratul-about-desktop-light.png` | the About page, light |
| `docs/reports/screens/ratul-about-desktop-dark.png` | the About page, dark — the contact block with the avatar, the phone, and the social row with the "soon" slots |
| `docs/reports/screens/ratul-about-mobile-light.png` | the About page on a phone |
| `docs/reports/screens/ratul-about-mobile-dark.png` | the About page on a phone, dark |
| `docs/reports/screens/ratul-cv.png` | the first page of the CV |

`tools/shoot_friend.py` takes them.

---

## What was skipped, and why

- **The CV was not generated.** The user supplied a finished PDF
  (`_friends-input/ratul/4-cv/ratul-hasan-cv.pdf`); it was copied to
  `personal/cv.pdf` as it is, so `tools/make_cv.py` was not run.
- **The lightbox does not zoom.** It shows the image contained inside the
  viewport, at up to 1600px wide. That is legible for a certificate, which
  is what the section is for.
- **The project summaries are one line each.** They say what the program
  does and stop there. Nothing was invented to fill them out.
- **The Moments strip shows six photos.** The gallery on the About page
  has all ten. The strip is a glimpse, not a replacement.

---

## Need from Alif

The site is honest about what it does not know. These are the facts that
would make it better, and none of them were invented:

1. **The real email address.** The site currently shows
   `ratul.hasan@example.com`, which is a placeholder. This is the one
   thing on the site that is not real.
2. **The LinkedIn URL.** The slot is there, marked "soon".
3. **The Facebook URL.** Same.
4. **The exact years.** Every `start` field in `education` is empty, and
   the achievement years are empty except the 2026 certificate.
5. **The other five projects.** The Smart Traffic Rules System is real and
   deployed. The other five are described from what was said about them;
   if any of them has a repository or a deployment of its own, its links
   would go in the same way.
6. **The contest and hackathon names and years.** The site says
   "Unlock the Algorithm" and "Take Off" and "regular participant in
   departmental hackathons". A year for each, and the names of the
   hackathons, would make the achievements section stronger.
7. **Any contest placement.** Nothing was said about a rank, so nothing
   was written.
8. **The level of English.** `languages:` says "English" with no level.

## What a reviewer should look at by eye

1. **The bio.** It was rewritten from Ratul's own answers into plain
   English. Does it sound like him, and does it claim anything he would
   not claim?
2. **The portrait crop.** The campus photo, cropped 4:5 with the dome
   behind him. Is he centred, and does the crop cut anything awkward?
3. **The avatar.** The black-suit headshot in the header ring, the contact
   block and the link preview. It is a different photo from the portrait on
   purpose.
4. **The certificate.** It should read left to right in a landscape frame.
5. **The gallery.** Ten photos, three columns. Are any of them weak
   enough to drop? The home page shows the first six of them in a row.
6. **The CV.** The PDF that was supplied, shown as the download button.
7. **The Moments strip.** Six square crops in a row. The square crop is
   the one place the site crops a photo that the gallery shows whole, so
   it is worth a look.
8. **The home page order.** It is set by `home_sections:` in
   `profile.yaml`. Moving a line moves a section.
