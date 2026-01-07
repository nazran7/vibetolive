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

const rewritePaths = [
    { pattern: /^\/$/, destination: '/en/' },
	{ pattern: /^\/auth(\/)?$/, destination: '/auth' },
	{ pattern: /^\/admin(\/)?$/, destination: '/en/admin' },
	{ pattern: /^\/admin\/(.*)$/, destination: '/en/admin/$1' },
	{ pattern: /^\/about(\/)?$/, destination: '/en/about' },
	{ pattern: /^\/services(\/)?$/, destination: '/en/services' },
	{ pattern: /^\/case-studies(\/)?$/, destination: '/en/case-studies' },
    // Blog routes are now handled directly at /blog, no rewriting needed
    // { pattern: /^\/blog(\/)?$/, destination: '/en/blog' },
    // { pattern: /^\/blog\/([^\/]+)(\/)?$/, destination: '/en/blog/$1' },
    // 可以根据需要添加更多的重写规则
];

// Get all valid SEO page slugs at module load time
const seoPageSlugs = getAllSEOPageSlugs();

export function middleware(request) {
	const { pathname } = request.nextUrl;
	console.log("当前路径:", pathname);  // 保留日志

	const lang = reportLanguage(pathname);
	request.headers.set('x-pathname', pathname);
	request.headers.set('x-language-directory', lang);

	// 检查是否已经包含语言代码
	const isExit = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

	// 应用重写规则
	for (const { pattern, destination } of rewritePaths) {
		const match = pathname.match(pattern);
		if (match) {
			console.log(`重写路径: ${pathname} -> ${destination}`);  // 添加日志
			request.nextUrl.pathname = pathname.replace(pattern, destination);
			return NextResponse.rewrite(request.nextUrl);
		}
	}

	// Reserved routes that should be handled by existing routes
	const reservedRoutes = ['blog', 'auth', 'admin', 'about', 'services', 'case-studies', 'api', '__seo__'];
	const isReservedRoute = reservedRoutes.some(route => pathname === `/${route}` || pathname.startsWith(`/${route}/`));

	// Note: Language-prefixed routes (e.g., /en/ai-prototype-to-production) are deprecated
	// Language is now stored in cookies, not in the URL
	// We still handle them for backward compatibility, but they're redirected to clean URLs
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length === 2 && locales.includes(segments[0]) && seoPageSlugs.includes(segments[1])) {
		// Redirect language-prefixed SEO routes to clean URLs (without language in URL)
		const slug = segments[1];
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
	if (segments.length === 1 && !locales.includes(segments[0]) && !reservedRoutes.includes(segments[0])) {
		// Check if this is a valid SEO page slug
		if (seoPageSlugs.includes(segments[0])) {
			// Get language from cookie instead of URL
			const lang = getLanguageFromCookie(request);
			console.log(`重写SEO路径到catch-all (语言从cookie读取: ${lang}): ${pathname} -> /__seo__/${lang}/${segments[0]}`);
			request.nextUrl.pathname = `/__seo__/${lang}/${segments[0]}`;
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
