# blog.seanslab.org static site

Zero-budget static blog for Cloudflare Pages. Content is compiled by Eleventy; production serves plain HTML, CSS, images, RSS, and a sitemap with no database or server runtime.

## Local development

```bash
npm install
BLOG_SOURCE_DIR=.. npm run import:local
npm run dev
```

When this `site/` directory lives inside `ExperimentsBlog/`, `BLOG_SOURCE_DIR=..` is the default.

The repository already contains snapshots of the English posts that existed only in Super/Notion. Before cancelling Super, they can be refreshed once with `npm run import:super`; this requires network access and Pandoc. The importer also saves article images locally.

Production build and validation:

```bash
npm ci
npm run build
npm run check
```

## Cloudflare Pages

- Project: `seanslab-blog`
- Preview URL: `https://seanslab-blog.pages.dev`
- Production URL: `https://blog.seanslab.org`
- Framework preset: `Eleventy`
- Root directory: `site`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
- Environment variables: none

The project is connected to the GitHub repository and its `pages.dev` deployment has been verified. `blog.seanslab.org` is registered under **Pages → Custom domains** and will activate after the zone-owning Cloudflare account adds a proxied CNAME from `blog` to `seanslab-blog.pages.dev`.

Leave the existing apex-domain Super/Notion DNS target in place. Verify the Pages preview, article URLs, `/feed.xml`, `/sitemap.xml`, and the Google verification file before promoting the new blog URL.
