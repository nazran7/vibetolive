import { defaultLocale, getDictionary, locales } from '@/lib/i18n';
import { notFound } from 'next/navigation';

import Hero from '@/components/home/hero';
import Feature from '@/components/home/feature';
import Pricing from '@/components/home/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/home/faq';
import Cta from '@/components/home/cta';

// Valid locale codes (exclude empty string and variants)
const validLocales = ['en', 'zh', 'ja', 'ar', 'es', 'ru', 'fr', 'en-US', 'zh-CN', 'zh-TW', 'zh-HK'];


export default async function Home({ params }) {
	const langName = params.lang || defaultLocale;
	
	// IMPORTANT: If lang is not a valid locale, we need to throw an error
	// that Next.js can catch to try the catch-all route
	// However, Next.js doesn't support this pattern - we need to ensure
	// the catch-all route can handle it, so we'll check if it's a valid locale
	// If not, we still render but it will likely 404 at the dictionary level
	if (!validLocales.includes(langName)) {
		// Try to check if this might be an SEO page slug
		// If so, return a redirect or let it 404 so catch-all can handle it
		console.log(`[lang] route: Invalid locale "${langName}" - this should match catch-all route instead`);
		// Actually, we can't prevent the match here - Next.js already matched [lang]
		// We need to return 404 and hope the catch-all handles it
		// But Next.js won't try catch-all after notFound()
		notFound();
	}
	
	const dict = await getDictionary(langName); // 获取内容

	return (
		<div className='container mx-auto md:px-5'>
			<Hero
				locale={dict.Hero}
				CTALocale={dict.CTAButton}
			/>
			<Feature
				locale={dict.Feature}
				langName={langName}
			/>
			<Pricing
				locale={dict.Pricing}
				langName={langName}
			/>
			<Testimonial
				locale={dict.Testimonial}
				langName={langName}
			/>
			<Faq
				locale={dict.Faq}
				langName={langName}
			/>
			<Cta
				locale={dict.CTA}
				CTALocale={dict.CTAButton}
			/>
		</div>
	);
}
