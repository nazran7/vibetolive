import { getAllSEOPageSlugs } from '@/lib/seoPagesData';
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

	return [
		...localizedStaticEntries,
		{
			url: getAbsoluteUrl('/blog', DEFAULT_LOCALE),
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.7,
		},
		...seoEntries,
	];
}
