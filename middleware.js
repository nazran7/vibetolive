import { reportLanguage } from './lib/function/lang';
import { locales, defaultLocale } from './lib/i18n';
import { NextRequest, NextResponse } from 'next/server';
import { getAllSEOPageSlugs } from './lib/seoPagesData';

// Helper function to get language from cookie
function getLanguageFromCookie(request) {
	const cookieHeader = request.headers.get('cookie');
	if (!cookieHeader) return defaultLocale;
	
	const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
		const [name, value] = cookie.trim().split('=');
		if (name && value) {
			acc[name] = value;
		}
		return acc;
	}, {});
	
	return cookies['NEXT_LOCALE'] || defaultLocale;
}

// Routes that need language-based rewriting (will use cookie language dynamically)
const languageBasedRoutes = [
	{ pattern: /^\/auth(\/)?$/, destination: '/auth' }, // Auth doesn't need language
	{ pattern: /^\/admin(\/)?$/, needsLang: true },
	{ pattern: /^\/admin\/(.*)$/, needsLang: true, hasParam: true },
	{ pattern: /^\/about(\/)?$/, needsLang: true },
	{ pattern: /^\/services(\/)?$/, needsLang: true },
	{ pattern: /^\/case-studies(\/)?$/, needsLang: true },
    // Blog routes are now handled directly at /blog, no rewriting needed
];

// Get all valid SEO page slugs at module load time
const seoPageSlugs = getAllSEOPageSlugs();

export function middleware(request) {
	const { pathname } = request.nextUrl;
	console.log("当前路径:", pathname);  // 保留日志

	const lang = reportLanguage(pathname);
	request.headers.set('x-pathname', pathname);
	request.headers.set('x-language-directory', lang);

	// Get language from cookie for dynamic rewriting
	const cookieLang = getLanguageFromCookie(request);

	// Handle root path - rewrite to cookie language (URL stays as /)
	if (pathname === '/') {
		console.log(`重写根路径 (语言从cookie读取: ${cookieLang}): ${pathname} -> /${cookieLang}/`);
		request.nextUrl.pathname = `/${cookieLang}/`;
		return NextResponse.rewrite(request.nextUrl);
	}

	// Handle language-prefixed routes (e.g., /en, /zh, /en/about)
	// Rewrite internally to match cookie language, but keep URL unchanged
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length > 0 && locales.includes(segments[0])) {
		const urlLang = segments[0];
		// If cookie language differs from URL language, rewrite internally
		if (cookieLang !== urlLang) {
			const newPath = `/${cookieLang}${pathname.substring(`/${urlLang}`.length)}`;
			console.log(`重写语言前缀路径 (cookie: ${cookieLang}, URL: ${urlLang}): ${pathname} -> ${newPath}`);
			request.nextUrl.pathname = newPath;
			return NextResponse.rewrite(request.nextUrl);
		}
		// If languages match, just pass through
		return NextResponse.next();
	}

	// Handle language-based routes (about, services, case-studies, admin)
	for (const route of languageBasedRoutes) {
		const match = pathname.match(route.pattern);
		if (match) {
			if (route.needsLang) {
				// Rewrite to use cookie language
				if (route.hasParam && match[1]) {
					// Route with parameter (e.g., /admin/something)
					const newPath = `/${cookieLang}${pathname}`;
					console.log(`重写语言路由 (cookie: ${cookieLang}): ${pathname} -> ${newPath}`);
					request.nextUrl.pathname = newPath;
				} else {
					// Simple route (e.g., /about)
					const newPath = `/${cookieLang}${pathname}`;
					console.log(`重写语言路由 (cookie: ${cookieLang}): ${pathname} -> ${newPath}`);
					request.nextUrl.pathname = newPath;
				}
			} else {
				// Route doesn't need language (e.g., /auth)
				request.nextUrl.pathname = route.destination;
			}
			return NextResponse.rewrite(request.nextUrl);
		}
	}

	// 检查是否已经包含语言代码
	const isExit = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

	// Reserved routes that should be handled by existing routes
	const reservedRoutes = ['blog', 'auth', 'admin', 'about', 'services', 'case-studies', 'api', '__seo__'];
	const isReservedRoute = reservedRoutes.some(route => pathname === `/${route}` || pathname.startsWith(`/${route}/`));

	// Note: Language-prefixed routes (e.g., /en/ai-prototype-to-production) are deprecated
	// Language is now stored in cookies, not in the URL
	// We still handle them for backward compatibility, but they're redirected to clean URLs
	const pathSegments = pathname.split('/').filter(Boolean);
	if (pathSegments.length === 2 && locales.includes(pathSegments[0]) && seoPageSlugs.includes(pathSegments[1])) {
		// Redirect language-prefixed SEO routes to clean URLs (without language in URL)
		const slug = pathSegments[1];
		console.log(`重定向语言前缀SEO路径到清洁URL: ${pathname} -> /${slug}`);
		const response = NextResponse.redirect(new URL(`/${slug}`, request.url));
		return response;
	}

	// Allow reserved routes to pass through without redirection
	if (isReservedRoute || pathname.startsWith('/blog') || pathname.startsWith('/auth')) {
		console.log(`允许直接路径通过: ${pathname}`);  // 添加日志
		return NextResponse.next();
	}

	// Allow root-level SEO slugs (single segment paths like /ai-prototype-to-production)
	// Exclude language codes, reserved routes, and API routes
	if (pathSegments.length === 1 && !locales.includes(pathSegments[0]) && !reservedRoutes.includes(pathSegments[0])) {
		// Check if this is a valid SEO page slug
		if (seoPageSlugs.includes(pathSegments[0])) {
			// Get language from cookie instead of URL
			const lang = getLanguageFromCookie(request);
			console.log(`重写SEO路径到catch-all (语言从cookie读取: ${lang}): ${pathname} -> /__seo__/${lang}/${pathSegments[0]}`);
			request.nextUrl.pathname = `/__seo__/${lang}/${pathSegments[0]}`;
			// Store original pathname and language in headers
			request.headers.set('x-original-pathname', pathname);
			request.headers.set('x-language-directory', lang);
			return NextResponse.rewrite(request.nextUrl);
		}
		console.log(`允许SEO路径通过: ${pathname}`);
		return NextResponse.next();
	}

	if (isExit) return NextResponse.next();

	// 如果没有匹配的重写规则，重定向到根路径
	console.log(`重定向到根路径: ${pathname} -> /`);  // 添加日志
	request.nextUrl.pathname = `/`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ['/((?!_next)(?!.*\\.(?:ico|png|gif|svg|jpg|jpeg|xml|txt|mp4)$)(?!/api).*)'],
};
