<script lang="ts">
	import { ChevronLeft, ChevronRight, Expand, X } from '@lucide/svelte';
	import { galleryItems } from '#lib/api';
	import Reveal from '#lib/components/Reveal.svelte';

	let selected = $state<number | null>(null);

	function open(i: number) {
		selected = i;
	}
	function close() {
		selected = null;
	}
	function step(dir: 1 | -1) {
		if (selected === null) return;
		selected = (selected + dir + galleryItems.length) % galleryItems.length;
	}

	function onKeydown(e: KeyboardEvent) {
		if (selected === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:head>
	<title>Gallery — Flavoro Restaurant</title>
	<meta
		name="description"
		content="A look inside Flavoro: our dining room, fresh ingredients, wood-fired pizza and the dishes we love to serve."
	/>
	<meta property="og:title" content="Gallery — Flavoro Restaurant" />
	<meta property="og:image" content="/images/gallery-1.jpg" />
</svelte:head>

<svelte:window onkeydown={onKeydown} />

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Moments</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Our Gallery</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		From the dining room to the plate — a glimpse of life at Flavoro.
	</p>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each galleryItems as item, i (item.image)}
				<button
					type="button"
					onclick={() => open(i)}
					class="group relative overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					aria-label="View photo: {item.caption}"
				>
					<img
						src={item.image}
						alt={item.alt}
						loading="lazy"
						class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<span
						class="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<span class="font-display text-lg font-bold text-white">{item.caption}</span>
						<Expand class="h-5 w-5 text-white" />
					</span>
				</button>
			{/each}
		</div>
	</div>
</section>
</Reveal>

{#if selected !== null}
	<div
		class="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
		role="dialog"
		aria-modal="true"
		aria-label={galleryItems[selected].caption}
	>
		<button
			type="button"
			onclick={close}
			aria-label="Close gallery"
			class="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
		>
			<X class="h-6 w-6" />
		</button>
		<button
			type="button"
			onclick={() => step(-1)}
			aria-label="Previous photo"
			class="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
		>
			<ChevronLeft class="h-6 w-6" />
		</button>
		<figure class="max-w-4xl">
			<img
				src={galleryItems[selected].image}
				alt={galleryItems[selected].alt}
				class="max-h-[80vh] w-full rounded-2xl object-contain"
			/>
			<figcaption class="mt-4 text-center font-display text-xl font-bold text-white">
				{galleryItems[selected].caption}
				<span class="ml-2 text-sm font-normal text-white/60">
					{selected + 1} / {galleryItems.length}
				</span>
			</figcaption>
		</figure>
		<button
			type="button"
			onclick={() => step(1)}
			aria-label="Next photo"
			class="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
		>
			<ChevronRight class="h-6 w-6" />
		</button>
	</div>
{/if}
