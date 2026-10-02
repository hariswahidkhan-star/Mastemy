# SEO endpoints (wave 2)

All anonymous. Require configuration `Seo:PublicBaseUrl` (absolute http(s) origin of the public site,
e.g. `https://mastemy.com`). When it is missing or invalid both endpoints return **503** problem+json
with title `seo_not_configured` and a detail naming `Seo:PublicBaseUrl`.

## GET /sitemap.xml (alias GET /api/seo/sitemap.xml)

`application/xml; charset=utf-8`, `Cache-Control: public, max-age=3600`. A sitemaps.org `urlset` with:

- static public pages: `/`, `/courses`, `/free-lessons`, `/verify`, `/teach`, `/about`, `/help`, `/contact`
  (`/` and `/courses` carry `lastmod` = newest live course change);
- `/categories/{slug}` for categories that contain at least one live course (`lastmod` = newest of them);
- `/courses/{slug}` for every live course (`AccessService.IsLiveExpr`), `lastmod` = max(UpdatedAt, PublishedAt).

Locale scheme: no path prefix. Each page appears twice, English (`{url}`) and Arabic (`{url}?lang=ar`), and
every entry lists `xhtml:link rel="alternate"` for `en`, `ar` and `x-default` (English).
Never listed: drafts, archived courses, `/learn`, `/me`, `/studio`, `/admin`, `/attempts`.

## GET /robots.txt (alias GET /api/seo/robots.txt)

`text/plain`. `User-agent: *`, `Disallow:` `/me`, `/studio`, `/admin`, `/attempts`, `/learn/`, `/api/`,
`/login`, `/register`; `Allow: /`; `Sitemap: {PublicBaseUrl}/sitemap.xml`.
