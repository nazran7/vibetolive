import { defaultLocale, getDictionary, locales } from '@/lib/i18n';
import { getSEOPageBySlug, getAllSEOPageSlugs } from '@/lib/seoPagesData';
import { notFound } from 'next/navigation';
import SEOPageComponent from '@/components/seo';
import { PricingList } from '@/lib/pricingList';
import { TestimonialsList } from '@/lib/testimonialsList';
import { SiteConfig } from '@/lib/config/site';
import { cookies } from 'next/headers';

// Helper function to get language from cookie
function getLanguageFromCookie() {
	try {
		const cookieStore = cookies();
		const lang = cookieStore.get('NEXT_LOCALE');
		return lang?.value || defaultLocale;
	} catch (error) {
		return defaultLocale;
	}
}

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

// Valid locale codes
const validLocales = ['en', 'zh', 'ja', 'ar', 'es', 'ru', 'fr'];

// Pre-generate all known SEO pages at build time for better performance
export async function generateStaticParams() {
	const slugs = getAllSEOPageSlugs();
	const params = [];
	
	// Generate params for each language + SEO slug combination
	for (const lang of validLocales) {
		for (const slug of slugs) {
			// Language-prefixed SEO route: /__seo__/[lang]/[slug]
			params.push({
				slug: ['__seo__', lang, slug],
			});
		}
	}
	
	// Also generate default (no language prefix) routes for backward compatibility
	// These will default to 'en'
	for (const slug of slugs) {
		params.push({
			slug: ['__seo__', slug],
		});
	}
	
	return params;
}

export async function generateMetadata({ params }) {
	try {
		// Catch-all route: params.slug is an array
		const slugArray = params?.slug || [];
		
		// Extract language and slug from rewritten path
		// Patterns: /__seo__/[slug] or /__seo__/[lang]/[slug]
		let langName = defaultLocale;
		let slug;
		
		if (slugArray.length === 3 && slugArray[0] === '__seo__' && validLocales.includes(slugArray[1])) {
			// Pattern: /__seo__/[lang]/[slug] - language comes from middleware (cookie)
			langName = slugArray[1];
			slug = slugArray[2];
		} else if (slugArray.length === 2 && slugArray[0] === '__seo__') {
			// Pattern: /__seo__/[slug] - get language from cookie
			langName = getLanguageFromCookie();
			slug = slugArray[1];
		} else if (slugArray.length === 1) {
			// Direct access (shouldn't happen, but handle it)
			slug = slugArray[0];
			langName = getLanguageFromCookie();
		} else {
			return {
				title: SiteConfig[defaultLocale]?.name || 'Page',
			};
		}

		// Check if it's a reserved route
		if (RESERVED_ROUTES.includes(slug)) {
			return {
				title: SiteConfig[defaultLocale]?.name || 'Page',
			};
		}

		const seoData = getSEOPageBySlug(slug, langName);

		if (!seoData) {
			return {
				title: SiteConfig[defaultLocale]?.name || 'SEO Page',
			};
		}

		// Use proper URL for static generation (no headers() call)
		// metadataBase must be a full URL for Next.js metadata API
		// Always use the slug without language prefix in the URL (language is in cookie)
		const metadataBaseUrl = new URL('https://www.vibetolive.dev');
		const canonicalUrl = `${metadataBaseUrl.origin}/${slug}`;

		return {
			title: seoData.metaTitle || seoData.title || `${SiteConfig[langName]?.name || SiteConfig[defaultLocale]?.name}`,
			description: seoData.metaDescription || seoData.description || seoData.heroSubtitle,
			keywords: seoData.metaKeywords || seoData.keywords || [],
			metadataBase: metadataBaseUrl,
			openGraph: {
				...SiteConfig[langName]?.openGraph || SiteConfig[defaultLocale]?.openGraph,
				title: seoData.metaTitle || seoData.title,
				description: seoData.metaDescription || seoData.description || seoData.heroSubtitle,
				images: seoData.featuredImage ? [seoData.featuredImage] : undefined,
				url: canonicalUrl,
			},
			twitter: {
				...SiteConfig[langName]?.twitter || SiteConfig[defaultLocale]?.twitter,
				title: seoData.metaTitle || seoData.title,
				description: seoData.metaDescription || seoData.description || seoData.heroSubtitle,
			},
			alternates: {
				canonical: canonicalUrl,
			},
		};
	} catch (error) {
		console.error('Error generating metadata:', error);
		return {
			title: SiteConfig[defaultLocale]?.name || 'Page',
		};
	}
}

export default async function SEOPage({ params }) {
	try {
		// Catch-all route: params.slug is an array
		const slugArray = params?.slug || [];
		
		// Extract language and slug from rewritten path
		// Patterns: /__seo__/[slug] or /__seo__/[lang]/[slug]
		let langName = defaultLocale;
		let slug;
		
		if (slugArray.length === 3 && slugArray[0] === '__seo__' && validLocales.includes(slugArray[1])) {
			// Pattern: /__seo__/[lang]/[slug] - language comes from middleware (cookie)
			langName = slugArray[1];
			slug = slugArray[2];
		} else if (slugArray.length === 2 && slugArray[0] === '__seo__') {
			// Pattern: /__seo__/[slug] - get language from cookie
			langName = getLanguageFromCookie();
			slug = slugArray[1];
		} else if (slugArray.length === 1) {
			// Direct access (shouldn't happen, but handle it)
			slug = slugArray[0];
			langName = getLanguageFromCookie();
		} else {
			notFound();
		}

		// Check if it's a reserved route - let Next.js handle it normally
		if (RESERVED_ROUTES.includes(slug)) {
			notFound();
		}

		// Try to fetch SEO data
		// Get SEO data directly from local data (no async needed)
		const seoData = getSEOPageBySlug(slug, langName);

		// If no SEO data found, return 404
		if (!seoData) {
			notFound();
		}

		// Final validation - ensure we have the essential data
		if (!seoData.pageTitle && !seoData.heroTitle) {
			notFound();
		}

		// Get dictionary for the detected language
		const dict = await getDictionary(langName);

		// Get static pricing and testimonials for the detected language
		const pricingList = PricingList[`PRICING_${langName.toUpperCase()}`] || [];
		const testimonialsList = TestimonialsList[`TESTIMONIAL_${langName.toUpperCase()}`] || [];

		// Ensure seoData is properly serializable for client component
		// Create a clean copy to avoid any serialization issues
		const serializableSeoData = JSON.parse(JSON.stringify(seoData));

		return (
			<SEOPageComponent
				seoData={serializableSeoData}
				dict={dict}
				langName={langName}
				pricingList={pricingList}
				testimonialsList={testimonialsList}
			/>
		);
	} catch (error) {
		console.error('Error in SEO page:', error);
		notFound();
	}
}

