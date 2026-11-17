<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { cart, formatPrice } from '#lib/cart.svelte';
	import { toast } from '#lib/toast.svelte';
	import type { Dish } from '#lib/api';

	let { dish }: { dish: Dish } = $props();

	function addToCart() {
		cart.add(dish);
		toast.show(`${dish.name} added to cart`);
	}
</script>

<article
	class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(31,26,21,0.08)] transition-shadow hover:shadow-[0_14px_40px_rgba(31,26,21,0.14)]"
>
	<div class="relative aspect-[16/10] overflow-hidden bg-cream-deep">
		<img
			src={dish.image}
			alt={dish.name}
			loading="lazy"
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		{#if dish.badge}
			<span
				class="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold text-white"
			>
				{dish.badge}
			</span>
		{/if}
	</div>
	<div class="flex flex-1 flex-col p-4">
		<h3 class="font-display text-lg font-bold">{dish.name}</h3>
		<p class="mt-1 flex-1 text-sm leading-relaxed text-muted">{dish.description}</p>
		<div class="mt-3 flex items-center justify-between">
			<span class="text-lg font-bold text-brand">{formatPrice(dish.price)}</span>
			<button
				type="button"
				onclick={addToCart}
				aria-label="Add {dish.name} to cart"
				class="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
			>
				<Plus class="h-5 w-5" />
			</button>
		</div>
	</div>
</article>
