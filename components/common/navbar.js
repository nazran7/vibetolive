'use client';
import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';

import { usePathname } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { NavLinksList } from '@/lib/navLinksList';
import { getHrefForLocale, normalizeLocale } from '@/lib/seo/site';

export default function Navbar({ lang = defaultLocale }) {
	const pathname = usePathname();
	const initialLang = normalizeLocale(lang);
	const [langName, setLangName] = useState(initialLang);
	const [linkList, setLinkList] = useState(NavLinksList[`LINK_${initialLang.toUpperCase()}`] || NavLinksList.LINK_EN);

	useEffect(() => {
		const fetchLinksList = async () => {
			const detectedLang = normalizeLocale(pathname.split('/').filter(Boolean)[0] || defaultLocale);
			setLangName(detectedLang);
			setLinkList(NavLinksList[`LINK_${detectedLang.toUpperCase()}`] || NavLinksList.LINK_EN);
		};
		fetchLinksList();
	}, [pathname]);
	

	return (
		<header className='w-full relative z-50 bg-base-100 p-5 pb-0 container mx-auto md:mb-5 flex justify-between items-center'>
			<a
				aria-label='VibeToLive.dev home'
				className='flex items-center w-1/2 md:w-1/5'
				title='VibeToLive.dev'
				href={getHrefForLocale('/', langName)}
			>
				<Image
					width={64}
					height={64}
					src={'/logo.gif'}
					className='transition-all hover:scale-110 w-6 md:w-10 h-6 md:h-10'
					alt='logo'
					priority
					sizes="(max-width: 768px) 24px, 40px"
				></Image>
				<h2 className='ml-3 font-bold leading-5'>VibeToLive.dev</h2>
			</a>

			<ul className='w-3/5 px-5 font-medium hidden md:flex flex-nowrap items-center justify-around'>
				{linkList.map((link, index) => {
					return (
						<li
							key={index}
							className='group py-3 text-center'
						>
							{link.children ? (
								<details className='dropdown dropdown-hover'>
									<summary className='cursor-pointer list-none'>{link.name}</summary>
									<ul className='dropdown-content menu z-[100] mt-3 w-64 rounded-box bg-base-100 p-2 text-left shadow'>
										{link.children.map((child) => (
											<li key={child.url}>
												<a href={getHrefForLocale(child.url, langName)} title={child.name}>
													{child.name}
												</a>
											</li>
										))}
									</ul>
								</details>
							) : (
								<a
									aria-label={link.name}
									className='group relative'
									title={link.name}
									href={getHrefForLocale(link.url, langName)}
								>
									{link.name}
									<div className='absolute left-[50%] group-hover:left-0 w-0 group-hover:w-full h-[3px] transition-all duration-300 bg-base-content/90'></div>
								</a>
							)}
						</li>
					);
				})}
			</ul>

			<div className='md:w-1/5 flex items-center justify-end gap-2'>
				<ThemeToggle />
				<LangSwitch />
				<details className='flex md:hidden dropdown dropdown-end'>
					<summary className='btn btn-ghost p-0'>
						<MdMenu size={18} />
					</summary>
					<ul className='menu dropdown-content z-[100] p-2 shadow bg-base-100 opacity-100 rounded-box w-52'>
						{linkList.map((link, index) => {
							return (
								<li key={index}>
									{link.children ? (
										<details>
											<summary>{link.name}</summary>
											<ul>
												{link.children.map((child) => (
													<li key={child.url}>
														<a title={child.name} href={getHrefForLocale(child.url, langName)}>
															{child.name}
														</a>
													</li>
												))}
											</ul>
										</details>
									) : (
										<a
											aria-label={link.name}
											title={link.name}
											href={getHrefForLocale(link.url, langName)}
										>
											{link.name}
										</a>
									)}
								</li>
							);
						})}
					</ul>
				</details>
			</div>
		</header>
	);
}
