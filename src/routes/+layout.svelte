<script lang="ts">
	import { page } from '$app/state';
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/500.css';
	import '@fontsource/playfair-display/600.css';
	import '@fontsource/playfair-display/700.css';
	import '@fontsource/playfair-display/800.css';
	import '@fontsource/playfair-display/900.css';
	import '@fontsource/playfair-display/400-italic.css';
	import '@fontsource/playfair-display/700-italic.css';
	import '@fontsource/great-vibes/400.css';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import MobileActionBar from '#lib/components/MobileActionBar.svelte';
	import Toast from '#lib/components/Toast.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="theme-color" content="#0e0b08" />
	<!-- Marks JS as present before first paint: the scroll-reveal hidden
	     state (app.css) only applies with .js, so no-JS users always see
	     content. Runs before body render, so there is no flash. -->
	<script>
		document.documentElement.classList.add('js');
	</script>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{#key page.url.pathname}
			<div class="page-enter">
				{@render children()}
			</div>
		{/key}
	</main>
	<Footer />
</div>

<MobileActionBar />
<CartDrawer />
<Toast />
