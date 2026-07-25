# Construction plan

| Package | Files | Verification | Status |
| --- | --- | --- | --- |
| Static foundation | `package.json`, `eleventy.config.js`, `src/_data/` | `npm run build` | Complete |
| Editorial UI | `src/_includes/`, `src/*.njk`, `public/styles.css` | Desktop/responsive screenshots | Complete |
| Content migration | `src/posts/`, `public/assets/imported/` | URL and local-asset checker | Complete |
| SEO and platform | feed, sitemap, robots, headers, redirects, GSC file | Output inspection | Complete |
| Migration tooling | `scripts/import-local.mjs`, `scripts/import-super.mjs` | Re-import and rebuild | Complete |
| Handover | `README.md`, `docs/06-handover.md` | Manual checklist | Complete |

Change boundary: nothing outside the new `site/` directory should be modified during installation into `ExperimentsBlog`.
