import ServicesPage, { generateMetadata as generateServicesMetadata } from '../[lang]/services/page';
import { defaultLocale } from '@/lib/i18n';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export function generateMetadata() {
	return generateServicesMetadata({ params: { lang: defaultLocale } });
}

export default function Page() {
	return (
		<>
			<Navbar lang={defaultLocale} />
			<ServicesPage params={{ lang: defaultLocale }} />
			<Footer lang={defaultLocale} />
		</>
	);
}
