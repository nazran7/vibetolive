import { IoMdHome } from "react-icons/io";
import BlogCard from "@/components/blog/card";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { SiteConfig } from "@/lib/config/site";
import { getPaginatedPosts } from "@/api-gateways/post";
import Link from "next/link";

export async function generateMetadata() {
	const langName = defaultLocale;
	const dict = await getDictionary(langName);

	return {
		title: dict["Blog"]["title"] + " - " + SiteConfig[langName].name,
		description: dict["Blog"]["description"],
		keywords: SiteConfig[langName].keywords,
		authors: SiteConfig[langName].authors,
		creator: SiteConfig[langName].creator,
		icons: SiteConfig[langName].icons,
		metadataBase: SiteConfig[langName].metadataBase,
		openGraph: SiteConfig[langName].openGraph,
		twitter: SiteConfig[langName].twitter,
	};
}

// ✅ Server component with pagination support
export default async function Page({ searchParams }) {
	const langName = defaultLocale;
	const dict = await getDictionary(langName);

	const page = Number(searchParams?.page) || 1;
	const limit = 6; // how many posts per page
	const paginated = await getPaginatedPosts(page, limit);

	const posts = paginated?.posts ?? [];
	const totalPages = paginated?.pages ?? 1;

	return (
		<main className="container mx-auto px-4 md:px-8 py-12">
			{/* Header */}
			<div className="mb-12 text-center">
				<h1 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">
					{dict["Blog"]["title"]}
				</h1>
				<p className="text-lg text-base-content/70 max-w-2xl mx-auto">
					{dict["Blog"]["description"] || "Discover our latest articles and insights"}
				</p>
			</div>

			{/* Blog Grid - Dribbble style */}
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
				{posts.map((item) => (
					<BlogCard key={item._id} lang={langName} item={item} />
				))}
			</section>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center gap-2">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
						<Link
							key={p}
							href={`/blog?page=${p}`}
							className={`px-4 py-2 rounded-lg transition-colors ${
								p === page 
									? "bg-primary text-primary-content font-semibold" 
									: "bg-base-200 text-base-content hover:bg-base-300"
							}`}
						>
							{p}
						</Link>
					))}
				</div>
			)}
		</main>
	);
}
