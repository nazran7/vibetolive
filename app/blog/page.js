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
		<main className="container mx-auto md:px-5">
			<div className="hidden md:block absolute left-[5%] top-[10%] z-0">
				<div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,theme(colors.primary/15%),rgba(255,255,255,0))]" />
			</div>

			<div className="breadcrumbs text-sm relative z-10">
				<ul>
					<li>
						<a href="/">
							<IoMdHome />
						</a>
					</li>
					<li>
						<a href="/blog">{dict["Blog"]["title"]}</a>
					</li>
				</ul>
			</div>

			<div className="flex items-start gap-10 py-5">
				<div className="w-full">
					{/* Blog Grid */}
					<section className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{posts.map((item) => (
							<BlogCard key={item._id} lang={langName} item={item} />
						))}
					</section>

					{/* Pagination */}
					<div className="join my-10 flex justify-center">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
							<Link
								key={p}
								href={`/blog?page=${p}`}
								className={`join-item btn ${p === page ? "btn-active" : ""}`}
							>
								{p}
							</Link>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
