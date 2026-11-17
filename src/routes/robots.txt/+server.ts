import { PUBLIC_SITE_URL } from '$app/env/public';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${PUBLIC_SITE_URL}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
