import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { buildPageMetadata, isSupportedLocale, normalizeLocale } from '@/lib/seo/site';

export async function generateMetadata({ params }) {
	const lang = normalizeLocale(params?.lang);
	return buildPageMetadata({ locale: lang, path: '/' });
}


export default function LangLayout({ children, params }) {
	const lang = isSupportedLocale(params?.lang) ? params.lang : normalizeLocale(params?.lang);

	return (
		<>
			<Navbar lang={lang} />
			<main className='px-5 min-h-screen'>{children}</main>
			<Footer lang={lang} />
		</>
	);
}
