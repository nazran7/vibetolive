import AboutPage, { generateMetadata as generateAboutMetadata } from '../[lang]/about/page';
import { defaultLocale } from '@/lib/i18n';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export function generateMetadata() {
	return generateAboutMetadata({ params: { lang: defaultLocale } });
}

export default function Page() {
	return (
		<>
			<Navbar lang={defaultLocale} />
			<AboutPage params={{ lang: defaultLocale }} />
			<Footer lang={defaultLocale} />
		</>
	);
}
