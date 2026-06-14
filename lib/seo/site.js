export const SITE_NAME = 'VibeToLive.dev';
export const SITE_URL = 'https://www.vibetolive.dev';
export const TALLY_FORM_URL = 'https://tally.so/r/mVry2j';
export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = ['en', 'zh', 'ja', 'ar', 'es', 'ru', 'fr'];

export const LOCALE_ALIASES = {
	'en-US': 'en',
	'zh-CN': 'zh',
	'zh-TW': 'zh',
	'zh-HK': 'zh',
};

export const LOCALE_META = {
	en: {
		htmlLang: 'en',
		ogLocale: 'en_US',
		label: 'English',
		title: 'VibeToLive.dev - AI Prototype to Production',
		description:
			'Turn your AI-generated prototype into a production-ready product. We transform AI-written code into secure, scalable, and reliable production systems.',
		keywords: [
			'AI prototype to production',
			'AI-generated code deployment',
			'production-ready AI code',
			'vibe coding production',
			'AI code security',
			'prototype deployment service',
			'AI startup launch',
			'production-grade development',
		],
	},
	zh: {
		htmlLang: 'zh',
		ogLocale: 'zh_CN',
		label: 'Chinese',
		title: 'VibeToLive.dev - 将 AI 原型变成生产级应用',
		description:
			'将 AI 生成的原型升级为安全、可扩展、可上线的生产级应用。VibeToLive.dev 帮助创始人修复 AI 代码、加固安全并部署到生产环境。',
		keywords: ['AI 原型上线', 'AI 代码部署', '生产级应用', 'AI 应用安全', '原型部署服务'],
	},
	ja: {
		htmlLang: 'ja',
		ogLocale: 'ja_JP',
		label: 'Japanese',
		title: 'VibeToLive.dev - AI プロトタイプを本番対応へ',
		description:
			'AI で作ったプロトタイプを、安全で拡張可能な本番対応アプリへ。VibeToLive.dev は AI 生成コードの修正、セキュリティ強化、本番デプロイを支援します。',
		keywords: ['AI プロトタイプ 本番', 'AI コード デプロイ', '本番対応 AI アプリ', 'AI セキュリティ'],
	},
	ar: {
		htmlLang: 'ar',
		ogLocale: 'ar',
		label: 'Arabic',
		title: 'VibeToLive.dev - تحويل نموذج AI إلى تطبيق إنتاجي',
		description:
			'نحوّل نماذج الذكاء الاصطناعي الأولية إلى تطبيقات آمنة وقابلة للتوسع وجاهزة للإنتاج، مع إصلاح الكود وتأمينه ونشره بثقة.',
		keywords: ['نموذج AI إلى الإنتاج', 'نشر تطبيق AI', 'تطبيق جاهز للإنتاج', 'أمان كود AI'],
	},
	es: {
		htmlLang: 'es',
		ogLocale: 'es_ES',
		label: 'Spanish',
		title: 'VibeToLive.dev - De prototipo con IA a producción',
		description:
			'Convierte prototipos generados con IA en aplicaciones seguras, escalables y listas para producción. Reparamos código de IA, endurecemos seguridad y desplegamos con confianza.',
		keywords: ['prototipo IA a producción', 'despliegue app IA', 'código IA seguro', 'app lista para producción'],
	},
	ru: {
		htmlLang: 'ru',
		ogLocale: 'ru_RU',
		label: 'Russian',
		title: 'VibeToLive.dev - AI-прототип в продакшен',
		description:
			'Превращаем AI-прототипы в безопасные, масштабируемые и готовые к продакшену приложения: исправляем AI-код, усиливаем безопасность и настраиваем деплой.',
		keywords: ['AI прототип в продакшен', 'деплой AI приложения', 'безопасность AI кода', 'готовое к продакшену приложение'],
	},
	fr: {
		htmlLang: 'fr',
		ogLocale: 'fr_FR',
		label: 'French',
		title: 'VibeToLive.dev - Du prototype IA à la production',
		description:
			'Transformez des prototypes générés par IA en applications sécurisées, évolutives et prêtes pour la production. Nous corrigeons, sécurisons et déployons votre app IA.',
		keywords: ['prototype IA production', 'déploiement app IA', 'code IA sécurisé', 'application prête pour la production'],
	},
};

