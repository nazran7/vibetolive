import { getDictionary } from '@/lib/i18n';
import { isSupportedLocale, normalizeLocale } from '@/lib/seo/site';
import { notFound } from 'next/navigation';
import HomePageContent from '@/components/home/pageContent';

export default async function Home({ params }) {
	if (!isSupportedLocale(params.lang)) {
		notFound();
	}

	const langName = normalizeLocale(params.lang);
	const dict = await getDictionary(langName);

	return <HomePageContent dict={dict} langName={langName} />;
}
