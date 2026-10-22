# seanslab.org DNS before apex cutover (2026-10-22)

Cloudflare account: seanspsong@icloud.com (7227f78f45739abacabc6490ff7f0c5a), zone seanslab.org, plan Free.

| Name | Type | Content | Proxy | TTL |
|---|---|---|---|---|
| seanslab.org | A | 76.76.21.21 (Vercel / Super.so, returned DEPLOYMENT_NOT_FOUND) | Proxied | Auto |
| agent.seanslab.org | Tunnel | pcloud-agent | Proxied | Auto |
| blog.seanslab.org | CNAME | seanslab-experiments-blog.pages.dev | Proxied | Auto |
| sig1._domainkey.seanslab.org | CNAME | sig1.dkim.seanslab.org.at.icloudmailadmin.com | DNS only | 1 hr |
| voice.seanslab.org | Tunnel | pcloud-agent | Proxied | Auto |
| voimarkable.seanslab.org | CNAME | voimarkable.pages.dev | DNS only | Auto |
| www.seanslab.org | CNAME | external.notion.site (returned Cloudflare 1014) | Proxied | Auto |
| seanslab.org | MX | mx01.mail.icloud.com (pri 10) | DNS only | 1 hr |
| seanslab.org | MX | mx02.mail.icloud.com (pri 10) | DNS only | 1 hr |
| _dmarc.seanslab.org | TXT | v=DMARC1; p=reject; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net; | DNS only | Auto |
| seanslab.org | TXT | v=spf1 include:icloud.com ~all | DNS only | 1 hr |
| seanslab.org | TXT | apple-domain=TsSdmbVEjCnMNqF7 | DNS only | 1 hr |
| seanslab.org | TXT | google-site-verification=3H5uuthZ-hrvx6TWko5geWimvxNggdsDHLh7hANRS4U | DNS only | Auto |

Pages project seanslab-experiments-blog custom domains before cutover: blog.seanslab.org (Active).

## After cutover (2026-10-22)

Added `seanslab.org` and `www.seanslab.org` as custom domains on Pages project `seanslab-experiments-blog`. Cloudflare replaced the apex A record and the www Notion CNAME with proxied CNAMEs to `seanslab-experiments-blog.pages.dev`. All three hostnames (apex, www, blog) return 200 over valid HTTPS.

Rollback: remove the two custom domains in Pages, then restore the apex A `76.76.21.21` and www CNAME `external.notion.site` from the table above.

## www redirect (2026-10-22)

Redirect Rules → "Redirect from WWW to root [Template]": `https://www.*` → `https://${1}`, 301, preserve query string. Verified `https://www.seanslab.org/posts/?utm_source=test` → `https://seanslab.org/posts/?utm_source=test`.
