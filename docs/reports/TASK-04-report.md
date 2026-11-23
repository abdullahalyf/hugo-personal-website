# TASK-04 report — Part A: education photos, achievement certificates, the gallery, and the home-page swap

Branch: `task/04-media` · Base: `task/03-docs` · Hugo: 0.170.1 extended (`.hugo-version`)

This report covers **Part A** only. Part B (Ratul's own site, on the
`friend/ratul` branch) has its own report.

> **Later on this branch:** the home-page rebuild described in
> ["The home page rebuild"](#the-home-page-rebuild) below was merged in
> after the first version of this report was written.

## The home page rebuild

Two template changes landed on this branch after the first version of this
report: the scroll-jank fix, and a home page whose section order is data
rather than code.

### A configurable section order

The home page used to have a fixed order written into
`layouts/index.html`. It is now a list in `profile.yaml`:

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

`layouts/index.html` walks that list and renders each entry. A section that
is **not** in the list is not rendered at all — so a friend can leave out
`grades` and it is gone, with no empty heading left behind. When the key is
missing, the template falls back to its own default order, so an existing
site that has never heard of `home_sections` renders exactly as before.

The point is that a friend gets a different home page **without editing the
theme**. The theme is not theirs to fork, and a page whose arrangement
depends on which theme is checked out is a page that breaks on the next
theme update.

The home page sections are now separate partials rather than inline markup:
`home-brief.html`, `home-projects.html`, `home-moments.html`. The old
inline versions moved into them unchanged, so the diff for the move is
mostly indentation.

### The "Moments" strip

`home-moments.html` is a short row of photos on the home page. It reads
the **same** `gallery:` list and the **same** folder as the About gallery,
in the same order, and takes the first few (`moments:` in `profile.yaml`,
default six). Each photo opens in the lightbox, and the section links to
the full gallery on the About page.

Reusing the About gallery's resolution logic rather than writing a second
copy is what keeps the two in step: a photo added to the folder shows up
in both places, in the same order, with the same caption.

### The scroll-jank fix

The site felt laggy while scrolling. The cause was the reveal-on-scroll
animation: every element that entered the viewport was animated, and each
one forced a style recalculation and a repaint of the whole page.

The fix was to remove the scroll reveals and leave the background as the
only thing that moves. The measured before/after is in the report on
`friend/ratul`; the short version:

| | before | after |
|---|---|---|
| style recalcs caused by the site's own JS, during a scroll | 447 | **0** |
| tasks over 16 ms during the scroll | 214 | **0** |
| frames per second | 88 | **152** |

The remaining 1866 recalculations are Chrome's own work on the sticky
header (`elementCount: 2`, `nodeName: HEADER class='site-header'`), not
the site's JavaScript.

Two supporting changes:

- the background layer is `position: fixed`, `inset: 0`, `contain: strict`
  and `pointer-events: none`, so it cannot affect the layout of anything
  on the page;
- the header's scroll handler now only touches the DOM **when the state
  actually changes** (`scrollY > 8` flipping a class), behind a
  `requestAnimationFrame` with a `passive` listener. Before, every scroll
  event wrote to the DOM.

The background glows are also `position: absolute` inside that fixed
layer now, so their transform animations are composited and never trigger
layout.

### The glow geometry

The layout checker caught a real regression here, and it is worth writing
down because the fix looks arbitrary without the reason.

The audit skips elements whose computed `position` is `fixed`, and flags
any element whose right edge passes the viewport width. The old glows were
`position: fixed`, so they were skipped. Moving them to `absolute` (which
is cheaper to animate) exposed them: the glow's `right` edge landed
outside the viewport at every width, and the check failed with 200
failures.

The fix is that **every dimension of a glow is in viewport units, with no
pixel minimum**, and the drift budget is written into the comment:

```
one — right edge at -4 + 44 + 5 + 2.2 = 47.2vw
two — right edge at 100 - 4 + 1.6 = 97.6vw at its widest
```

A `min-width` in pixels is what broke it: at 375px wide, `min-width:
280px` plus a `scale(1.08)` pushed the edge past the viewport. The glows
now sit inside the layer at every size, and the check is clean across all
25 style/layout combinations.

### The background stays

Worth saying plainly, because the first pass of this work removed it: the
animated background was kept, on purpose. It is the thing Alif likes about
the site. It was made *cheap*, not removed — two radial-gradient glow
layers, no `filter: blur`, no `mix-blend-mode`, transform-only animation
on a 68s and a 79s cycle, paused when the tab is hidden and under
`prefers-reduced-motion: reduce`.

## What was built

Four optional features, all of which hide themselves when the files are
missing. The rule throughout: **a file that is not there is not an error.**

### 1. Education photos

`personal/photos/edu-1.jpg`, `edu-2.jpg` … sit beside the first, second …
entry in `education`. The number is the position in `profile.yaml`.

The image is a small 4:3 crop on the right of the timeline entry, and
stacks above the text on a phone. It uses the existing `img.html` partial,
so it gets the same 480w/960w `srcset` as every other image on the site,
and `loading="lazy"` because it is never above the fold.

`themes/folio/layouts/partials/timeline.html` is shared by the education
timeline and the experience timeline, so the photo lookup is gated on the
`kind`:

```gotemplate
{{- $photo := "" -}}
{{- if eq $kind "education" -}}
  {{- $photo = printf "edu-%d" (add $i 1) -}}
{{- end -}}
{{- $image := "" -}}
{{- if $photo -}}
  {{- $image = resources.GetMatch (printf "photos/%s.*" $photo) -}}
{{- end -}}
```

The alt text names the institution, not the slot, so a screen reader says
"Daffodil International University photo" and not "education photo".

### 2. Achievement certificates

`personal/photos/award-1.jpg` … belong to the first, second … entry in
`achievements`.

Certificates are scans of paper, usually portrait, and a certificate with
the name cropped off it is worse than no certificate at all. So the
thumbnail uses `object-fit: contain` on a light `--surface` panel, and the
full image opens in the lightbox. Nothing is ever cropped.

### 3. The "Moments" gallery

`personal/photos/gallery/` takes any number of files. They appear in a
new section on the About page.

The layout is CSS columns — two across on a phone, three from 900px up.
CSS columns give the justified, staggered feel without JavaScript and
without a fixed row height, and `break-inside: avoid` keeps a photo from
being split across a column break.

The order comes from an optional list in `profile.yaml`:

```yaml
gallery:
  - file: "ride"
    caption: "On the way to the hills"
```

`file` is the name without the extension. Files that are **not** in the
list are shown after the listed ones, in name order, with no caption — so a
folder of photos works with no YAML at all. This is the same "works empty,
works full" rule as the rest of the theme.

### 4. Achievements on the home page, and the academics highlight

The home page leads with "Selected projects" when there are projects. When
there are **two or more achievements and fewer than two projects**, it
leads with "Achievements" instead:

```gotemplate
{{- $leadWithAchievements := and (ge (len $p.achievements) 2) (lt (len $p.projects) 2) -}}
```

This matters for a friend who has contests and hackathons but has not
shipped a project worth showing — which is the common case for a
second-year student.

`highlight_academics: true` moves the results to the front of the facts
row on the home page, so a CGPA is the first thing a visitor reads instead
of the fifth. `academics: []` is the default, and the flag does nothing
without it.

### The lightbox

One `<dialog>` for the whole page, in `partials/lightbox.html`, included
once from `baseof.html`. Any element with `data-lightbox-src` becomes a
trigger: the script fills in the full-size image and opens the dialog.

- `Escape` closes it (the browser does that for a `<dialog>` for free).
- Clicking the backdrop closes it.
- The focus returns to the button that opened it.
- The image is `aria-hidden="true"` while the dialog is closed, because it
  has no source yet; the script removes the attribute on open and puts it
  back on close.

The script is 34 lines of vanilla JavaScript inside the existing
`theme.js`. The file is **4.3 KB unminified** and **2.0 KB minified** —
still inside the 3 KB budget from `AGENTS.md`. No library, no build step.

## The demo images

`tools/make_media.py` generates the demo media with Pillow, in the harbour
palette, following the TASK-01 rule that demo images are flat
style-neutral illustrations rather than stock photos:

| File | Size | What it shows |
|---|---|---|
| `edu-1.jpg` | 17.5 KB | a university building |
| `edu-2.jpg` | 18.4 KB | a college building |
| `award-1.jpg` | 19.6 KB | a certificate |
| `award-2.jpg` | 19.6 KB | a certificate |
| `award-3.jpg` | 19.6 KB | a certificate |
| `gallery/ride.jpg` | 11.9 KB | a road through hills |
| `gallery/market.jpg` | 25.6 KB | a market street |
| `gallery/evening.jpg` | 12.2 KB | a sun over water |
| `gallery/road.jpg` | 19.9 KB | a road through trees |

One thing the first version of `evening.jpg` got wrong: it was a purple
and magenta gradient, which TASK-01 forbids. It was redrawn in warm
horizon tones over a cool blue sky and checked again by eye.

## The documentation

- **`personal/README.md`** — the file table now lists the four new slots,
  and a new "The photo sections" section explains each one: which entry
  each file belongs to, how the number is chosen, that certificates are
  never cropped, and the `gallery:` YAML example.
- **`docs/FRIEND-SITE.md`** — step 4 gained the four new file names, a
  "The four photo sections" subsection, a "Looking at the images"
  subsection (open every photo, keep the certificates whole, strip EXIF),
  the delete-the-leftovers rule extended to `edu-N` and `award-N`, the
  "when the friend has no projects" case with the commented YAML example,
  the `gallery` / `highlight_academics` / `academics` rows in the field
  table, a fourth item in the report template (which photo went where,
  and which were dropped), and four new checklist lines.

## The checks

All of them pass. Nothing regressed.

### 1. The build

```
$ hugo --gc --minify --panicOnWarning

 Pages            │ 12
 Paginator pages  │  0
 Non-page files   │  0
 Static files     │ 10
 Processed images │ 49
 Aliases          │  0
 Cleaned          │  0

Total in 344 ms
```

Twenty-one more processed images than TASK-03's 28 — the new demo media
and their WebP variants.

### 2. Every style builds clean

```
$ for s in harbor grove orchid graphite saffron; do
    HUGO_PARAMS_STYLE=$s hugo --gc --minify --panicOnWarning --destination "public-$s"
  done

harbor     Total in 286 ms
grove      Total in 149 ms
orchid     Total in 225 ms
graphite   Total in 217 ms
saffron    Total in 180 ms
```

**All five pass. Zero warnings, zero errors.**

### 3. Contrast — all 5 styles, both themes

```
RESULT: PASS — every text colour is at least 4.5:1 in both themes
```

### 4. Internal links

```
$ python tools/check_links.py public
checked 159 internal links across 9 pages
no broken internal links
```

### 5. `prefers-reduced-motion: reduce` — no motion

```
$ python tools/check_reduced_motion.py
checked harbor
checked grove
checked orchid
checked graphite
checked saffron

No motion under prefers-reduced-motion: reduce
```

### 6. Every style × every layout

```
$ python tools/check_layouts.py
All 25 style/layout combinations clean
```

This check caught two real bugs during the work:

- the gallery images had `alt=""` when they had a caption, which the
  checker (correctly) refuses — an empty alt is only allowed on a
  decorative image inside an `aria-hidden` container. The images now carry
  the caption as their alt text, and the visible caption span is
  `aria-hidden="true"` so it is not read twice;
- the lightbox's `<img src="">` had no source at all. It is now
  `aria-hidden="true"` while the dialog is closed.

The second fix also removed a duplicate accessible name from the gallery
buttons: a button whose only content is an image with alt text plus a
caption span with the same text reads "On the way to the hills On the way
to the hills" to a screen reader.

After the home-page rebuild, this check also caught the glow geometry
described above: 200 failures that turned out to be a real regression, not
a false positive. The baseline was confirmed by checking out the previous
`base.css` and re-running the check, which was clean.

### 7. The polish pass — 12 hostile profiles

```
$ python tools/polish_check.py
...
All polish cases clean
```

Four cases were added for this task: `empty-gallery` (the folder is hidden,
so the section really has nothing in it), `no-gallery-list` (images with no
YAML list, so they show in name order with no captions),
`achievements-no-images` (the certificates are removed, so the rows have
to work without them) and `academics-highlight` (the facts row leads with
the CGPA).

`empty-gallery` needed a new mechanism in the script: hiding the whole
`personal/photos/gallery/` folder for the length of the case, and putting
it back afterwards.

### 8. Keyboard

```
$ python tools/check_keyboard.py
OK  home: 28 focusable elements, 13 tab stops checked
OK  about: 18 focusable elements, 9 tab stops checked
OK  projects: 14 focusable elements, 10 tab stops checked
OK  blog: 13 focusable elements, 12 tab stops checked
OK  post: 12 focusable elements, 11 tab stops checked
OK  contact: 18 focusable elements, 17 tab stops checked

every focus stop is visible and has a focus ring
```

The nine tab stops on the About page include the three certificate
triggers and the four gallery buttons: the new controls are reachable with
the keyboard, and `:focus-visible` draws a ring on each of them.

### 9. The JavaScript budget

```
$ ls -la public/js/
-rw-r--b-- 2649  theme.min.14aecf5eef3204328cf4b04181f04aae7720658917c97ae345e6bbc055850e3c.js
```

**2.6 KB minified**, up from 1.3 KB before this task and from 2.0 KB after
the lightbox. The 3 KB budget from `AGENTS.md` still holds. The scroll-jank
fix added about 500 bytes: the header handler, the background pause, and
the `visibilitychange` listener.

## The screenshots

| File | What it shows |
|---|---|
| `docs/reports/screens/task04-about-edu.png` | two education entries with their 4:3 photos beside them |
| `docs/reports/screens/task04-about-award.png` | three achievements with certificate thumbnails on a light panel |
| `docs/reports/screens/task04-about-gallery.png` | the "Moments" section, three columns |
| `docs/reports/screens/task04-about-gallery-mobile.png` | the same section, two columns, dark mode |
| `docs/reports/screens/task04-lightbox-award.png` | the lightbox open over a certificate, with the title as the caption |

`tools/shoot_media.py` takes them.

## What was skipped, and why

- **The lightbox does not zoom.** It shows the image at up to 1600px wide,
  contained inside the viewport. A pinch-zoom on a phone would need a
  different implementation and a gesture library. The image opens at a
  size that is legible for a certificate, which is what the section is
  for.
- **There is no gallery filter or lightbox for the education photos.**
  The education images are context for a timeline entry, not something to
  browse. Only the certificates and the gallery open the lightbox.
- **The gallery has no captions for unlisted images.** A caption has to be
  written by the person who owns the photo, and a generated one would be
  a lie.

## What a reviewer should look at by eye

1. **The certificates.** They are shown whole, never cropped. Is the
   thumbnail big enough to recognise, and small enough that three of them
   do not push the achievements list off the screen?
2. **The gallery on a phone.** Two columns of real photographs — do they
   read as a gallery, or does the masonry look broken?
3. **The education photos.** They are illustrations, so they will look
   flat. Does a flat 4:3 image beside a timeline entry look deliberate?
4. **The lightbox.** Open a certificate, press Escape, and check that the
   focus goes back to the certificate you clicked and not to the top of
   the page.
5. **A profile with no achievements and no gallery.** The sections should
   simply not be there.
6. **The home page with a different `home_sections:` order.** Change the
   order in `profile.yaml`, rebuild, and check that the page follows it
   and that a removed section leaves no empty heading behind.
7. **The background while scrolling.** It should drift smoothly, and
   nothing else on the page should move. Use the Performance panel, not
   your eyes — the jank was subtle enough to be missed by looking.

## Open questions

- The gallery is on the About page only. A friend with twenty good
  photographs may want them on the home page instead, or on a page of
  their own. The section is one partial, so moving it is easy, but which
  page it belongs on is a judgement call the template cannot make.
- `award-N.jpg` is matched to the Nth achievement **in the YAML**. If
  somebody deletes the first achievement, the certificates shift. The
  same is true of `edu-N.jpg` and `project-N.jpg`, and it was already
  true of `project-N.jpg` before this task — but with three positional
  photo sets in one folder the cost of getting the order wrong is higher.
  A future version could match on a key instead of a position.
