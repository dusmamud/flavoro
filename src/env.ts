// Environment variables for the static site (SvelteKit 3: declared here with a
// schema; accessed via `$app/env/public`). Secrets never live here — see
// src/lib/api.ts for the API seam (mock/static data now, Go REST API later).
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_SITE_URL: {
		public: true,
		static: true,
		description: 'Public base URL of the site, used for the sitemap and meta tags.',
		schema: (value) => value ?? 'https://flavoro.pages.dev'
	},
	PUBLIC_API_BASE_URL: {
		public: true,
		static: true,
		description: 'Base URL of the Go REST API. Empty means mock/static data.',
		schema: (value) => value ?? ''
	}
});

export const SITE_NAME = 'Flavoro Restaurant';
