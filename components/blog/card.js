'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import pubfn from '@/lib/function';

export default function BlogCard({ lang = 'en', item }) {
	const imageUrl = `http://localhost:5000/uploads/${item.featuredImage}`;

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<a
				title={item.title}
				href={`/${lang || 'en'}/blog/${item?.slug}`}
			>
				<div className="group relative rounded-2xl ring-2 ring-base-content/10 w-full min-h-72 overflow-hidden">
					<Image
						src={imageUrl}
						width={500}
						height={300}
						className="w-full max-h-60 object-cover group-hover:scale-110 transition"
						alt={item.title}
						unoptimized
					/>

					<div className="absolute bg-black left-0 bottom-0 w-full h-36 group-hover:h-48 transition-all flex flex-col justify-between p-5 bg-opacity-20 backdrop-filter backdrop-blur-md">
						<h2 className="text-zinc-200/70 group-hover:text-white transition-all text-base md:text-2xl mb-3 line-clamp-2 group-hover:line-clamp-3">
							{item.title}
						</h2>
						<div className="flex items-center justify-between text-sm md:text-base text-zinc-200/40 group-hover:text-zinc-200/90 transition">
							<div className="w-1/3">{pubfn.timeFormat(item.createdAt, 'yyyy-MM-dd')}</div>
						</div>
					</div>
				</div>
			</a>
		</motion.div>
	);
}
