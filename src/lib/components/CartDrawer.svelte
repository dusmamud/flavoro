<script lang="ts">
	import { Minus, Plus, ShoppingBag, Trash2, X } from '@lucide/svelte';
	import { cart, formatPrice } from '#lib/cart.svelte';
	import { ui } from '#lib/ui.svelte';
</script>

{#if ui.cartOpen}
	<div
		class="fixed inset-0 z-[70] bg-black/50"
		role="presentation"
		onclick={() => ui.closeCart()}
	></div>
	<div
		class="fixed top-0 right-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
		role="dialog"
		aria-label="Your cart"
	>
		<div class="flex items-center justify-between border-b px-5 py-4">
			<h2 class="flex items-center gap-2 font-display text-2xl font-bold">
				<ShoppingBag class="h-6 w-6 text-brand" />
				Your Cart
				<span class="text-base font-semibold text-muted">({cart.count})</span>
			</h2>
			<button
				type="button"
				onclick={() => ui.closeCart()}
				aria-label="Close cart"
				class="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream"
			>
				<X class="h-6 w-6" />
			</button>
		</div>

		{#if cart.items.length === 0}
			<div class="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
				<span class="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
					<ShoppingBag class="h-9 w-9 text-brand" />
				</span>
				<p class="font-display text-xl font-bold">Your cart is empty</p>
				<p class="text-sm text-muted">Add something delicious from the menu.</p>
				<a
					href="/menu/"
					onclick={() => ui.closeCart()}
					class="flex h-11 items-center rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-dark"
				>
					Browse the Menu
				</a>
			</div>
		{:else}
			<ul class="flex-1 divide-y overflow-y-auto px-5">
				{#each cart.items as item (item.dish.id)}
					<li class="flex gap-4 py-4">
						<img
							src={item.dish.image}
							alt={item.dish.name}
							class="h-20 w-20 shrink-0 rounded-xl object-cover"
						/>
						<div class="flex min-w-0 flex-1 flex-col">
							<div class="flex items-start justify-between gap-2">
								<h3 class="font-display text-base font-bold">{item.dish.name}</h3>
								<button
									type="button"
									onclick={() => cart.remove(item.dish.id)}
									aria-label="Remove {item.dish.name} from cart"
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-cream hover:text-red-600"
								>
									<Trash2 class="h-4 w-4" />
								</button>
							</div>
							<p class="text-sm text-brand font-bold">{formatPrice(item.dish.price)}</p>
							<div class="mt-auto flex items-center justify-between pt-2">
								<div class="flex items-center gap-1 rounded-full border border-ink/10">
									<button
										type="button"
										onclick={() => cart.setQty(item.dish.id, item.qty - 1)}
										aria-label="Decrease quantity of {item.dish.name}"
										class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream"
									>
										<Minus class="h-4 w-4" />
									</button>
									<span class="w-6 text-center text-sm font-semibold" aria-live="polite">{item.qty}</span>
									<button
										type="button"
										onclick={() => cart.setQty(item.dish.id, item.qty + 1)}
										aria-label="Increase quantity of {item.dish.name}"
										class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream"
									>
										<Plus class="h-4 w-4" />
									</button>
								</div>
								<span class="text-sm font-bold">{formatPrice(item.dish.price * item.qty)}</span>
							</div>
						</div>
					</li>
				{/each}
			</ul>
			<div class="border-t px-5 py-4">
				<div class="flex items-center justify-between text-lg font-bold">
					<span>Total</span>
					<span class="text-brand">{formatPrice(cart.total)}</span>
				</div>
				<p class="mt-1 text-xs text-muted">Demo checkout — no payment is taken on this site yet.</p>
				<a
					href="/cart/"
					onclick={() => ui.closeCart()}
					class="mt-4 flex h-12 items-center justify-center rounded-full bg-brand font-semibold text-white hover:bg-brand-dark"
				>
					View Cart &amp; Checkout
				</a>
			</div>
		{/if}
	</div>
{/if}
