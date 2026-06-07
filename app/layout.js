import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Plus_Jakarta_Sans } from 'next/font/google';
import ThemeScript from '@/components/common/themeScript';
import Script from 'next/script';
import { headers } from 'next/headers';
import { buildPageMetadata, LOCALE_META, SITE_NAME, SITE_URL, normalizeLocale } from '@/lib/seo/site';

const jakarta = Plus_Jakarta_Sans({
	weight: ['500', '800'],
	subsets: ['latin'],
	display: 'swap', // Optimize font loading - don't block render waiting for font
	preload: true, // Preload font for better performance
});

export const metadata = buildPageMetadata({
	locale: 'en',
	path: '/',
});

function getGlobalJsonLd(locale, htmlLang) {
	return [
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			'@id': `${SITE_URL}/#organization`,
			name: SITE_NAME,
			url: SITE_URL,
			logo: `${SITE_URL}/logo.png`,
			description:
				'VibeToLive.dev turns AI-generated prototypes into secure, scalable, production-ready applications for founders, indie hackers, and lean startup teams.',
			knowsAbout: [
				'AI prototype to production',
				'AI-generated code security',
				'production deployment',
				'vibe coding',
				'software architecture review',
			],
			inLanguage: htmlLang,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			'@id': `${SITE_URL}/#website`,
			name: SITE_NAME,
			url: locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`,
			publisher: {
				'@id': `${SITE_URL}/#organization`,
			},
			inLanguage: htmlLang,
		},
	];
}

export default function RootLayout({ children }) {
	const fontClass = jakarta.className || '';
	const locale = normalizeLocale(headers().get('x-vibetolive-locale'));
	const htmlLang = LOCALE_META[locale]?.htmlLang || 'en';
	const dir = locale === 'ar' ? 'rtl' : 'ltr';
	const globalJsonLd = getGlobalJsonLd(locale, htmlLang);

	return (
		<html lang={htmlLang} dir={dir} className={fontClass}>
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
				/>
				{/* Google Analytics - Deferred loading for better performance */}
				<Script
					strategy="lazyOnload"
					src="https://www.googletagmanager.com/gtag/js?id=G-916VTN5QG7"
				/>
				<Script
					id="google-analytics"
					strategy="lazyOnload"
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-916VTN5QG7', {
								page_path: window.location.pathname,
							});
						`,
					}}
				/>
				<ThemeScript />
				<div className='w-full min-h-svh text-base-content bg-base-100'>
					{children}
					<ToastContainer
						position="top-center"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</div>
			</body>
		</html>
	);
}
