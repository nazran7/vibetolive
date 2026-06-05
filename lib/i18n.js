import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, normalizeLocale } from './seo/site';

export const locales = SUPPORTED_LOCALES;
export const localeNames = {
	en: '🇺🇸 English',
	zh: '🇨🇳 中文',
	ja: '🇯🇵 日本語',
	ar: '🇸🇦 العربية',
	es: '🇪🇸 Español',
	ru: '🇷🇺 Русский',
	fr: '🇫🇷 Français',
};
export const defaultLocale = DEFAULT_LOCALE;

// If you wish to automatically redirect users to a URL that matches their browser's language setting,
// you can use the `getLocale` to get the browser's language.
export function getLocale(headers) {
	let languages = new Negotiator({ headers }).languages();

	return normalizeLocale(match(languages, locales, defaultLocale));
}

const dictionaries = {
	en: () => import('@/locales/en.json').then((module) => module.default),
	zh: () => import('@/locales/zh.json').then((module) => module.default),
	ja: () => import('@/locales/ja.json').then((module) => module.default),
	ar: () => import('@/locales/ar.json').then((module) => module.default),
	es: () => import('@/locales/es.json').then((module) => module.default),
	ru: () => import('@/locales/ru.json').then((module) => module.default),
	fr: () => import('@/locales/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
	locale = normalizeLocale(locale);

	if (!Object.keys(dictionaries).includes(locale)) {
		locale = 'en';
	}

	return dictionaries[locale]();
};
