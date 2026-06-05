import { LOCALE_META, SITE_NAME, SITE_URL, SUPPORTED_LOCALES } from '@/lib/seo/site';

const icons = {
	icon: '/favicon.ico',
	shortcut: '/logo.png',
	apple: '/logo.png',
};

export const SiteConfig = Object.fromEntries(
	SUPPORTED_LOCALES.map((locale) => {
		const meta = LOCALE_META[locale];

		return [
			locale,
			{
				name: meta.title,
				description: meta.description,
				url: SITE_URL,
				ogImage: `${SITE_URL}/og.png`,
				metadataBase: new URL(SITE_URL),
				keywords: meta.keywords,
				authors: [{ name: SITE_NAME, url: SITE_URL }],
				creator: SITE_NAME,
				icons,
				openGraph: {
					type: 'website',
					locale: meta.ogLocale,
					url: SITE_URL,
					title: meta.title,
					description: meta.description,
					siteName: SITE_NAME,
					images: [
						{
							url: `${SITE_URL}/og.png`,
							width: 1200,
							height: 630,
							alt: meta.title,
						},
					],
				},
				twitter: {
					card: 'summary_large_image',
					title: meta.title,
					description: meta.description,
					images: [`${SITE_URL}/og.png`],
				},
			},
		];
	})
);
