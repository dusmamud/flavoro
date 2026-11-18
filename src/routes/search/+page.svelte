<script lang="ts">
	import { onMount } from 'svelte';
	import { Search } from '@lucide/svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import { menuDishes } from '#lib/api';
	import Reveal from '#lib/components/Reveal.svelte';

	// searchParams are forbidden at prerender time — read them in the browser only.
	let query = $state('');
	let searched = $state(false);

	onMount(() => {
		const q = new URLSearchParams(window.location.search).get('q') ?? '';
		query = q;
		searched = true;
	});

	const results = $derived(
		menuDishes.filter((d) => {
			const q = query.trim().toLowerCase();
			return q && (d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
		})
	);
</script>

<svelte:head>
	<title>Search — Flavoro Restaurant</title>
	<meta name="description" content="Search the Flavoro menu." />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Find Your Favourite</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Search the Menu</h1>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<form
			role="search"
			method="get"
			action="/search/"
			class="mx-auto flex max-w-xl gap-2"
		>
			<label class="relative flex-1">
				<span class="sr-only">Search dishes</span>
				<Search class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted" />
				<input
					type="search"
					name="q"
					bind:value={query}
					placeholder="Try “pasta” or “pizza”…"
					class="h-12 w-full rounded-full border border-ink/10 bg-white pr-4 pl-12 text-[15px] outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
				/>
			</label>
			<button
				type="submit"
				class="flex h-12 shrink-0 items-center rounded-full bg-brand px-6 font-semibold text-white transition-all hover:bg-brand-dark active:scale-[0.98]"
			>
				Search
			</button>
		</form>

		{#if searched}
			{#if !query.trim()}
				<p class="mt-10 text-center text-muted">Type a dish name above to search the menu.</p>
			{:else if results.length === 0}
				<p class="mt-10 text-center text-muted">
					No dishes found for “{query}”. Try “pasta”, “pizza” or “chicken”.
				</p>
			{:else}
				<p class="mt-10 text-center text-sm font-medium text-muted" aria-live="polite">
					{results.length} result{results.length === 1 ? '' : 's'} for “{query}”
				</p>
				<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{#each results as dish, i (dish.id)}
						<Reveal class="h-full" delay={Math.min((i % 8) * 70, 490)}>
							<DishCard {dish} />
						</Reveal>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</section>
</Reveal>
