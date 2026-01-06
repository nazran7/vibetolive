import { defaultLocale } from '@/lib/i18n';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export default function SEOLayout({ children }) {
	const lang = defaultLocale;

	return (
		<>
			<Navbar lang={lang} />
			<div className='px-5 min-h-screen'>{children}</div>
			<Footer lang={lang} />
		</>
	);
}

