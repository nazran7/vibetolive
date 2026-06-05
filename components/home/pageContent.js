import Hero from '@/components/home/hero';
import IsThisYou from '@/components/home/isThisYou';
import Feature from '@/components/home/feature';
import Audience from '@/components/home/audience';
import Pricing from '@/components/home/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/home/faq';
import Cta from '@/components/home/cta';
import RelatedGuides from '@/components/seo/relatedGuides';
import JsonLd from '@/components/seo/jsonLd';
import { FAQList } from '@/lib/faqsList';
import { compactJsonLd, faqSchema, serviceSchema } from '@/lib/seo/schema';

export default function HomePageContent({ dict, langName }) {
	const faqList = FAQList[`FAQ_${langName.toUpperCase()}`] || [];
	const jsonLd = compactJsonLd([
		serviceSchema({
			name: dict.Hero?.h1 || 'AI Prototype to Production',
			description: dict.Hero?.h2,
			path: '/',
			locale: langName,
		}),
		faqSchema({ faqList, path: '/', locale: langName }),
	]);

	return (
		<div className='container mx-auto md:px-5'>
			<JsonLd data={jsonLd} />
			<Hero
				locale={dict.Hero}
				CTALocale={dict.CTAButton}
			/>
			<IsThisYou
				locale={dict.IsThisYou}
			/>
			<Feature
				locale={dict.Feature}
				langName={langName}
			/>
			<Audience
				locale={dict.Audience}
			/>
			<RelatedGuides langName={langName} />
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
