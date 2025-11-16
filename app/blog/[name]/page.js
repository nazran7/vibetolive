import { IoMdHome } from 'react-icons/io';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import pubfn from '@/lib/function';
import ReadOnlyTipTap from '@/components/blog/ReadOnlyTipTap';
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
		<main className="w-full">
			{/* Hero Header Section - Dribbble Style */}
			<div className="relative w-full mb-12 overflow-hidden">
				{/* Background with theme color - extends fully behind title area and half behind image with curved edge */}
				<div className="absolute inset-0">
					{/* Full background for title area (right side) */}
					<div className="absolute inset-0 lg:left-1/2 bg-base-200"></div>
					{/* Curved background covering half of image area (left side) with smooth curved edge */}
					<div 
						className="absolute inset-0 lg:right-1/2 bg-base-200"
						style={{
							clipPath: 'polygon(0 0, 50% 0, 55% 10%, 52% 25%, 55% 50%, 52% 75%, 55% 90%, 50% 100%, 0 100%)',
						}}
					></div>
				</div>
				
				<div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
						{/* Left Side - Featured Image */}
						{item.featuredImage && (
							<div className="relative lg:pr-8 flex items-center justify-center lg:justify-start py-8 lg:py-12">
								<div className="relative w-full lg:w-auto lg:max-w-md z-10">
									<div className="rounded-2xl overflow-hidden shadow-2xl bg-base-100">
										<img
											src={item.featuredImage.startsWith('http') ? item.featuredImage : `${url}/uploads/${item.featuredImage}`}
											alt={item?.title}
											className="w-full h-auto object-cover"
										/>
									</div>
								</div>
							</div>
						)}

						{/* Right Side - Title and Meta Info */}
						<div className="flex flex-col justify-center py-8 lg:py-12 px-4 lg:px-8 bg-base-200 rounded-2xl lg:rounded-l-none lg:rounded-r-2xl relative z-10">
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
							<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-base-content leading-tight">
								{item.title}
							</h1>

							{/* Meta Info - No Author */}
							<div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60">
								<span>{pubfn.timeFormat(item.createdAt, 'MMMM dd, yyyy')}</span>
								{item.tags && item.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{item.tags.map((tag, i) => (
											<span 
												key={i} 
												className="px-3 py-1 rounded-full bg-base-300 text-base-content/70"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<article className="container mx-auto px-4 md:px-8 py-8 max-w-5xl">
				<div className="prose prose-lg max-w-none">
					<ReadOnlyTipTap value={item.content} />
				</div>
			</article>
		</main>
	);
}
