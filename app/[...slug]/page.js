import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getSEOPageBySlug, getAllSEOPageSlugs } from '@/lib/seoPagesData';
import { notFound } from 'next/navigation';
import SEOPageComponent from '@/components/seo';
import { PricingList } from '@/lib/pricingList';
import { TestimonialsList } from '@/lib/testimonialsList';
import {
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
	buildPageMetadata,
	isSupportedLocale,
	normalizeLocale,
} from '@/lib/seo/site';

// Reserved routes that should not be treated as SEO pages
const RESERVED_ROUTES = [
	'blog',
	'auth',
	'admin',
	'about',
	'services',
	'case-studies',
	'en',
	'zh',
	'ja',
	'ar',
	'es',
	'ru',
	'fr',
	'_next',
	'api',
];

function resolveSEOParams(slugArray = []) {
	if (slugArray.length === 3 && slugArray[0] === '__seo__' && isSupportedLocale(slugArray[1])) {
		return { langName: normalizeLocale(slugArray[1]), slug: slugArray[2] };
	}

	if (slugArray.length === 2 && slugArray[0] === '__seo__') {
		return { langName: DEFAULT_LOCALE, slug: slugArray[1] };
	}

	if (slugArray.length === 2 && isSupportedLocale(slugArray[0])) {
		return { langName: normalizeLocale(slugArray[0]), slug: slugArray[1] };
	}

	if (slugArray.length === 1) {
		return { langName: DEFAULT_LOCALE, slug: slugArray[0] };
	}

	return { langName: DEFAULT_LOCALE, slug: undefined };
}

// Pre-generate all known SEO pages at build time for better performance
export async function generateStaticParams() {
	const slugs = getAllSEOPageSlugs();
	const params = [];
	
	for (const lang of SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)) {
		for (const slug of slugs) {
			params.push({
				slug: [lang, slug],
			});
		}
	}
	
	for (const slug of slugs) {
		params.push({
			slug: ['__seo__', DEFAULT_LOCALE, slug],
		});
	}
	
	return params;
}

export async function generateMetadata({ params }) {
	try {
		const slugArray = params?.slug || [];
		const { langName, slug } = resolveSEOParams(slugArray);

		if (RESERVED_ROUTES.includes(slug)) {
			return buildPageMetadata({ locale: defaultLocale, path: '/' });
		}

		const seoData = getSEOPageBySlug(slug, langName);

		if (!seoData) {
			return buildPageMetadata({ locale: defaultLocale, path: '/' });
		}

		return buildPageMetadata({
			locale: langName,
			path: `/${slug}`,
			title: seoData.metaTitle || seoData.title || seoData.heroTitle || 'AI Prototype to Production | VibeToLive.dev',
			description: seoData.metaDescription || seoData.description || seoData.heroSubtitle,
			keywords: seoData.metaKeywords || seoData.keywords || [],
			image: seoData.featuredImage || '/og.png',
		});
	} catch (error) {
		console.error('Error generating metadata:', error);
		return buildPageMetadata({ locale: defaultLocale, path: '/' });
	}
}

export default async function SEOPage({ params }) {
	try {
		const slugArray = params?.slug || [];
		const { langName, slug } = resolveSEOParams(slugArray);

		if (!slug) {
			notFound();
		}

		if (RESERVED_ROUTES.includes(slug)) {
			notFound();
		}

		const seoData = getSEOPageBySlug(slug, langName);

		if (!seoData) {
			notFound();
		}

		if (!seoData.pageTitle && !seoData.heroTitle) {
			notFound();
		}

		const dict = await getDictionary(langName);

		const pricingList = PricingList[`PRICING_${langName.toUpperCase()}`] || [];
		const testimonialsList = TestimonialsList[`TESTIMONIAL_${langName.toUpperCase()}`] || [];

		const serializableSeoData = JSON.parse(JSON.stringify(seoData));

		return (
			<SEOPageComponent
				seoData={serializableSeoData}
				dict={dict}
				langName={langName}
				slug={slug}
				pricingList={pricingList}
				testimonialsList={testimonialsList}
			/>
		);
	} catch (error) {
		// Next.js uses an exception to short-circuit rendering for notFound().
		// In dev, catching and logging it is noisy (shows up as an "error" even though it's expected).
		if (error?.digest === 'NEXT_NOT_FOUND') {
			throw error;
		}
		console.error('Error in SEO page:', error);
		notFound();
	}
}
