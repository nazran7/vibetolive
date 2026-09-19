import { getAllSEOPageSlugs } from '@/lib/seoPagesData';
import { getAllPosts } from '@/lib/blog';
import {
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
	getAbsoluteUrl,
	getAlternateLanguages,
} from '@/lib/seo/site';

const staticPaths = ['/', '/about', '/services', '/case-studies'];
const now = new Date();

function localizedEntry(path, locale, priority, changeFrequency = 'weekly') {
	return {
		url: getAbsoluteUrl(path, locale),
		lastModified: now,
		changeFrequency,
		priority,
		alternates: {
			languages: getAlternateLanguages(path),
		},
	};
}

export default function sitemap() {
	const localizedStaticEntries = staticPaths.flatMap((path) =>
		SUPPORTED_LOCALES.map((locale) =>
			localizedEntry(path, locale, path === '/' ? 1 : 0.8, path === '/' ? 'weekly' : 'monthly')
		)
	);

	const seoEntries = getAllSEOPageSlugs().flatMap((slug) =>
		SUPPORTED_LOCALES.map((locale) => localizedEntry(`/${slug}`, locale, 0.85, 'weekly'))
	);

	const blogPostEntries = getAllPosts().map((post) => ({
		url: getAbsoluteUrl(`/blog/${post.slug}`, DEFAULT_LOCALE),
		lastModified: new Date(post.updatedAt || post.publishedAt),
		changeFrequency: 'monthly',
		priority: 0.6,
	}));

	return [
		...localizedStaticEntries,
		{
			url: getAbsoluteUrl('/blog', DEFAULT_LOCALE),
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.7,
		},
		...blogPostEntries,
		...seoEntries,
	];
}
