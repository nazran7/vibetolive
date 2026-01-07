import { defaultLocale, locales } from '@/lib/i18n';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

// Valid locale codes
const validLocales = ['en', 'zh', 'ja', 'ar', 'es', 'ru', 'fr'];

export default function SEOLayout({ children, params }) {
	// Extract language from params.slug array
	// Patterns: /__seo__/[slug] or /__seo__/[lang]/[slug]
	const slugArray = params?.slug || [];
	let lang = defaultLocale;
	
	if (slugArray.length === 3 && slugArray[0] === '__seo__' && validLocales.includes(slugArray[1])) {
		// Pattern: /__seo__/[lang]/[slug]
		lang = slugArray[1];
	} else if (slugArray.length === 2 && slugArray[0] === '__seo__') {
		// Pattern: /__seo__/[slug] (default to 'en')
		lang = defaultLocale;
	}

	return (
		<>
			<Navbar lang={lang} />
			<div className='px-5 min-h-screen'>{children}</div>
			<Footer lang={lang} />
		</>
	);
}

