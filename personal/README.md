# Your personal folder

Everything that makes this site *yours* is in this folder. Nothing outside it needs editing
(except `style` in `hugo.toml`).

| File | What | Required |
|---|---|---|
| `profile.yaml` | all text: name, bio, education, projects, links… | yes |
| `photos/profile.jpg` | your portrait, square or 4:5, at least 800 px | yes |
| `photos/project-1.jpg`, `project-2.jpg` … | screenshot for 1st, 2nd … project in `profile.yaml` | no |
| `photos/hobby-1.jpg`, `hobby-2.jpg` … | photo for 1st, 2nd … hobby | no |
| `cv.pdf` | your CV | no |

Rules:
- Keep the exact file names. `.jpg`, `.jpeg`, `.png`, `.webp` all work.
- To replace a demo file, overwrite it with yours using the same name.
- No file → that image (or the "Download CV" button) is simply not shown.
- Big photos are fine; the site resizes and compresses them automatically.

## Delete the demo files you do not need

This folder ships with a demo person in it. Overwriting is only half the job:
**delete the files that belong to the demo but not to you**, or the site will
show somebody else's photo on your page.

The photo names are positional, so the rule is simple: keep exactly as many
`project-N.jpg` files as you have projects, and as many `hobby-N.jpg` files as
you have hobbies. Anything beyond that is a leftover.

| Situation | Do this |
|---|---|
| You have 2 projects, the demo has 4 | delete `photos/project-3.jpg` and `photos/project-4.jpg` |
| You have no hobbies | delete `photos/hobby-1.jpg` and `photos/hobby-2.jpg` |
| You have no CV | delete `cv.pdf` — otherwise the button opens the demo CV |

The demo's blog posts live one folder up, in `content/blog/`. Delete them
there if you are not writing your own; the Blog link then disappears from
the navigation by itself.

To check that nothing of the demo is left:

```bash
grep -ril "tanvir" public/
```
