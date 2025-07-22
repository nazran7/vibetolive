import { IoMdHome } from 'react-icons/io';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import pubfn from '@/lib/function';
import HTMLReactParser from 'html-react-parser';
import Sidebar from '@/components/blog/sidebar';
import { getProduct } from '@/api-gateways/post';
import { notFound } from 'next/navigation';
import { SiteConfig } from '@/lib/config/site';
import { url } from '@/config';

export async function generateMetadata({ params }) {
	const langName = params.lang || defaultLocale;
	const item = await getProduct(params?.name);

	if (!item) notFound();

	const siteConfig = SiteConfig[langName];
	const keywords = item.tags || [];

	return {
		title: `${item.metaTitle} - ${siteConfig.name}`,
		description: item.metaDescription,
		keywords: keywords,
		metadataBase: siteConfig.metadataBase,
		openGraph: {
			...siteConfig.openGraph,
			title: item.metaTitle,
			description: item.metaDescription,
		},
		twitter: {
			...siteConfig.twitter,
			title: item.metaTitle,
			description: item.metaDescription,
		},
	};
}

export default async function Page({ params }) {
	const langName = params.lang || defaultLocale;
	const dict = await getDictionary(langName);
	const item = await getProduct(params?.name);

	if (!item) notFound();

	return (
		<main className="container mx-auto md:px-5">
			<div className="breadcrumbs text-sm relative z-10">
				<ul>
					<li>
						<a href={`/${langName}`}>
							<IoMdHome />
						</a>
					</li>
					<li>
						<a href={`/${langName}/blog`}>{dict['Blog']['title']}</a>
					</li>
					<li>
						<span>{item.title}</span>
					</li>
				</ul>
			</div>

			<section className="relative flex flex-col md:flex-row items-start justify-between gap-5 py-5 min-h-[70vh] z-10">
				<div className="w-full md:w-2/3 ring-2 ring-base-content/10 p-5 md:p-10 rounded-2xl bg-base-100">
					<h1 className="mb-3 text-xl md:text-2xl font-bold text-center">
						{item.title}
					</h1>

					<div className="flex flex-col md:flex-row justify-between items-end md:items-center text-base-content/60 text-sm">
						<div>
							{item.categories?.map((cat, i) => (
								<span key={i} className="mr-3">{cat}</span>
							))}
							<span>{pubfn.timeFormat(item.createdAt)}</span>
						</div>
						<div className="flex gap-x-2">
							{item.tags?.map((tag, i) => (
								<span key={i} className="badge badge-outline">{tag}</span>
							))}
						</div>
					</div>

					<div className="divider" />

					{item.featuredImage && (
						<img
							src={`${item?.featuredImage}`}
							alt={item?.title}
							className="rounded-xl mb-5"
						/>
					)}

					<div className="prose max-w-none">{HTMLReactParser(item.content)}</div>
				</div>

				<div className="w-full md:w-1/3">
					<Sidebar description={item.metaDescription} langName={langName} />
				</div>
			</section>
		</main>
	);
}
