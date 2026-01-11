import { locales, defaultLocale } from '@/lib/i18n';
import { SiteConfig } from '@/lib/config/site';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { headers } from 'next/headers';

// Valid locale codes (exclude empty string and variants)
const validLocales = ['en', 'zh', 'ja', 'ar', 'es', 'ru', 'fr', 'en-US', 'zh-CN', 'zh-TW', 'zh-HK'];

export async function generateMetadata({ params }) {
	const paramLang = params?.lang;
	console.log('获取到的语言参数:', paramLang);

	// Don't call notFound() here - let the page component handle it
	// This allows Next.js to try the catch-all route if this isn't a valid locale
	const lang = paramLang && validLocales.includes(paramLang) ? paramLang : defaultLocale;

	if (!SiteConfig[lang]) {
		console.error(`未找到语言配置: ${lang}`);
		return {
			title: SiteConfig[defaultLocale].name,
		};
	}

	const headersList = headers();
	const host = headersList.get('host');
	const protocol = host?.includes('localhost') ? 'http' : 'https';
	const baseUrl = `${protocol}://${host}`;

	const canonicalUrl = `${baseUrl}/${lang === defaultLocale ? '' : lang}`.replace(/\/$/, '');

	return {
		title: SiteConfig[lang].name,
		description: SiteConfig[lang].description,
		keywords: SiteConfig[lang].keywords,
		authors: SiteConfig[lang].authors,
		creator: SiteConfig[lang].creator,
		icons: SiteConfig[lang].icons,
		metadataBase: SiteConfig[lang].metadataBase,
		openGraph: SiteConfig[lang].openGraph,
		twitter: SiteConfig[lang].twitter,
		alternates: {
			canonical: canonicalUrl,
			languages: Object.fromEntries(
				locales.map((l) => [l, `${baseUrl}/${l === defaultLocale ? '' : l}`.replace(/\/$/, '')])
			),
		},
	};
}


export default function LangLayout({ children, params }) {
	// 获取当前语言
	const paramLang = params?.lang;
	
	// Don't call notFound() here - let the page component handle it
	// Use defaultLocale if invalid, but let page decide whether to show 404
	const lang = paramLang && validLocales.includes(paramLang) ? paramLang : defaultLocale;

	return (
		<>
			<Navbar />
			<main className='px-5 min-h-screen'>{children}</main>
			<Footer lang={lang} />
		</>
	);
}
