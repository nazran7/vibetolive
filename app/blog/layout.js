import { defaultLocale } from '@/lib/i18n';
import { SiteConfig } from '@/lib/config/site';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export async function generateMetadata() {
	const langName = defaultLocale;

	if (!SiteConfig[langName]) {
		console.error(`未找到语言配置: ${langName}`);
		return {
			title: SiteConfig[defaultLocale].name,
		};
	}

	return {
		title: SiteConfig[langName].name,
		description: SiteConfig[langName].description,
		keywords: SiteConfig[langName].keywords,
		authors: SiteConfig[langName].authors,
		creator: SiteConfig[langName].creator,
		icons: SiteConfig[langName].icons,
		metadataBase: SiteConfig[langName].metadataBase,
		openGraph: SiteConfig[langName].openGraph,
		twitter: SiteConfig[langName].twitter,
	};
}

export default function BlogLayout({ children }) {
	// Use default language for blog layout
	const lang = defaultLocale;

	return (
		<>
			<Navbar lang={lang} />
			<div className='px-5 min-h-screen'>{children}</div>
			<Footer lang={lang} />
		</>
	);
}
