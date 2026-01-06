import { defaultLocale, getDictionary, locales } from '@/lib/i18n';
import { getSEOPageBySlug, getAllSEOPageSlugs } from '@/lib/seoPagesData';
import { notFound } from 'next/navigation';
import SEOPageComponent from '@/components/seo';
import { PricingList } from '@/lib/pricingList';
import { TestimonialsList } from '@/lib/testimonialsList';
import { SiteConfig } from '@/lib/config/site';
import { headers } from 'next/headers';

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

// Pre-generate all known SEO pages at build time for better performance
export async function generateStaticParams() {
	const slugs = getAllSEOPageSlugs();
	// Return both direct paths and rewritten paths for static generation
	return slugs.map((slug) => ({
		slug: ['__seo__', slug], // Rewritten path from middleware
	}));
}

export async function generateMetadata({ params }) {
	// Catch-all route: params.slug is an array
	// Handle both direct slugs and rewritten slugs from middleware
	const slugArray = params?.slug || [];
	
	// Extract slug from rewritten path or direct path
	let slug;
	if (slugArray.length === 2 && slugArray[0] === '__seo__') {
		slug = slugArray[1];
	} else if (slugArray.length === 1) {
		slug = slugArray[0];
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

	const seoData = getSEOPageBySlug(slug);

	if (!seoData) {
		return {
			title: SiteConfig[defaultLocale]?.name || 'SEO Page',
		};
	}

	const headersList = await headers();
	const host = headersList.get('host');
	const protocol = host?.includes('localhost') ? 'http' : 'https';
	const baseUrl = `${protocol}://${host}`;

	return {
		title: seoData.metaTitle || seoData.title || `${SiteConfig[defaultLocale]?.name}`,
		description: seoData.metaDescription || seoData.description || seoData.heroSubtitle,
		keywords: seoData.metaKeywords || seoData.keywords || [],
		metadataBase: SiteConfig[defaultLocale]?.metadataBase,
		openGraph: {
			...SiteConfig[defaultLocale]?.openGraph,
			title: seoData.metaTitle || seoData.title,
			description: seoData.metaDescription || seoData.description || seoData.heroSubtitle,
			images: seoData.featuredImage ? [seoData.featuredImage] : undefined,
			url: `${baseUrl}/${slug}`,
		},
		twitter: {
			...SiteConfig[defaultLocale]?.twitter,
			title: seoData.metaTitle || seoData.title,
			description: seoData.metaDescription || seoData.description || seoData.heroSubtitle,
		},
		alternates: {
			canonical: `${baseUrl}/${slug}`,
		},
	};
}

export default async function SEOPage({ params }) {
	// Catch-all route: params.slug is an array
	// Handle both direct slugs and rewritten slugs from middleware
	const slugArray = params?.slug || [];
	
	console.log('=== SEO ROUTE MATCHED ===', {
		slugArray,
		length: slugArray.length,
		firstSegment: slugArray[0],
	});
	
	// If rewritten from middleware, the first segment will be "__seo__"
	let slug;
	if (slugArray.length === 2 && slugArray[0] === '__seo__') {
		// This was rewritten from middleware
		slug = slugArray[1];
		console.log('SEO Route: Detected rewritten path, using slug:', slug);
	} else if (slugArray.length === 1) {
		// Direct access (shouldn't happen due to [lang] priority, but handle it)
		slug = slugArray[0];
	} else {
		console.log('SEO Route: Invalid slug array length, returning 404');
		notFound();
	}
	
	console.log('SEO Route: Processing slug:', slug);

	// Check if it's a reserved route - let Next.js handle it normally
	if (RESERVED_ROUTES.includes(slug)) {
		notFound();
	}

	// Try to fetch SEO data
	// Get SEO data directly from local data (no async needed)
	const seoData = getSEOPageBySlug(slug);
	
	// Debug logging
	console.log('SEO Page Debug - Server:', {
		slug,
		hasSeoData: !!seoData,
		seoDataKeys: seoData ? Object.keys(seoData) : null,
		pageTitle: seoData?.pageTitle,
		heroTitle: seoData?.heroTitle,
	});

	// If no SEO data found, return 404
	if (!seoData) {
		console.error(`SEO page not found for slug: ${slug}`);
		notFound();
	}

	// Use default locale for SEO pages (or detect from browser/preferences)
	const langName = defaultLocale;
	const dict = await getDictionary(langName);
	
	// Additional debug
	console.log('SEO Page - Passing to component:', {
		hasSeoData: !!seoData,
		pageTitle: seoData.pageTitle,
		hasDict: !!dict,
	});

	// Get static pricing and testimonials
	const pricingList = PricingList[`PRICING_${langName.toUpperCase()}`] || [];
	const testimonialsList = TestimonialsList[`TESTIMONIAL_${langName.toUpperCase()}`] || [];

	// Final validation - ensure we have the essential data
	if (!seoData.pageTitle && !seoData.heroTitle) {
		console.error('ERROR: SEO page missing title:', slug);
		notFound();
	}

	return (
		<SEOPageComponent
			seoData={seoData}
			dict={dict}
			langName={langName}
			pricingList={pricingList}
			testimonialsList={testimonialsList}
		/>
	);
}

