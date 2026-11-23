# TASK-02 report — the other 4 styles, layout polish, quality pass

Branch: `task/02-styles` · Base: `main` · Hugo: 0.170.1 extended (`.hugo-version`)

## What was built

### The four new styles

| file | style | tokens | display / body font | hero layout |
|------|-------|--------|---------------------|-------------|
| `themes/folio/assets/css/styles/grove.css` | grove — warm academic | `#F2F5F1 / #FFFFFF / #1D2B22 / #56645A / #2F6B4F / #D8E0D9` | Fraunces 600 / Work Sans 400·600 | centered |
| `themes/folio/assets/css/styles/orchid.css` | orchid — creative, confident | `#FAF7FB / #FFFFFF / #2A1733 / #6A5872 / #B4236B / #E9DFEC` | Space Grotesk 700 / Figtree 400·600 | typographic |
| `themes/folio/assets/css/styles/graphite.css` | graphite — résumé, precise | `#FFFFFF / #F5F7F9 / #1F2328 / #59636E / #1C66DB / #E1E4E8` | IBM Plex Serif 600 / IBM Plex Sans 400·600 | sidebar |
| `themes/folio/assets/css/styles/saffron.css` | saffron — bright, friendly | `#F7F7FB / #FFFFFF / #22223B / #5B5B76 / #4338CA / #E3E3EE` + `--spark #F59E0B` | Sora 700 / Source Sans 3 400·600 | band |

Every token set matches `docs/DESIGN.md` §3, dark theme included. The fonts are
the self-hosted WOFF2 files already in `themes/folio/static/fonts/`; `partials/fonts.html`
already mapped all five styles to them, so no font work was needed.

### The one token that had to change

**graphite `--accent`: `#1F6FEB` → `#1C66DB`.**

The design system's `#1F6FEB` is only **4.32:1** on graphite's `--surface`
(`#F5F7F9`), and accent-coloured text does sit on surfaces (buttons, links
inside cards, the focus ring). Darkening inside the same hue to `#1C66DB`
gives **5.29:1** on `--bg` and **4.92:1** on `--surface`, both over the 4.5:1
floor. `--accent-strong` moved with it, `#1759C9`. The change is recorded in
a comment in `graphite.css`:

```css
/* The design system gives #1F6FEB, but that is only 4.32:1 on --surface
   (#F5F7F9) and accent text does sit on surfaces. Darkened within the same
   hue to #1C66DB: 5.29:1 on --bg and 4.92:1 on --surface. */
--accent: #1C66DB;
--accent-strong: #1759C9;
```

No other token in any of the five styles needed changing.

### The four remaining hero layouts

- **centered** (grove) — the photo is a circle in a 6px `--accent` ring with a
  6px `--bg` offset; the name, role, "now" line and buttons are all centred.
- **typographic** (orchid) — the name is `clamp(3rem, 10vw, 8rem)` in Space
  Grotesk at `letter-spacing: -0.035em`, and the 96px round photo sits inline
  with it. Below 900px the photo moves beside the name rather than below the
  buttons.
- **sidebar** (graphite) — see below.
- **band** (saffron) — a full-bleed `--accent` band (`100vw` with
  `calc(50% - 50vw)` margins) with the round photo, in a 6px `--surface`
  border, overlapping the band's lower edge.

### The sidebar layout: a column for the whole page

The task asked for a sticky profile column on ≥1024px **for the whole page,
not just the hero**. That is what it does now:

- `layouts/partials/profile-aside.html` (new) holds the profile column —
  photo, name, role, "now" line, buttons.
- On the home page the hero renders it. On every other page `baseof.html`
  renders it inside a `.page-aside`, so About / Projects / Blog / Contact all
  carry the same left column.
- The column is `position: sticky; top: 5.5rem` inside an absolutely
  positioned 320px-wide `.hero` / `.page-aside`.

**A grid was tried first and does not work.** Grid rows are shared between
the columns, so the tall hero stretched row 1 and pushed the whole page
content down by ~600px. The absolute-positioning approach sidesteps that.

The name in the column is an `<h1>` on the home page and a `<p>` elsewhere,
because the other pages already have a heading of their own — that keeps
**exactly one `<h1>` per page**.

