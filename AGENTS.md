# AGENTS.md — docs

The single instruction file of this repository (`CLAUDE.md` points here).

## What this is

The documentation site of [abap-util](https://github.com/abap-util/abap-util)
(ABAP utility classes, prefix `zabaputil_`) and its sibling
[business-api](https://github.com/abap-util/business-api) (BAPI wrappers,
classes `zabaputil_cl_bus_*`). A [VitePress](https://vitepress.dev/) site,
published by GitHub Pages at <https://abap-util.github.io/docs/>.

**Language:** English — pages, comments, commit messages.

## Layout

```
docs/
├─ .vitepress/config.mjs   navigation, sidebar, theme; the site base is /docs/
├─ .vitepress/theme/       style overrides
├─ public/                 static files, served below the base (logo_util.png)
├─ index.md                landing page
├─ guide/                  concepts: installation, architecture, renaming, business-api, ...
└─ api/                    the reference, one page per method prefix or class
scripts/check-names.mjs    the gate, see below
.github/workflows/         check (gate + build), deploy (Pages), bump-deps (monthly)
```

A new page needs its entry in the sidebar of `docs/.vitepress/config.mjs`.
Links in the theme config are rewritten with the base; entries of `head` are
not — write `/docs/...` there.

## The docs follow abap-util `main`

The pages describe what `main` of abap-util and of business-api ship — not a
branch, not a plan. When the sources change, the pages change with them; a
class or method that is gone from `main` is gone from the docs.

**Read the source before describing it.** Clone the repositories read-only
into a temp directory (never into this repository) and take signatures,
defaults and behaviour from the class, not from memory or from another page.
Do not invent methods.

## The gate: every `zabaputil_*` name must exist

`npm run check` (`scripts/check-names.mjs`) compares every `zabaputil_*` name
in `docs/**/*.md`, case-insensitively, with the sources of both repositories:

- a name must be an object — a file under `src/` carries it;
- a name followed by `*` or ending in `_` is a prefix and must match at least
  one object;
- `zabaputil_...=>name` (or `->name`) must be a member the class declares —
  write a method with its class when you mention it in prose, so it is checked.

It prints `file:line` for every finding and exits 1. A name that is wrong on
purpose (a placeholder in an example) goes into `ALLOW` in the script, with its
reason; an entry no page uses is a finding as well. Never silence a finding
there that is a real name gone stale — fix the page.

The sources are shallow clones of `main`. Other refs and offline runs:

```bash
ABAP_UTIL_REF=<ref> BUSINESS_API_REF=<ref> npm run check     # a branch, tag or commit
ABAP_UTIL_DIR=../abap-util BUSINESS_API_DIR=../business-api npm run check   # local checkouts, no network
```

The gate checks names, not prose: method lists in tables, parameters and
behaviour are still yours to verify against the source.

## Verify

```bash
npm ci
npm run check        # the gate
npm run docs:build   # the site builds; dead internal links fail the build
npm run docs:dev     # local preview at http://localhost:5173/docs/
```

CI: `check` runs the gate and the build on every pull request and every push
to `main`; `deploy` publishes `main` to GitHub Pages. Actions are pinned to a
commit sha with the tag as a comment; `bump-deps` moves the pins and the npm
dependencies once a month in one pull request.
