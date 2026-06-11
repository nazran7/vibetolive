import Hero from '@/components/seo/hero';
import Feature from '@/components/seo/feature';
import SeoPricing from '@/components/seo/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/seo/faq';
import Cta from '@/components/home/cta';
import { FAQList } from '@/lib/faqsList';
import RelatedGuides from '@/components/seo/relatedGuides';
import JsonLd from '@/components/seo/jsonLd';
import { breadcrumbSchema, compactJsonLd, faqSchema, serviceSchema } from '@/lib/seo/schema';
import AiPrototypeToProductionPage from './aiPrototypeToProduction';
import FromLovableToProductionPage from './fromLovableToProduction';
import FromBoltToProductionPage from './fromBoltToProduction';
import FromV0ToProductionPage from './fromV0ToProduction';
import FromReplitToProductionPage from './fromReplitToProduction';
import FromCursorToProductionPage from './fromCursorToProduction';

// Long-form SEO pages: use <SeoPricing /> from @/components/seo/pricing for the canonical pricing block.

export default function SEOPageComponent({
	seoData,
	dict,
	langName,
	slug,
	pricingList,
	testimonialsList,
}) {

	// If no seoData, show error message
	if (!seoData) {
		return (
			<div className='container mx-auto md:px-5 py-20'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold mb-4 text-red-500'>SEO Page Data Not Found</h1>
					<p className='text-base-content/70'>Please check the console for details.</p>
					<p className='mt-4 text-sm'>Debug: seoData is {seoData === null ? 'null' : seoData === undefined ? 'undefined' : 'exists'}</p>
				</div>
			</div>
		);
	}

	// Build locale objects from SEO data - use SEO data ONLY
	// IMPORTANT: Don't fall back to dict - if SEO data is missing, show empty string
	const heroLocale = {
		h1: seoData.pageTitle || seoData.heroTitle || 'MISSING TITLE',
		h2: seoData.heroSubtitle || 'MISSING SUBTITLE',
	};
	
	const featureLocale = {
		h2: seoData.sectionLabel || '',
		h3: seoData.sectionHeading || '',
		description1: seoData.sectionDescription || '',
	};
	
	const ctaLocale = {
		h2: seoData.ctaHeadline || '',
		h3: seoData.ctaSubtext || '',
	};
	
	
	const ctaButtonLocale = {
		btn1: seoData.ctaButton || dict?.CTAButton?.btn1 || 'Get Started',
		btn2: seoData.secondaryCtaButton || dict?.CTAButton?.btn2 || 'Schedule Consultation',
	};
	
	const faqLocale = dict?.Faq || {};
	// Use SEO-specific FAQ if available, otherwise fall back to the service FAQ for this locale.
	const seoFaqList = seoData.faqList && seoData.faqList.length > 0 ? seoData.faqList : null;
	const defaultFaqList = FAQList[`FAQ_${langName.toUpperCase()}`] || [];
	const faqList = seoFaqList || defaultFaqList; // Always have a FAQ list to show
	const path = `/${slug}`;
	const jsonLd = compactJsonLd([
		serviceSchema({
			name: seoData.metaTitle || seoData.heroTitle,
			description: seoData.metaDescription || seoData.heroSubtitle,
			path,
			locale: langName,
			image: seoData.featuredImage || '/og.png',
		}),
		faqSchema({ faqList, path, locale: langName }),
		breadcrumbSchema({
			locale: langName,
			items: [
				{ name: 'Home', path: '/' },
				{ name: seoData.metaTitle || seoData.heroTitle, path },
			],
		}),
	]);

	if (slug === 'ai-prototype-to-production') {
		return (
			<div className='container mx-auto md:px-5'>
				<JsonLd data={jsonLd} />
				<AiPrototypeToProductionPage
					seoData={seoData}
					dict={dict}
					langName={langName}
				/>
			</div>
		);
	}

	if (slug === 'from-lovable-to-production') {
		return (
			<div className='container mx-auto md:px-5'>
				<JsonLd data={jsonLd} />
				<FromLovableToProductionPage langName={langName} />
			</div>
		);
	}

	if (slug === 'from-bolt-to-production') {
		return (
			<div className='container mx-auto md:px-5'>
				<JsonLd data={jsonLd} />
				<FromBoltToProductionPage langName={langName} />
			</div>
		);
	}

	if (slug === 'from-v0-to-production') {
		return (
			<div className='container mx-auto md:px-5'>
				<JsonLd data={jsonLd} />
				<FromV0ToProductionPage langName={langName} />
			</div>
		);
	}

	if (slug === 'from-replit-to-production') {
		return (
			<div className='container mx-auto md:px-5'>
				<JsonLd data={jsonLd} />
				<FromReplitToProductionPage langName={langName} />
			</div>
		);
	}

	if (slug === 'from-cursor-to-production') {
		return (
			<div className='container mx-auto md:px-5'>
				<JsonLd data={jsonLd} />
				<FromCursorToProductionPage langName={langName} />
			</div>
		);
	}

	return (
		<div className='container mx-auto md:px-5'>
			<JsonLd data={jsonLd} />
	
			{/* Hero Section - Dynamic */}
			<Hero
				locale={heroLocale}
				CTALocale={ctaButtonLocale}
				seoData={seoData}
			/>

			{/* Feature Section - Dynamic */}
			<Feature
				locale={featureLocale}
				langName={langName}
				seoData={seoData}
			/>

			<SeoPricing />

			{/* Testimonial Section - Static (always shown) */}
			<Testimonial
				locale={dict.Testimonial}
				langName={langName}
			/>

			{/* FAQ Section - Always shown (uses SEO FAQ or default FAQ) */}
			<Faq
				locale={faqLocale}
				langName={langName}
				faqList={faqList}
			/>

			<RelatedGuides langName={langName} currentSlug={slug} limit={6} />

			{/* CTA Section - Dynamic */}
			<Cta
				locale={ctaLocale}
				CTALocale={ctaButtonLocale}
			/>
		</div>
	);
}
