import Image from 'next/image';
import { NavLinksList } from '@/lib/navLinksList';
import { getAllSEOPageSlugs, getSEOPageBySlug } from '@/lib/seoPagesData';
import { defaultLocale } from '@/lib/i18n';
import { getHrefForLocale, getLocalizedPath, normalizeLocale, SITE_NAME, SITE_URL } from '@/lib/seo/site';

function getSeoLinks(lang) {
	return getAllSEOPageSlugs().map((slug) => {
		const page = getSEOPageBySlug(slug, lang) || getSEOPageBySlug(slug, defaultLocale);
		return {
			name: page?.metaTitle?.replace(/\s*\|.*$/, '') || slug.replaceAll('-', ' '),
			url: `/${slug}`,
		};
	});
}

export default function Footer({ lang = defaultLocale }) {
	const langName = normalizeLocale(lang);
	const linkList = NavLinksList[`LINK_${langName.toUpperCase()}`] || NavLinksList.LINK_EN;
	const seoLinks = getSeoLinks(langName);

	return (
		<footer className='w-full px-5 py-10 bg-[#202020] text-[#f7f7f7]'>
			<div className='container mx-auto grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr_1.4fr] text-sm'>
				<div className='flex flex-col items-center md:items-start'>
					<a
						aria-label={SITE_NAME}
						className='flex items-center mb-3'
						title='VibeToLive.dev - AI Prototype to Production'
						href={getLocalizedPath('/', langName)}
					>
						<Image
							width={64}
							height={64}
							src={'/logo.gif'}
							className='transition-all hover:scale-110 w-6 md:w-10 h-6 md:h-10'
							alt='VibeToLive.dev logo'
							sizes="(max-width: 768px) 24px, 40px"
						/>
						<h2 className='ml-3 font-bold leading-5'>{SITE_NAME}</h2>
					</a>
					<p className='mt-2 max-w-md text-center md:text-left text-[#f7f7f7]/70'>
						VibeToLive.dev provides AI prototype to production services, helping founders fix AI-generated code, deploy AI apps, and maintain production-ready systems.
					</p>
					<p className='mt-4 text-[#f7f7f7]/60'>
						© 2026{' '}
						<a title={SITE_NAME} href={SITE_URL}>
							{SITE_NAME}
						</a>
					</p>
				</div>

				<nav aria-label='Site links'>
					<h3 className='mb-3 font-semibold text-[#f7f7f7]'>Site</h3>
					<div className='flex flex-col gap-2 text-[#f7f7f7]/75'>
						{linkList
							.filter((link) => !link.children)
							.map((link) => (
								<a key={link.url} title={link.name} href={getHrefForLocale(link.url, langName)}>
									{link.name}
								</a>
							))}
					</div>
				</nav>

				<nav aria-label='AI prototype to production guides'>
					<h3 className='mb-3 font-semibold text-[#f7f7f7]'>AI Prototype to Production Guides</h3>
					<div className='grid grid-cols-1 gap-x-5 gap-y-2 text-[#f7f7f7]/75 sm:grid-cols-2'>
						{seoLinks.map((link) => (
							<a key={link.url} title={link.name} href={getHrefForLocale(link.url, langName)}>
								{link.name}
							</a>
						))}
					</div>
				</nav>
			</div>
		</footer>
	);
}
