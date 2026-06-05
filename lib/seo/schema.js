import { SITE_NAME, SITE_URL, getAbsoluteUrl } from './site';

export function serviceSchema({ name, description, path, locale = 'en', image = '/og.png' }) {
	const url = getAbsoluteUrl(path, locale);

	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		'@id': `${url}#service`,
		name,
		description,
		serviceType: 'AI prototype to production engineering',
		provider: {
			'@type': 'Organization',
			'@id': `${SITE_URL}/#organization`,
			name: SITE_NAME,
			url: SITE_URL,
		},
		areaServed: 'Worldwide',
		url,
		image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
		offers: [
			{
				'@type': 'Offer',
				name: 'Vibe to Live',
				price: '499',
				priceCurrency: 'USD',
				description: 'Fixed-scope production hardening and deployment for an AI-generated prototype.',
				availability: 'https://schema.org/InStock',
			},
			{
				'@type': 'Offer',
				name: 'Add Some Spice',
				price: '999',
				priceCurrency: 'USD',
				description: 'Scoped feature, performance, and technical debt work for AI-built applications.',
				availability: 'https://schema.org/InStock',
			},
			{
				'@type': 'Offer',
				name: 'Keep It Alive',
				price: '250',
				priceCurrency: 'USD',
				description: 'Monthly maintenance, dependency updates, monitoring, and small fixes.',
				availability: 'https://schema.org/InStock',
			},
		],
	};
}

export function faqSchema({ faqList = [], path, locale = 'en' }) {
	if (!faqList.length) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `${getAbsoluteUrl(path, locale)}#faq`,
		mainEntity: faqList.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
}

export function breadcrumbSchema({ items = [], locale = 'en' }) {
	if (items.length < 2) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: getAbsoluteUrl(item.path, locale),
		})),
	};
}

export function compactJsonLd(items) {
	return items.filter(Boolean);
}
