'use client';
import Hero from '@/components/seo/hero';
import Feature from '@/components/seo/feature';
import Pricing from '@/components/home/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/seo/faq';
import Cta from '@/components/home/cta';

export default function SEOPageComponent({
	seoData,
	dict,
	langName,
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
	const faqList = seoData.faqList || null; // null means don't show FAQ

	return (
		<div className='container mx-auto md:px-5'>
	
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

			{/* Pricing Section - Static (always shown) */}
			<Pricing
				locale={dict.Pricing}
				langName={langName}
			/>

			{/* Testimonial Section - Static (always shown) */}
			<Testimonial
				locale={dict.Testimonial}
				langName={langName}
			/>

			{/* FAQ Section - Conditional (only if FAQ data exists) */}
			{faqList && faqList.length > 0 && (
				<Faq
					locale={faqLocale}
					langName={langName}
					faqList={faqList}
				/>
			)}

			{/* CTA Section - Dynamic */}
			<Cta
				locale={ctaLocale}
				CTALocale={ctaButtonLocale}
			/>
		</div>
	);
}

