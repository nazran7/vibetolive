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

## Writing a blog post

The blog has no CMS or database. Each post is a JSON file in `content/blog/`, and the filename is the URL slug: `content/blog/my-post.json` is served at `/blog/my-post`. Put the post's images in `public/blog/my-post/`.

```json
{
	"title": "My Post Title",
	"publishedAt": "2026-09-20",
	"updatedAt": "2026-09-20",
	"excerpt": "Shown on the blog card and used as the meta description if metaDescription is empty.",
	"coverImage": "/blog/my-post/cover.jpg",
	"categories": ["AI Development"],
	"tags": ["production readiness"],
	"metaTitle": "Optional SEO title",
	"metaDescription": "Optional SEO description",
	"sections": [
		{
			"heading": "Introduction",
			"html": "<p>Paragraph with <strong>bold</strong> text and <a href=\"https://www.vibetolive.dev/\">a link</a>.</p>",
			"images": ["/blog/my-post/diagram.webp"],
			"videos": ["https://www.youtube.com/watch?v=VIDEO_ID"]
		}
	]
}
```

- Posts are listed newest first by `publishedAt`. `updatedAt` is optional and feeds the sitemap's `lastModified`.
- Every field inside a section is optional.
- Add `"draft": true` to keep a post out of the blog, sitemap, and build.
- Keep the cover as a JPEG, because it is also the social preview image and LinkedIn can't show WebP: `cjpeg -quality 82 -optimize -progressive -outfile cover.jpg input.png`.
- Use WebP for images inside the post: `cwebp -q 85 input.png -o diagram.webp`.

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