### `params.layout` override

`hugo.toml` → `[params] layout = "band"` overrides the hero layout for any
style. The override is a property of the page, not of the style, so all
5 × 5 combinations work. Verified below.

### Docs

- `docs/styles.md` — one screenshot per style (desktop home, light) with a
  line on who each one suits, plus how to change the style and the layout.
- `tools/check_contrast.py`, `tools/polish_check.py`, `tools/check_layouts.py`,
  `tools/check_lighthouse.py`, `tools/check_reduced_motion.py`,
  `tools/serve_static.py`, `tools/shoot_all_styles.py` — the checks below.

## Bugs found and fixed during the polish pass

These were found by the automated checks, not by looking at the page.

1. **A long name pushed the header buttons off screen.** `.site-header__brand`
   had `white-space: nowrap`, so "Mohammad Abdullah Al Mamun Chowdhury" made
   the document 457px wide at a 375px viewport. The brand now shrinks and
   wraps; the actions never move.

2. **Blog thumbnails linked to the wrong page.** In `layouts/index.html` and
   `layouts/_default/list.html` the thumbnail's `href` was `{{ $.RelPermalink }}`
   — `$` is the *page* context, so the thumbnail on the home page linked to
   `/` and the thumbnail in the blog list linked to `/blog/`, never to the
   post. Both now use `{{ .RelPermalink }}`, the post's own permalink.

3. **The footer overflowed in the sidebar layout.** The footer is outside
   `<main>`, so it could not borrow the content column's margin; the rule
   added `margin-left: 320px` to a container that was already
   `max-width: 1120px` + `margin-inline: auto`, pushing the document to
   1440px at a 1280px viewport. The footer now pads itself on the left and
   lets its container use the full width.

4. **Every non-home page had two `<h1>`s in the sidebar layout** — the
   profile column's name and the page's own heading. Fixed as described
   above.

5. **The graphite sidebar photo filled the whole column** (320 × 400px),
   which made the column read as a portrait rather than a résumé. It is now
   a 200 × 200px square.

## Checks

### 1. Every style builds clean

```
$ for s in harbor grove orchid graphite saffron; do
    HUGO_PARAMS_STYLE=$s hugo --gc --minify --panicOnWarning --destination "public-$s"
  done
```

```
--- harbor ---
 Pages            │ 13    Processed images │ 28    Total in 64 ms
--- grove ---
 Pages            │ 13    Processed images │ 28    Total in 60 ms
--- orchid ---
 Pages            │ 13    Processed images │ 28    Total in 51 ms
--- graphite ---
 Pages            │ 13    Processed images │ 28    Total in 50 ms
--- saffron ---
 Pages            │ 13    Processed images │ 28    Total in 66 ms
```

**All five pass. Zero warnings, zero errors** — `--panicOnWarning` would have
aborted on any warning. CI now builds all five styles too, so a broken style
fails the build instead of waiting to be noticed.

### 2. Contrast — all 5 styles, both themes

`python tools/check_contrast.py` checks `--ink`, `--muted` and `--accent`
against both `--bg` and `--surface`, and `--accent-ink` against `--accent`,
in the light and the dark theme. 70 checks, every one at least 4.5:1.

| style | theme | `--ink` on bg / surface | `--muted` on bg / surface | `--accent` on bg / surface | `--accent-ink` on accent |
|-------|-------|--------------------------|---------------------------|----------------------------|--------------------------|
| harbor | light | 15.37 / 16.35 | 5.96 / 6.34 | 5.04 / 5.36 | 5.36 |
| harbor | dark | 15.13 / 13.45 | 7.45 / 6.62 | 9.21 / 8.18 | 9.21 |
| grove | light | 13.45 / 14.78 | 5.68 / 6.24 | 5.73 / 6.29 | 6.29 |
| grove | dark | 14.62 / 13.18 | 7.34 / 6.61 | 8.70 / 7.84 | 8.70 |
| orchid | light | 15.58 / 16.55 | 6.08 / 6.46 | 5.82 / 6.19 | 6.19 |
| orchid | dark | 15.70 / 14.32 | 8.22 / 7.50 | 7.31 / 6.67 | 7.31 |
| graphite | light | 15.80 / 14.71 | 6.11 / 5.69 | 5.29 / 4.92 | 5.29 |
| graphite | dark | 14.61 / 13.27 | 6.98 / 6.34 | 7.03 / 6.39 | 7.03 |
| saffron | light | 14.45 / 15.44 | 6.14 / 6.56 | 7.40 / 7.90 | 7.90 |
| saffron | dark | 15.23 / 13.75 | 7.46 / 6.73 | 8.97 / 8.10 | 8.97 |

