import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/lib/seo/site';

export default function SEOLayout({ children, params }) {
	const slugArray = params?.slug || [];
	let lang = DEFAULT_LOCALE;
	
	if (slugArray.length === 3 && slugArray[0] === '__seo__' && isSupportedLocale(slugArray[1])) {
		lang = slugArray[1];
	} else if (slugArray.length === 2 && isSupportedLocale(slugArray[0])) {
		lang = slugArray[0];
	}

	return (
		<>
			<Navbar lang={lang} />
			<main className='px-5 min-h-screen'>{children}</main>
			<Footer lang={lang} />
		</>
	);
}
