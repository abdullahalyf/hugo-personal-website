# Your personal folder

Everything that makes this site *yours* is in this folder. Nothing outside it needs editing
(except `style` in `hugo.toml`).

| File | What | Required |
|---|---|---|
| `profile.yaml` | all text: name, bio, education, projects, links… | yes |
| `photos/profile.jpg` | your portrait, square or 4:5, at least 800 px | yes |
| `photos/project-1.jpg`, `project-2.jpg` … | screenshot for 1st, 2nd … project in `profile.yaml` | no |
| `photos/hobby-1.jpg`, `hobby-2.jpg` … | photo for 1st, 2nd … hobby | no |
| `photos/edu-1.jpg`, `edu-2.jpg` … | photo for 1st, 2nd … entry in `education` | no |
| `photos/award-1.jpg`, `award-2.jpg` … | certificate for 1st, 2nd … entry in `achievements` | no |
| `photos/gallery/` | any number of photos for the "Moments" section | no |
| `cv.pdf` | your CV | no |

Rules:
- Keep the exact file names. `.jpg`, `.jpeg`, `.png`, `.webp` all work.
- To replace a demo file, overwrite it with yours using the same name.
- No file → that image (or the "Download CV" button) is simply not shown.
- Big photos are fine; the site resizes and compresses them automatically.

## The photo sections

Four optional photo slots. Every one of them is hidden when the file is
missing, so you only add the ones you have.

**Education photos** — `photos/edu-1.jpg` sits beside the first entry in
`education`, `edu-2.jpg` beside the second, and so on. The number is the
position in the list, newest first. The image is cropped to 4:3.

**Achievement certificates** — `photos/award-1.jpg` belongs to the first
entry in `achievements`. Certificates are usually portrait scans, so they
are shown whole on a light panel, never cropped, and clicking one opens it
full size.

**Gallery** — drop any number of files into `photos/gallery/`. They appear
in a "Moments" section on the About page. To order them and give them
captions, list them in `profile.yaml`:

```yaml
gallery:
  - file: "ride"
    caption: "On the way to the hills"
  - file: "market"
    caption: "Saturday at the market"
```

`file` is the name without the extension. Images you do not list are shown
after the listed ones, with no caption. Clicking any image opens it full
size; `Esc` closes it.

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
