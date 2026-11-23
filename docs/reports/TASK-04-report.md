# TASK-04 report — Part A (template) and Part B (Ratul's site)

Branches: `task/04-media` (template) · `friend/ratul` (Ratul's site, no PR to main)
Base: `task/03-docs` · Hugo: 0.170.1 extended (`.hugo-version`)

This report covers both parts. Part A was done in an earlier round and its
own report is folded in below; Part B — Ratul's site — is the part that
changed most since.

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

**Projects: there are none, and none were invented.** `projects: []` is
left with one commented example in `profile.yaml`. The home page leads
with the achievements instead — that is the Part A §4 swap doing its job.

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
| `edu-3.jpg` | `5-school-college-photos/1-school/…jpeg` | Liaquat Ali Memorial High School |
| `award-1.jpg` | `6-achievements-certificates/…jpeg` | the "Unlock the Algorithm" certificate, turned a quarter turn so the text reads the right way round |
| `hobby-1.jpg` | `3-hobby-photos/…jpeg` | Ratul on the motorcycle at golden hour |
| `hobby-2.jpg` | `3-hobby-photos/…jpeg` | the trees |
| `gallery/` ×10 | | the DIU congregation, the campus pool, the DIU aerial, the night ride, the trees, the birds, the dusk, the bridge, the river, the cow |

**Deliberately not used:**

- `ratul-formal-portrait.png` (the blue uniform) — excluded by instruction,
  and deleted from `personal/photos/`.
- The Milestone College logo/photo — removed completely. The HSC entry in
  `education` has no photo, which is why the school photo is `edu-3.jpg`
  and not `edu-2.jpg`.

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

`position: sticky`, `backdrop-filter: blur(12px) saturate(140%)`, on a
`color-mix(in srgb, var(--bg) 82%, transparent)` panel. The 1px `--line`
bottom border only appears after 8px of scroll, so the top of the page
reads as open. The same glass treatment is on the mobile menu panel and on
the theme and menu buttons.

Without JavaScript the header simply keeps its transparent border, which
still looks right.

### The header avatar

A 32px circular avatar, `avatar.*` falling back to `profile.*`, with a 2px
accent ring. It fades and scales in on load (`avatar-in`, 520ms) and the
ring glows on hover. The wrapper is `aria-hidden="true"` because the name
is already next to it — an empty `alt` is only correct on a decorative
image inside an `aria-hidden` container.

The same photo is used for the blog byline, the contact block and the
Open Graph image that link previews use.

### The background layer

One fixed layer behind the page: a faint dot grid plus three large radial
gradients at ≤0.12 opacity, in the style's own accent and surface tones,
drifting on 52s / 61s / 57s loops. The drift is `transform`-only
(`translate3d` and `scale`), so it stays on the GPU. Dark mode has its own
tones.

The glows are `position: fixed` inside a `translateZ(0)` parent, which is
what makes the parent's `overflow: hidden` clip them — a drifting glow can
never widen the document.

### The small motion

- Sections fade up 12px once, when they enter the viewport, via one
  `IntersectionObserver`. 300ms, staggered, at most three steps.
- Buttons and cards lift 2px on hover.
- Timeline dots pulse once when their entry is revealed.
- The CGPA bars grow in.

No scroll-jacking, no parallax.

### `prefers-reduced-motion`

Under `prefers-reduced-motion: reduce` all of it is off: the background
layer is `display: none`, the reveal elements are fully visible with no
transition, the avatar does not animate, the bars are already at their
final width, and the global rule kills the remaining animations and
transitions. `tools/check_reduced_motion.py` confirms it for all five
styles.

---

## The build

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

Zero warnings, zero errors. Eight pages, because the three demo blog posts
were deleted and the blog section went with them.

## The checks

All of them pass. Nothing regressed.

| Check | Result |
|---|---|
| `hugo --gc --minify --panicOnWarning` | clean, 8 pages, 37 images |
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
- **No projects.** The real list is not confirmed, so `projects: []` and
  the home page leads with the achievements instead.
- **The projects page is not empty.** It shows a short note saying the
  course projects are still being written up, with the skills underneath,
  rather than a bare page.
- **The Milestone College photo is gone**, per instruction, so the HSC
  entry in the education timeline has no image.
- **The lightbox does not zoom.** It shows the image contained inside the
  viewport, at up to 1600px wide. That is legible for a certificate, which
  is what the section is for.

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
5. **The real project list.** Titles, what each one does, the tech, and
   whether there is a live link or a repository.
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
   enough to drop?
6. **The CV.** The PDF that was supplied, shown as the download button.
