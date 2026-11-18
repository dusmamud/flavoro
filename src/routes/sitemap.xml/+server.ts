import { PUBLIC_SITE_URL } from '$app/env/public';
import { blogPosts } from '#lib/api';
import type { RequestHandler } from './$types';

export const prerender = true;

const staticPages = ['', 'about', 'menu', 'gallery', 'reservations', 'blog', 'contact', 'cart', 'search', 'privacy', 'terms', 'order', 'catering', 'private-dining', 'gift-cards', 'faq'];

export const GET: RequestHandler = () => {
	const urls = [
		...staticPages.map((p) => `${PUBLIC_SITE_URL}/${p ? `${p}/` : ''}`),
		...blogPosts.map((p) => `${PUBLIC_SITE_URL}/blog/${p.slug}/`)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
		.map((u) => `  <url><loc>${u}</loc></url>`)
		.join('\n')}\n</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
