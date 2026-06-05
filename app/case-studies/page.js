import CaseStudiesPage, { generateMetadata as generateCaseStudiesMetadata } from '../[lang]/case-studies/page';
import { defaultLocale } from '@/lib/i18n';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export function generateMetadata() {
	return generateCaseStudiesMetadata({ params: { lang: defaultLocale } });
}

export default function Page() {
	return (
		<>
			<Navbar lang={defaultLocale} />
			<CaseStudiesPage params={{ lang: defaultLocale }} />
			<Footer lang={defaultLocale} />
		</>
	);
}
