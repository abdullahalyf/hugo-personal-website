# TASK-03 — README, "new friend site" recipe, dry run

Builder: Puku. Branch: `task/03-docs`. Report: `docs/reports/TASK-03-report.md`.

## Build
1. **`README.md`** (English, short, screenshots from docs/styles.md): what this is,
   preview of 5 styles, and **"Make your site in 10 minutes"**:
   1) Fork this repo on GitHub → 2) edit `personal/profile.yaml` (or ask Alif's agent) →
   3) replace the files in `personal/photos/` and `personal/cv.pdf` with the same names → 4) pick `style` in
   `hugo.toml` → 5) Vercel → Add New Project → import the fork → Deploy (no settings
   needed) → 6) optional: run locally with `hugo server`.
   Plus a "Troubleshooting" section (build error messages from `validate.html` and what
   they mean, Vercel Hugo version).
2. **`docs/FRIEND-SITE.md`** — the reusable agent recipe (I will give this to an agent
   for each friend): input = a friend's filled `docs/INTAKE-FORM.md` answers + photos;
   steps = clone their fork → fill `profile.yaml` (English, rewrite answers into clean
   professional copy WITHOUT inventing facts; anything missing → leave empty, list it in
   the report) → rename the friend's photos to the fixed names in `personal/photos/` + `personal/cv.pdf` → choose style (from the
   form, or the one not yet used by other friends) → build check → push to their fork →
   write `docs/reports/FRIEND-<name>-report.md`.
3. Dry run: create one fictional second profile in a temp branch, follow FRIEND-SITE.md
   end to end, time it, fix anything confusing in the docs. Delete the temp branch.

## Done when
PR open, CI green, report written. Do not merge.
