# Cloudflare Pages handover

## 1. Commit and push

From the `ExperimentsBlog` repository:

```bash
git add site
git commit -m "feat: publish blog at blog.seanslab.org"
git push origin main
```

Review the staged file list before committing because the repository already contains unrelated uncommitted work.

## 2. Create the Pages project

In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.

- Repository: `seanslab-org/ExperimentsBlog`
- Production branch: `main`
- Root directory: `site`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION=22`

Cloudflare's Git integration deploys `main` to production and other branches as previews. See the official [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/).

## 3. Accept the preview

On the generated `*.pages.dev` URL, check:

- `/`
- `/posts/`
- the newest post and one image-heavy post
- `/feed.xml`
- `/sitemap.xml`
- `/googlecc67cb4029cf16a0.html`
- mobile width and navigation

## 4. Cut over the domain

First export or screenshot the current Cloudflare DNS records. The apex-domain Super target does not need to change.

In the Pages project, open **Custom domains** and add `blog.seanslab.org`.

The domain already uses Cloudflare nameservers, so Pages can create the subdomain record automatically. If Cloudflare reports a conflicting `blog` record, inspect and preserve it before making any change. Do not create a Pages CNAME manually before associating the custom domain in the Pages dashboard; Cloudflare documents that this can produce a 522. See [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## 5. Verify and retire Super

- Confirm `https://blog.seanslab.org` uses HTTPS and is the canonical origin emitted by the templates.
- Verify the Google Search Console file and submit `/sitemap.xml`.
- Keep the current Super-backed apex site active while checking article paths.
- Retire or redirect the old blog location only when the subdomain is stable.

## Rollback

Detach the Pages custom domain and restore any pre-existing `blog` DNS record. The Git migration does not modify the Notion workspace or the apex-domain DNS record, so the old origin remains available during the acceptance window.
