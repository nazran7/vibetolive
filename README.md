# VibeToLive.dev

VibeToLive.dev helps founders, indie hackers, and lean teams turn AI-generated prototypes into secure, scalable, production-ready applications.

The site is built with Next.js App Router and includes localized marketing pages, SEO guide pages, canonical metadata, hreflang alternates, structured data, robots, sitemap, and an `llms.txt` index.

## SEO Architecture

- Canonical domain: `https://www.vibetolive.dev`
- Default locale: English with no URL prefix
- Localized prefixes: `/zh`, `/ja`, `/ar`, `/es`, `/ru`, `/fr`
- Legacy locale aliases redirect permanently to canonical URLs
- App Router metadata generates canonical, Open Graph, Twitter, and hreflang tags
- `app/sitemap.js` generates the XML sitemap with alternate-language entries
- `app/robots.ts` points crawlers to the canonical sitemap
- Service, FAQ, breadcrumb, organization, and website JSON-LD are rendered server-side

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

The production build should generate the localized SEO pages, `/sitemap.xml`, and `/robots.txt`.