```
RESULT: PASS — every text colour is at least 4.5:1 in both themes
```

### 3. Lighthouse — mobile home page, every style

`python tools/check_lighthouse.py` builds each style, serves the **built**
output through `tools/serve_static.py` (which brotli-compresses text and sets
a long cache lifetime for fingerprinted assets, the way a real host does),
and runs Lighthouse with its mobile preset.

| style | performance | accessibility | best practices | SEO |
|-------|-------------|---------------|----------------|-----|
| harbor | 100 | 100 | 100 | 100 |
| grove | 99 | 100 | 100 | 100 |
| orchid | 100 | 100 | 100 | 100 |
| graphite | 100 | 100 | 100 | 100 |
| saffron | 100 | 100 | 100 | 100 |

**Lowest score: 99. Every category is at or above 95.**

Metrics behind those scores:

| style | FCP | LCP | TBT | CLS | Speed Index |
|-------|-----|-----|-----|-----|-------------|
| harbor | 0.8s | 1.4s | 0ms | 0 | 0.8s |
| grove | 1.2s | 2.0s | 0ms | 0.005 | 1.2s |
| orchid | 1.1s | 1.4s | 0ms | 0 | 1.1s |
| graphite | 1.2s | 1.7s | 0ms | 0 | 1.2s |
| saffron | 1.1s | 1.6s | 0ms | 0 | 1.1s |

The scores and the metrics behind them are in
`docs/reports/lighthouse/summary.json`. The full Lighthouse JSON is several
hundred kilobytes each, so it is not kept in the repository; the script
writes it, reads what matters back out of it and deletes the rest.

Two notes on the numbers:

- grove's **CLS 0.005** is the web font swapping in; 0.005 is far inside the
  0.1 "good" threshold and it is the only style where the display face
  (Fraunces) changes the name's width.
- The audits Lighthouse still lists as failing are the informational ones —
  "render-blocking resources" (the fonts are preloaded and use
  `font-display: swap`), "network dependency tree" and "image delivery"
  (the images are already WebP at two widths with `srcset`). None of them
  cost any points.

### 4. `prefers-reduced-motion: reduce` — no motion

`python tools/check_reduced_motion.py` emulates the media feature in Chrome
and then reads the computed style of **every element on every page**, looking
for an animation that is still running or a transition that would still take
time. 5 styles × 5 pages = 25 page loads.

```
checked harbor
checked grove
checked orchid
checked graphite
checked saffron

============================================================
No motion under prefers-reduced-motion: reduce
```

It also checks that `scroll-behavior` is `auto` and that the browser really
did report `prefers-reduced-motion: reduce` as matching.

### 5. The polish pass — 8 hostile profiles × 5 styles

`python tools/polish_check.py` swaps `personal/profile.yaml` for a variant,
builds, serves and audits every page at 375px and 1280px. It looks for
horizontal overflow, elements sticking out past the right edge, images with
no alt attribute, a page with more or fewer than one `<h1>`, and sections
that render empty.

| case | what it tests | result |
|------|----------------|--------|
| `long-name` | "Mohammad Abdullah Al Mamun Chowdhury" | clean |
| `long-project-titles` | 60-word project titles | clean |
| `zero-projects` | `projects: []` — the section hides itself | clean |
| `one-project` | a single project | clean |
| `seven-projects` | seven projects, two featured | clean |
| `long-bio` | three long paragraphs | clean |
| `no-phone` | `phone: ""` — the phone row hides itself | clean |
| `project-no-image` | `personal/photos/project-2.jpg` removed | clean |

Run against all five styles: **40 combinations, 40 clean.** This is where
bugs 1–4 above were found.

### 6. Every style × every layout

