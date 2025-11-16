import { IoMdHome } from 'react-icons/io';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import pubfn from '@/lib/function';
import ReadOnlyQuill from '@/components/blog/ReadOnlyQuill';
import Sidebar from '@/components/blog/sidebar';
import { getProduct } from '@/api-gateways/post';
import { notFound } from 'next/navigation';
import { SiteConfig } from '@/lib/config/site';
import { url } from '@/config';

export async function generateMetadata({ params }) {
	const langName = defaultLocale;
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
	const langName = defaultLocale;
	const dict = await getDictionary(langName);
	const item = await getProduct(params?.name);

	if (!item) notFound();

	return (
		<main className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
			{/* Header Section */}
			<article className="mb-12">
				{/* Categories */}
				{item.categories && item.categories.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-6">
						{item.categories.map((cat, i) => (
							<span 
								key={i} 
								className="text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary"
							>
								{cat}
							</span>
						))}
					</div>
				)}

				{/* Title */}
				<h1 className="text-4xl md:text-5xl font-bold mb-6 text-base-content leading-tight">
					{item.title}
				</h1>

				{/* Meta Info - No Author */}
				<div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-base-content/60">
					<span>{pubfn.timeFormat(item.createdAt, 'MMMM dd, yyyy')}</span>
					{item.tags && item.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{item.tags.map((tag, i) => (
								<span 
									key={i} 
									className="px-3 py-1 rounded-full bg-base-200 text-base-content/70"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>

				{/* Featured Image */}
				{item.featuredImage && (
					<div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
						<img
							src={item.featuredImage.startsWith('http') ? item.featuredImage : `${url}/uploads/${item.featuredImage}`}
							alt={item?.title}
							className="w-full h-auto object-cover"
						/>
					</div>
				)}

				{/* Content */}
				<div className="prose prose-lg max-w-none">
					<ReadOnlyQuill value={item.content} />
				</div>
			</article>
		</main>
	);
}
