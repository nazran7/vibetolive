'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import pubfn from '@/lib/function';
import Link from 'next/link';
import { url } from '@/config';

export default function BlogCard({ lang = 'en', item }) {
	const imageUrl = item.featuredImage 
		? (item.featuredImage.startsWith('http') ? item.featuredImage : `${url}/uploads/${item.featuredImage}`)
		: '/placeholder.jpg';

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="group"
		>
			<Link
				href={`/blog/${item?.slug}`}
				className="block"
			>
				<div className="relative rounded-2xl overflow-hidden bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
					{/* Image Container */}
					<div className="relative w-full aspect-[4/3] overflow-hidden bg-base-200">
						<Image
							src={imageUrl}
							fill
							className="object-cover group-hover:scale-110 transition-transform duration-500"
							alt={item.title}
							unoptimized
						/>
					</div>

					{/* Content Card */}
					<div className="p-6 space-y-4">
						{/* Categories */}
						{item.categories && item.categories.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{item.categories.slice(0, 2).map((cat, i) => (
									<span 
										key={i} 
										className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary"
									>
										{cat}
									</span>
								))}
							</div>
						)}

						{/* Title */}
						<h2 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2">
							{item.title}
						</h2>

						{/* Excerpt */}
						{item.excerpt && (
							<p className="text-sm text-base-content/70 line-clamp-2">
								{item.excerpt}
							</p>
						)}

						{/* Footer */}
						<div className="flex items-center justify-between pt-4 border-t border-base-300">
							<span className="text-xs text-base-content/50">
								{pubfn.timeFormat(item.createdAt, 'MMM dd, yyyy')}
							</span>
							{item.tags && item.tags.length > 0 && (
								<div className="flex gap-1">
									{item.tags.slice(0, 2).map((tag, i) => (
										<span 
											key={i} 
											className="text-xs px-2 py-0.5 rounded bg-base-200 text-base-content/60"
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
