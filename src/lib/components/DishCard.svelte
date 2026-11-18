<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { cart, formatPrice } from '#lib/cart.svelte';
	import { toast } from '#lib/toast.svelte';
	import { allergenLabels, dietaryLabels, type Dish } from '#lib/api';

	let { dish }: { dish: Dish } = $props();

	const dietaryStyles: Record<string, string> = {
		veg: 'bg-green-100 text-green-800',
		vegan: 'bg-emerald-100 text-emerald-800',
		gf: 'bg-amber-100 text-amber-800'
	};

	function addToCart() {
		cart.add(dish);
		toast.show(`${dish.name} added to cart`);
	}
</script>

<article
	class="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(31,26,21,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(31,26,21,0.14)]"
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
		<!-- Description overlay: hover-capable desktops only (see app.css) —
		     slides up over the photo on card hover/focus. Touch devices
		     and narrow screens use the in-flow description below instead,
		     so info is never hidden from them. -->
		<p
			class="dish-desc-overlay absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 via-night/55 to-transparent px-4 pt-10 pb-3 text-sm leading-relaxed text-white"
		>
			{dish.description}
		</p>
	</div>
	<div class="flex flex-1 flex-col p-4">
		<h3 class="font-display text-lg font-bold">{dish.name}</h3>
		<p class="dish-desc-flow mt-1 flex-1 text-sm leading-relaxed text-muted">{dish.description}</p>
		{#if dish.dietary.length > 0}
			<div class="mt-2 flex flex-wrap gap-1.5">
				{#each dish.dietary as tag (tag)}
					<span
						class="rounded-full px-2 py-0.5 text-[11px] font-semibold {dietaryStyles[tag]}"
					>
						{dietaryLabels[tag]}
					</span>
				{/each}
			</div>
		{/if}
		{#if dish.allergens.length > 0}
			<p class="mt-1.5 text-xs text-muted">
				Contains: {dish.allergens.map((a) => allergenLabels[a]).join(' · ')}
			</p>
		{/if}
		<div class="mt-3 flex items-center justify-between">
			<span class="text-lg font-bold text-brand">{formatPrice(dish.price)}</span>
			<button
				type="button"
				onclick={addToCart}
				aria-label="Add {dish.name} to cart"
				class="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-all hover:bg-brand-dark active:scale-90"
			>
				<Plus class="h-5 w-5" />
			</button>
		</div>
	</div>
</article>
