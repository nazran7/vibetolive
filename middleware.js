import { NextResponse } from 'next/server';
import { getAllSEOPageSlugs } from './lib/seoPagesData';
import {
	DEFAULT_LOCALE,
	SITE_URL,
	getLocalizedPath,
	isSupportedLocale,
	normalizeLocale,
	stripLocaleFromPath,
} from './lib/seo/site';

const seoPageSlugs = new Set(getAllSEOPageSlugs());

function isSeoSlug(path) {
	const parts = path.split('/').filter(Boolean);
	return parts.length === 1 && seoPageSlugs.has(parts[0]);
}

function rewriteSeoPage(request, locale, slug) {
	const url = request.nextUrl.clone();
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-vibetolive-locale', locale);
	url.pathname = `/__seo__/${locale}/${slug}`;
	return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

function nextWithLocale(request, locale) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-vibetolive-locale', locale);
	return NextResponse.next({ request: { headers: requestHeaders } });
}

export function middleware(request) {
	const url = request.nextUrl.clone();
	const { pathname, hostname } = url;

	if (hostname === 'vibetolive.dev') {
		url.hostname = new URL(SITE_URL).hostname;
		return NextResponse.redirect(url, 308);
	}

	const route = stripLocaleFromPath(pathname);

	if (route.hadLocale && (route.locale === DEFAULT_LOCALE || route.wasAlias)) {
		url.pathname = getLocalizedPath(route.path, route.locale);
		return NextResponse.redirect(url, 308);
	}

	if (route.hadLocale && isSupportedLocale(route.locale) && isSeoSlug(route.path)) {
		const slug = route.path.split('/').filter(Boolean)[0];
		return rewriteSeoPage(request, normalizeLocale(route.locale), slug);
	}

	if (!route.hadLocale && isSeoSlug(route.path)) {
		const slug = route.path.split('/').filter(Boolean)[0];
		return rewriteSeoPage(request, DEFAULT_LOCALE, slug);
	}

	return nextWithLocale(request, route.locale);
}

export const config = {
	matcher: ['/((?!_next)(?!.*\\.(?:ico|png|gif|svg|jpg|jpeg|xml|txt|mp4|webp|avif)$)(?!api).*)'],
};
