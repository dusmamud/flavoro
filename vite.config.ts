import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				// 404.html is the custom not-found page for unknown URLs on a
				// static host (Cloudflare Pages serves it for unmatched routes).
				// It is not a SPA fallback — every real route is prerendered.
				fallback: '404.html',
				precompress: true,
				strict: true
			})
		})
	]
});
