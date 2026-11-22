# TASK-02 — The other 4 styles, layout polish, quality pass

Builder: Puku. Branch: `task/02-styles` (from `main` after TASK-01 is merged).
Report: `docs/reports/TASK-02-report.md`. Read `AGENTS.md` + `docs/DESIGN.md` first.

## Build
1. `styles/grove.css`, `orchid.css`, `graphite.css`, `saffron.css` with the exact tokens,
   fonts and hero layouts from DESIGN.md §3–4 (light + dark). Fix any token that fails
   4.5:1 within the same hue and list the change.
2. Fully style the 4 remaining hero layouts (centered, typographic, sidebar, band) and
   photo shapes. Sidebar layout = sticky profile column on ≥1024px for the whole page,
   not just the hero.
3. `params.layout` override works (any style + any layout combination must not break).
4. Each style must feel clearly different at first glance (type + colour + hero), while
   sharing the same components. If two styles look too similar, push the difference in
   the hero only.
5. Polish pass on all pages: spacing rhythm, long names (test "Mohammad Abdullah Al
   Mamun Chowdhury"), long project titles, 0/1/7 projects, a project with no image,
   very long bio, missing phone.
6. Add `docs/styles.md`: one screenshot per style (desktop home, light) + one line on
   who it suits.

## Checks (real output in report)
- Build each style: loop `hugo --gc --minify --panicOnWarning` with
  `HUGO_PARAMS_STYLE=<style>` for all 5 → all pass.
- Screenshots: per style home desktop light + mobile dark →
  `docs/reports/screens/task02-<style>-*.png` (10 files, compressed).
- Lighthouse mobile home for every style: table of 4 scores each. All ≥ 95 or explain.
- Contrast table for all styles, both themes.
- `prefers-reduced-motion` emulated: no motion.

## Done when
PR open, CI green, report written. Do not merge.
