import { defaultLocale, getDictionary } from '@/lib/i18n';
import HomePageContent from '@/components/home/pageContent';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export default async function Page() {
	const dict = await getDictionary(defaultLocale);

	return (
		<>
			<Navbar lang={defaultLocale} />
			<HomePageContent dict={dict} langName={defaultLocale} />
			<Footer lang={defaultLocale} />
		</>
	);
}
