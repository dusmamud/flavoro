<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft, Home, SearchX } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Page Not Found — Flavoro Restaurant</title>
	<meta name="description" content="This page could not be found at Flavoro Restaurant." />
</svelte:head>

<section class="bg-cream py-20 text-center lg:py-28">
	<div class="mx-auto max-w-xl px-4">
		<SearchX class="mx-auto h-16 w-16 text-brand" />
		<p class="mt-6 font-script text-3xl text-brand">Oops!</p>
		<h1 class="mt-2 font-display text-5xl font-black sm:text-6xl">
			{page.status === 404 ? '404' : page.status}
		</h1>
		<p class="mt-4 text-lg text-muted">
			{page.error?.message ?? 'The page you are looking for does not exist.'}
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a
				href="/"
				class="flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-dark"
			>
				<Home class="h-5 w-5" /> Back to Home
			</a>
			<a
				href="/menu/"
				class="flex h-12 items-center gap-2 rounded-full border-2 border-brand px-7 font-semibold text-brand hover:bg-brand hover:text-white"
			>
				<ArrowLeft class="h-5 w-5" /> Browse the Menu
			</a>
		</div>
	</div>
</section>
