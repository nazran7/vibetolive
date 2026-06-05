import { defaultLocale } from '@/lib/i18n';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { buildPageMetadata } from '@/lib/seo/site';

export async function generateMetadata() {
	const langName = defaultLocale;

	return buildPageMetadata({ locale: langName, path: '/blog' });
}

export default function BlogLayout({ children }) {
	// Use default language for blog layout
	const lang = defaultLocale;

	return (
		<>
			<Navbar lang={lang} />
			<main className='px-5 min-h-screen'>{children}</main>
			<Footer lang={lang} />
		</>
	);
}