`python tools/check_layouts.py` runs the same audit for all 25 combinations
of the 5 styles and the 5 hero layouts, with `HUGO_PARAMS_LAYOUT` set to
override the default.

```
OK   harbor/split        OK   harbor/centered    OK   harbor/typographic
OK   harbor/sidebar      OK   harbor/band        OK   grove/split
OK   grove/centered      OK   grove/typographic  OK   grove/sidebar
OK   grove/band          OK   orchid/split       OK   orchid/centered
OK   orchid/typographic  OK   orchid/sidebar     OK   orchid/band
OK   graphite/split      OK   graphite/centered  OK   graphite/typographic
OK   graphite/sidebar    OK   graphite/band      OK   saffron/split
OK   saffron/centered    OK   saffron/typographic OK  saffron/sidebar
OK   saffron/band

============================================================
All 25 style/layout combinations clean
```

### 7. Internal links

```
$ python tools/check_links.py public
checked 150 internal links across 9 pages
no broken internal links
```

### 8. Screenshots

Ten files in `docs/reports/screens/`, one desktop-light and one mobile-dark
per style, taken through the same DevTools-protocol driver the other checks
use (`tools/shoot_all_styles.py`).

| file | size |
|------|------|
| `task02-harbor-desktop-light.png` | 105 KB |
| `task02-harbor-mobile-dark.png` | 61 KB |
| `task02-grove-desktop-light.png` | 85 KB |
| `task02-grove-mobile-dark.png` | 63 KB |
| `task02-orchid-desktop-light.png` | 81 KB |
| `task02-orchid-mobile-dark.png` | 48 KB |
| `task02-graphite-desktop-light.png` | 170 KB |
| `task02-graphite-mobile-dark.png` | 55 KB |
| `task02-saffron-desktop-light.png` | 61 KB |
| `task02-saffron-mobile-dark.png` | 49 KB |

`docs/styles.md` uses the five desktop-light ones.

## What was skipped, and why

- **No Lighthouse run against the Hugo dev server.** The dev server sends
  nothing compressed and sets no cache headers, so every run reported
  "enable text compression" (82 KiB of savings) and "use an efficient cache
  policy" — two findings that describe the dev server, not the site. The
  numbers above are against the built output served the way a host serves
  it. Both servers are in the repo so the difference can be seen.
- **No screenshot of every style on every page.** The task asked for one
  desktop-light and one mobile-dark home page per style. The other pages
  are covered by the automated audits instead.
- **No new photography.** The demo images are the placeholders from
  TASK-01. The styles own the shape of the photo (circle, square, ring,
  overlap), not the photograph.

## What a reviewer should look at by eye

The automated checks cannot judge these:

1. **Do the five styles feel different at a glance?** Open
   `docs/reports/screens/task02-*-desktop-light.png` side by side. They
   should differ in type (Manrope / Fraunces / Space Grotesk / IBM Plex
   Serif / Sora), in colour and in the shape of the hero.
2. **The graphite sidebar.** Scroll the About and Projects pages at 1280px.
   The profile column should stay put while the content moves past it.
   Below 1024px it should become a compact block at the top of the page
   with a 96px photo beside the name.
3. **The saffron band.** The photo should overlap the band's lower edge,
   and the band should run the full width of the window, edge to edge.
4. **The orchid hero.** The name should dominate, and the 96px photo sit
   beside it — beside the name on a phone too, not under the buttons.
5. **Dark mode.** The toggle is in the header on every page. Check that
   nothing is left with a light background, and that the band and the
   picture borders still read correctly.
6. **Focus rings.** Tab through a page. The focus ring must be visible on
   every interactive element in both themes.

## Open questions

- The graphite accent was darkened from the design system's `#1F6FEB` to
  `#1C66DB`. If the design system is the authority, it should be updated
  there too, or graphite should be given an accent that clears 4.5:1 on its
  own surface colour in the first place.
- `params.layout` currently only changes the hero. The task only asked for
  the hero, but "the layout is a property of the page" reads as an
  invitation to move more of the page furniture under the same switch
  later.
- The polish checks build five styles against eight profiles, which takes
  a few minutes. They are not in CI (CI has no browser); they are run by
  hand with `python tools/polish_check.py`.
