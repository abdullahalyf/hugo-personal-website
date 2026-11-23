# Look recipes — so no two friends get the same site

Pick one recipe per person. Each recipe is a few lines: two in `hugo.toml`
(`[params]`) and two in `personal/profile.yaml`. Nothing else changes.

| # | style | layout | sidebar_side | background | home_sections order (after the hero) | Used by |
|---|-------|--------|--------------|------------|--------------------------------------|---------|
| 1 | graphite | sidebar | left (default) | dots | brief, facts, skills, projects, moments, achievements, grades, contact | Ratul |
| 2 | orchid | sidebar | right | lines | facts, brief, grades, projects, skills, moments, contact | Shruty |
| 3 | harbor | split | - | dots | brief, projects, skills, achievements, moments, contact | free |
| 4 | grove | centered | - | lines | facts, skills, projects, brief, moments, contact | free |
| 5 | saffron | band | - | none | brief, skills, moments, projects, achievements, contact | free |
| 6 | orchid | typographic | - | dots | facts, projects, brief, skills, grades, contact | free |

Where each setting goes:

```toml
# hugo.toml
[params]
  style = "grove"
  layout = "centered"        # omit to use the style's default
```

```yaml
# personal/profile.yaml
background: lines            # dots | lines | none
sidebar_side: right          # only for layout sidebar
home_sections: [facts, skills, projects, brief, moments, contact]
```

Rules: a section not listed in `home_sections` is hidden; empty data hides the
section too. Reorder the project list as well, so even the same projects
read differently.
