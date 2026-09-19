import fs from 'fs';
import path from 'path';

// Blog posts live in content/blog/<slug>.json — the filename is the URL slug.
// See README.md ("Writing a blog post") for the file format.
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

function readPost(file) {
	const slug = file.replace(/\.json$/, '');
	const data = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'));
	return {
		...data,
		slug,
		categories: data.categories || [],
		tags: data.tags || [],
		sections: data.sections || [],
	};
}

export function getAllPosts() {
	return fs
		.readdirSync(POSTS_DIR)
		.filter((file) => file.endsWith('.json'))
		.map(readPost)
		.filter((post) => !post.draft)
		.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getPostBySlug(slug) {
	return getAllPosts().find((post) => post.slug === slug) || null;
}

export function getPaginatedPosts(page = 1, limit = 10) {
	const posts = getAllPosts();
	const start = (page - 1) * limit;
	return {
		posts: posts.slice(start, start + limit),
		total: posts.length,
		page,
		pages: Math.ceil(posts.length / limit),
	};
}
