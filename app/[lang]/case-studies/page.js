import Cta from '@/components/home/cta';
import { getDictionary } from '@/lib/i18n';
import { buildPageMetadata, isSupportedLocale, normalizeLocale } from '@/lib/seo/site';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateMetadata({ params }) {
	const langName = normalizeLocale(params.lang);
	const dict = await getDictionary(langName);

	return buildPageMetadata({
		locale: langName,
		path: '/case-studies',
		title: `${dict.CaseStudies?.h1 || 'AI Prototype to Production Case Studies'} | VibeToLive.dev`,
		description:
			dict.CaseStudies?.intro ||
			'See how VibeToLive.dev helps teams turn AI-generated prototypes into production-ready applications.',
	});
}

export default async function CaseStudiesPage({ params }) {
	if (!isSupportedLocale(params.lang)) {
		notFound();
	}

	const langName = normalizeLocale(params.lang);
	const dict = await getDictionary(langName);
	const cases = dict.CaseStudies?.cases || [];

	return (
		<main className='container mx-auto px-5'>
			<section className='relative z-10 flex flex-col items-start md:items-center pt-10 mb-16 overflow-hidden'>
				<h1 className='font-bold text-5xl md:text-7xl bg-gradient-to-r from-base-content from-50% to-primary text-center bg-clip-text text-transparent !leading-[1.25em] mb-5'>
					{dict.CaseStudies?.h1 || 'AI Prototype to Production Success Stories'}
				</h1>
				<p className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center mb-10'>
					{dict.CaseStudies?.intro ||
						'Every AI prototype has potential. These stories show how VibeToLive.dev helps founders and small teams transform raw ideas into fully deployed, scalable products.'}
				</p>
			</section>

			<section className='flex flex-col gap-y-16 mb-32'>
				{cases.map((item, index) => (
					<article
						key={item.title}
						className={`flex flex-col md:flex-row bg-base-200 items-stretch md:items-center shadow-lg rounded-lg overflow-hidden ${
							index % 2 === 1 ? 'md:flex-row-reverse' : ''
						}`}
					>
						<div className='relative w-full md:w-2/5 min-h-[260px] flex flex-shrink-0 overflow-hidden'>
							<Image
								src={item.image}
								alt={item.title}
								fill
								sizes='(max-width: 768px) 100vw, 40vw'
								className='object-cover hover:scale-105 transition-transform duration-300'
							/>
						</div>
						<div className='w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center'>
							<h2 className='text-3xl font-bold mb-3'>{item.title}</h2>
							{item.client && <p className='font-medium mb-2'>Client Type: {item.client}</p>}
							{item.challenge && (
								<p className='mb-2'>
									<strong>Challenge:</strong> {item.challenge}
								</p>
							)}
							{item.solution && (
								<>
									<p className='mb-2 font-semibold'>Solution:</p>
									<ul className='list-disc ml-6 mb-2'>
										{item.solution.map((solution) => (
											<li key={solution}>{solution}</li>
										))}
									</ul>
								</>
							)}
							{item.result && (
								<>
									<p className='mb-2 font-semibold'>Result:</p>
									<ul className='list-disc ml-6 mb-2'>
										{item.result.map((result) => (
											<li key={result}>{result}</li>
										))}
									</ul>
								</>
							)}
							{item.quote && <blockquote className='mt-4 italic text-base-content/70'>&ldquo;{item.quote}&rdquo;</blockquote>}
						</div>
					</article>
				))}
			</section>

			<Cta locale={dict.CTA} CTALocale={dict.CTAButton} />
		</main>
	);
}
