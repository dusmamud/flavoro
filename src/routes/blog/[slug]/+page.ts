import { error } from '@sveltejs/kit';
import { blogPosts } from '#lib/api';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => blogPosts.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const post = blogPosts.find((p) => p.slug === params.slug);
	if (!post) error(404, 'Blog post not found');
	const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
	return { post, related };
};
