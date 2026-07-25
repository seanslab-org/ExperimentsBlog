# Site survey

## Repository and product map

- Source repository: `seanslab-org/ExperimentsBlog`
- Source state: a flat, 33 MB working directory containing 67 Markdown files, 200+ illustrations, published variants, launch packs, and drafts.
- Existing production: `seanslab.org`, rendered from Notion through Super.
- DNS: the apex already uses Cloudflare nameservers (`chloe.ns.cloudflare.com`, `olof.ns.cloudflare.com`).
- Existing public content: eight primary English posts and seven older public notes. Template and Super boilerplate routes are not content.
- Deployment path: GitHub `main` → Cloudflare Pages → static `dist/` output.

## Patterns preserved

- Editorial, minimal, warm visual language.
- Brand palette: cream `#ede8de`, ink `#0f0f0f`, muted `#6a6458`, amber `#f28a1a`.
- Elephantulus mark and star-chart artwork.
- Existing public article paths, RSS, sitemap, canonical metadata, and Google Search Console verification file.

## Risk register

| Risk | Status | Control |
| --- | --- | --- |
| Dirty source repo gets reorganized or overwritten | Verified | New site is isolated under `site/`; root content is untouched. |
| Notion-only posts disappear after cancelling Super | Verified | Public articles and body images were snapshotted into local Markdown/assets. |
| Domain cutover breaks production | Needs owner action | Test `pages.dev` first; export current DNS records before editing them. |
| Old template/boilerplate URLs disappear | Accepted | They are excluded intentionally; they were not articles. |
| One legacy page has no public date | Unverified | `reMarkable Paper Pro Move` uses `2026-01-01` as a sortable fallback. |

## Success signal

The preview builds without a server runtime, all migrated local URLs resolve, responsive layouts render cleanly, and the apex can be attached without changing nameservers.
