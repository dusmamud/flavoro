<script lang="ts">
	import { Search } from '@lucide/svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import { menuCategories, menuDishes, type DishCategory } from '#lib/api';

	let category = $state<'All' | DishCategory>('All');
	let query = $state('');

	const filtered = $derived(
		menuDishes.filter((d) => {
			const inCategory = category === 'All' || d.category === category;
			const q = query.trim().toLowerCase();
			const inQuery =
				!q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
			return inCategory && inQuery;
		})
	);
</script>

<svelte:head>
	<title>Menu — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Browse the Flavoro menu: starters, main course, pizza, pasta, desserts and drinks — all made fresh."
	/>
	<meta property="og:title" content="Menu — Flavoro Restaurant" />
	<meta property="og:image" content="/images/dish-pizza.jpg" />
</svelte:head>

<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Our Menu</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Taste Something Delicious</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		Every dish is cooked fresh to order. Pick a category or search for your favourite.
	</p>
</section>

<section class="bg-cream py-14 lg:py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center gap-4">
			<div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
				{#each menuCategories as c (c)}
					<button
						type="button"
						onclick={() => (category = c)}
						aria-pressed={category === c}
						class="flex h-11 items-center rounded-full px-5 text-sm font-semibold transition-colors {category ===
						c
							? 'bg-brand text-white'
							: 'bg-white text-ink shadow-sm hover:bg-brand/10'}"
					>
						{c}
					</button>
				{/each}
			</div>
			<label class="relative w-full max-w-md">
				<span class="sr-only">Search the menu</span>
				<Search class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted" />
				<input
					type="search"
					bind:value={query}
					placeholder="Search dishes…"
					class="h-12 w-full rounded-full border border-ink/10 bg-white pr-4 pl-12 text-[15px] outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
				/>
			</label>
		</div>

		{#if filtered.length === 0}
			<p class="mt-12 text-center text-muted">
				No dishes match “{query}” in {category}. Try another search.
			</p>
		{:else}
			<p class="mt-10 text-sm font-medium text-muted" aria-live="polite">
				Showing {filtered.length} dish{filtered.length === 1 ? '' : 'es'}
				{category === 'All' ? '' : `in ${category}`}
			</p>
			<div class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filtered as dish (dish.id)}
					<DishCard {dish} />
				{/each}
			</div>
		{/if}
	</div>
</section>
