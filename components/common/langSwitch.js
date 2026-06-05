'use client';
import { useRouter, usePathname } from 'next/navigation';
import { defaultLocale, localeNames } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { getHrefForLocale, normalizeLocale, stripLocaleFromPath } from '@/lib/seo/site';

// Helper function to get/set language from cookie
function getLanguageFromCookie() {
	if (typeof document === 'undefined') return defaultLocale;
	const cookies = document.cookie.split(';');
	for (let cookie of cookies) {
		const [name, value] = cookie.trim().split('=');
		if (name === 'NEXT_LOCALE') {
			return value || defaultLocale;
		}
	}
	return defaultLocale;
}

function setLanguageCookie(lang) {
	if (typeof document === 'undefined') return;
	// Set cookie to expire in 1 year
	const maxAge = 365 * 24 * 60 * 60;
	document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export default function LangSwitch() {
	const pathname = usePathname();
	const router = useRouter();
	const [langName, setLangName] = useState(defaultLocale);
	
	// Read language from cookie on mount and when pathname changes
	useEffect(() => {
		const current = stripLocaleFromPath(pathname);
		const lang = current.hadLocale ? current.locale : getLanguageFromCookie();
		setLangName(lang);
	}, [pathname]);

	const handleSwitchLanguage = (newLang) => {
		return () => {
			// Save language preference to cookie
			setLanguageCookie(newLang);
			setLangName(newLang);

			const current = stripLocaleFromPath(pathname);
			const nextPath = getHrefForLocale(current.path, normalizeLocale(newLang));
			router.push(nextPath);
		};
	};

	return (
		<div className='dropdown dropdown-end dropdown-hover z-[100]'>
			<div
				tabIndex={0}
				role='button'
				className='flex items-center justify-center md:bg-base-100 md:rounded-full w-15 md:w-[100px] h-5 text-sm md:h-8 md:shadow-sm md:hover:shadow-md transition-all'
			>
				{localeNames[langName] || localeNames[defaultLocale]}
			</div>
			<ul
				tabIndex={0}
				className='dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow'
			>
				{Object.keys(localeNames).map((key) => {
					const name = localeNames[key];
					return (
						<li key={key}>
							<a
								href='#'
								title={`switch to ${name}`}
								className='cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									handleSwitchLanguage(key)();
								}}
							>
								{name}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
