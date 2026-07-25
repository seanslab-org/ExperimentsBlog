# Resource alignment

## Confirmed

- Existing GitHub repository and `main` branch.
- Domain already delegated to Cloudflare DNS.
- Local Markdown and brand artwork.
- Public access to the current Notion/Super pages for the one-time export.
- Static build: Node.js 22+ and Eleventy 3.1.6.

## Cost boundary

- Hosting budget: $0.
- Cloudflare Pages Free currently provides 500 builds/month, one concurrent build, and up to 20,000 files per site.
- This build produces about 50 files and roughly 6 MB, with no Functions, Workers, R2, database, analytics, or paid font service.
- Domain renewal is pre-existing and is not part of the hosting budget.

## Owner actions still required

- Authorize Cloudflare Pages to read the GitHub repository.
- Review the `pages.dev` preview.
- Export/screenshot the existing Cloudflare DNS records.
- Add the production custom domains after preview acceptance.
- Cancel Super only after the production domain has been verified.
