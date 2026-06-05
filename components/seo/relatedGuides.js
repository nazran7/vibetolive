import { getAllSEOPageSlugs, getSEOPageBySlug } from '@/lib/seoPagesData';
import { defaultLocale } from '@/lib/i18n';
import { getHrefForLocale, normalizeLocale } from '@/lib/seo/site';

const prioritySlugs = [
	'ai-prototype-to-production',
	'from-lovable-to-production',
	'from-v0-to-production',
	'from-bolt-to-production',
	'from-cursor-to-production',
	'from-replit-to-production',
	'security-risks-ai-generated-code',
	'production-readiness-checklist',
];

export default function RelatedGuides({ langName = defaultLocale, currentSlug, limit = 8 }) {
	const locale = normalizeLocale(langName);
	const allSlugs = getAllSEOPageSlugs();
	const orderedSlugs = [
		...prioritySlugs,
		...allSlugs.filter((slug) => !prioritySlugs.includes(slug)),
	].filter((slug) => slug !== currentSlug);

	const guides = orderedSlugs.slice(0, limit).map((slug) => {
		const page = getSEOPageBySlug(slug, locale) || getSEOPageBySlug(slug, defaultLocale);
		return {
			slug,
			title: page?.metaTitle?.replace(/\s*\|.*$/, '') || slug.replaceAll('-', ' '),
			description: page?.metaDescription || page?.heroSubtitle || '',
		};
	});

	return (
		<section className='relative py-10 md:py-16' aria-labelledby='related-guides-heading'>
			<div className='relative z-10 mx-auto flex w-full md:w-10/12 flex-col gap-5'>
				<div className='flex flex-col gap-3 md:items-center md:text-center'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Production guides</p>
					<h2 id='related-guides-heading' className='text-3xl md:text-5xl font-bold'>
						From AI tool to production
					</h2>
					<p className='max-w-3xl text-lg text-base-content/75'>
						Explore focused guides for turning AI-built apps from Lovable, V0, Bolt, Cursor, Replit, ChatGPT, Claude, Windsurf, and Base44 into production-ready software.
					</p>
				</div>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{guides.map((guide) => (
						<a
							key={guide.slug}
							href={getHrefForLocale(`/${guide.slug}`, locale)}
							className='group rounded-lg border border-base-content/10 bg-base-100 p-5 transition hover:border-primary hover:bg-base-200'
						>
							<h3 className='mb-2 text-xl font-semibold group-hover:text-primary'>{guide.title}</h3>
							<p className='line-clamp-3 text-base-content/70'>{guide.description}</p>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
