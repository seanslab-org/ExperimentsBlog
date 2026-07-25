# QA report

## Automated evidence

- `npm run build`: pass, Eleventy 3.1.6, 21 HTML/XML templates plus static assets, approximately 0.14 seconds locally.
- `npm run check`: pass. Required outputs, page metadata, canonical tags, internal links, and local image references resolve.
- `npm audit --audit-level=high`: pass, zero vulnerabilities. Eleventy uses an audited `@11ty/recursive-copy` override until that update lands in its default dependency range.
- Output size: roughly 6 MB and about 50 files, far below Cloudflare Pages Free limits.

## Visual evidence

- [Desktop homepage](evidence/home-desktop.png)
- [Responsive homepage at 500 px](evidence/home-responsive-500.png)
- [Long-form article](evidence/article-desktop.png)

The visual pass found and fixed a missing-logo copy error and an invalid responsive width expression. The corrected layouts have coherent hierarchy, no clipping at the reliable 500 px headless breakpoint, and readable long-form measure.

## Tooling note

The gstack browse daemon was killed by the local OS with exit 137 on repeated starts. Direct local Chrome rendering was used for screenshots instead. Static checks cover all output URLs and assets.

## Known limitations

- `reMarkable Paper Pro Move` exposes no publication date in the public page; the archive snapshot uses `2026-01-01` as a fallback.
- Template/boilerplate routes from the old Super workspace are intentionally not migrated.
- Production DNS and TLS cannot be verified until the owner creates the Pages project and attaches the domain.