export function normalizeLocale(locale) {
	if (!locale) return DEFAULT_LOCALE;
	if (LOCALE_ALIASES[locale]) return LOCALE_ALIASES[locale];
	return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

export function isSupportedLocale(locale) {
	return SUPPORTED_LOCALES.includes(locale);
}

export function isKnownLocale(locale) {
	return isSupportedLocale(locale) || Boolean(LOCALE_ALIASES[locale]);
}

export function normalizePath(path = '/') {
	const value = path.startsWith('/') ? path : `/${path}`;
	if (value === '/') return value;
	return value.replace(/\/+$/, '');
}

export function getLocalizedPath(path = '/', locale = DEFAULT_LOCALE) {
	const normalizedLocale = normalizeLocale(locale);
	const normalizedPath = normalizePath(path);

	if (normalizedLocale === DEFAULT_LOCALE) {
		return normalizedPath;
	}

	return normalizedPath === '/' ? `/${normalizedLocale}` : `/${normalizedLocale}${normalizedPath}`;
}

export function getAbsoluteUrl(path = '/', locale = DEFAULT_LOCALE) {
	const localizedPath = getLocalizedPath(path, locale);
	return localizedPath === '/' ? SITE_URL : `${SITE_URL}${localizedPath}`;
}

export function getAlternateLanguages(path = '/') {
	return {
		...Object.fromEntries(
			SUPPORTED_LOCALES.map((locale) => [locale, getAbsoluteUrl(path, locale)])
		),
		'x-default': getAbsoluteUrl(path, DEFAULT_LOCALE),
	};
}

export function stripLocaleFromPath(pathname = '/') {
	const normalizedPath = normalizePath(pathname);
	const parts = normalizedPath.split('/').filter(Boolean);
	const first = parts[0];

	if (!first || !isKnownLocale(first)) {
		return {
			locale: DEFAULT_LOCALE,
			path: normalizedPath,
			hadLocale: false,
			wasAlias: false,
		};
	}

	const locale = normalizeLocale(first);
	const rest = parts.slice(1).join('/');

	return {
		locale,
		path: rest ? `/${rest}` : '/',
		hadLocale: true,
		wasAlias: Boolean(LOCALE_ALIASES[first]),
	};
}

export function buildPageMetadata({
	locale = DEFAULT_LOCALE,
	path = '/',
	title,
	description,
	keywords,
	image = '/og.png',
	type = 'website',
}) {
	const normalizedLocale = normalizeLocale(locale);
	const meta = LOCALE_META[normalizedLocale] || LOCALE_META[DEFAULT_LOCALE];
	const pageTitle = title || meta.title;
	const pageDescription = description || meta.description;
	const pageKeywords = keywords || meta.keywords;
	const canonical = getAbsoluteUrl(path, normalizedLocale);
	const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

	return {
		metadataBase: new URL(SITE_URL),
		title: pageTitle,
		description: pageDescription,
		keywords: pageKeywords,
		authors: [{ name: SITE_NAME, url: SITE_URL }],
		creator: SITE_NAME,
		icons: {
			icon: '/favicon.ico',
			shortcut: '/logo.png',
			apple: '/logo.png',
		},
		alternates: {
			canonical,
			languages: getAlternateLanguages(path),
		},
		openGraph: {
			type,
			locale: meta.ogLocale,
			url: canonical,
			title: pageTitle,
			description: pageDescription,
			siteName: SITE_NAME,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: pageTitle,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: pageTitle,
			description: pageDescription,
			images: [imageUrl],
		},
	};
}

export function getHrefForLocale(href, locale = DEFAULT_LOCALE) {
	if (!href) return getLocalizedPath('/', locale);
	if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
		return href;
	}
	if (href === '/blog' || href.startsWith('/blog/') || href === '/auth' || href.startsWith('/auth/')) {
		return normalizePath(href);
	}
	if (href.startsWith('#')) {
		return `${getLocalizedPath('/', locale)}${href}`;
	}
	return getLocalizedPath(href, locale);
}
