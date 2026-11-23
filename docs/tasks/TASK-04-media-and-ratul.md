# TASK-04 — Education/achievement photos, gallery, + Ratul's demo site

Builder: Puku (local). Report: `docs/reports/TASK-04-report.md`.
Read `AGENTS.md`, `docs/DESIGN.md`, `docs/FRIEND-SITE.md` first. PRs #1–#3 are NOT merged yet:
start from `task/03-docs`.

## Part A — template features (branch `task/04-media`, from `task/03-docs`, PR → `task/03-docs`)
Fixed-name convention stays (folder `personal/`). Add, all optional, all hidden when missing:
1. **Education photos**: `personal/photos/edu-1.*`, `edu-2.*` … ↔ Nth item of `education`.
   Shown as a small 4:3 image beside each timeline item (stack on mobile).
2. **Achievement images**: `personal/photos/award-1.*` … ↔ Nth item of `achievements`.
   Click/tap opens the full image in a lightweight, accessible lightbox (`<dialog>`, Esc closes,
   focus returns, no library). Certificates are often portrait scans: use `object-fit: contain`
   on a `--surface` panel, never crop text.
3. **Gallery**: `personal/photos/gallery/*` (any number). New "Moments" section on About page:
   justified-feel masonry using CSS columns (2 mobile / 3 desktop), lazy-loaded, same lightbox,
   optional captions from `gallery:` list in profile.yaml (`file`, `caption`).
4. **Achievements on Home**: if there are ≥2 achievements and <2 projects, Home shows
   "Achievements" instead of "Selected projects" (so a student strong in contests/academics
   leads with that). Add optional `highlight_academics: true` to show CGPA/GPA prominently
   in the facts row.
5. Update `personal/README.md`, `docs/FRIEND-SITE.md`, the demo profile (add demo edu/award/
   gallery images following the TASK-01 non-slop image rules). All checks from AGENTS.md;
   build all 5 styles with `--panicOnWarning`.

## Part B — Ratul's site (branch `friend/ratul`, from `task/04-media`; do NOT open a PR to main)
Input: `_friends-input/ratul/` (local only, not in git) incl. `info-from-alif.md`.
1. Follow `docs/FRIEND-SITE.md`. Style: **graphite** (customise accent shade / section order so
   it doesn't look like the demo).
2. Copy: rewrite into polished, confident English. Make him look strong (academics,
   contests, hackathons, consistency). **Never invent** numbers, ranks, dates, employers or
   links — missing facts → leave empty and list in the report under "Need from Alif".
3. Projects: if the real list isn't provided, include NO fake projects; Home leads with
   achievements/academics (Part A §4). Keep a commented example in profile.yaml.
4. Photos: look at every image yourself. Pick the best portrait for profile (crop 4:5, face
   centered); sort the rest: education (school/college/university if recognisable),
   achievements (certificate/contest), hobbies (motorcycle, travel, football/CR7), gallery
   (the rest that look good). Drop blurry/duplicate/awkward ones; list what you dropped.
   Rename to the fixed names. Strip EXIF/GPS.
5. Build with `--panicOnWarning`, take screenshots (home/about desktop light + mobile dark)
   → `docs/reports/screens/ratul-*.png`.
6. Push `friend/ratul`. Report: what was used where, "Need from Alif" list.
