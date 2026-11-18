<script lang="ts">
	import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from '@lucide/svelte';
	import { cart, formatPrice } from '#lib/cart.svelte';
	import { toast } from '#lib/toast.svelte';
	import Reveal from '#lib/components/Reveal.svelte';

	let orderPlaced = $state(false);
	let orderNo = $state('');

	function checkout() {
		if (cart.items.length === 0) return;
		orderNo = `FLV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		cart.clear();
		orderPlaced = true;
		toast.show('Order placed! Thank you.');
	}
</script>

<svelte:head>
	<title>Your Cart — Flavoro Restaurant</title>
	<meta name="description" content="Review your Flavoro order before checkout." />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Your Order</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Cart</h1>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-4xl px-4 sm:px-6">
		{#if orderPlaced}
			<div class="rounded-3xl bg-white p-8 text-center shadow-xl" role="status">
				<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
					<ShoppingBag class="h-10 w-10 text-brand" />
				</span>
				<h2 class="mt-5 font-display text-3xl font-black">Order Placed!</h2>
				<p class="mx-auto mt-3 max-w-md text-muted">
					Thank you for ordering from Flavoro. Your order number is
					<strong class="text-ink">{orderNo}</strong>. This is a demo checkout — no payment was taken.
				</p>
				<a
					href="/menu/"
					class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-dark"
				>
					Order More <ArrowRight class="h-5 w-5" />
				</a>
			</div>
		{:else if cart.items.length === 0}
			<div class="rounded-3xl bg-white p-8 text-center shadow-xl">
				<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream">
					<ShoppingBag class="h-10 w-10 text-brand" />
				</span>
				<h2 class="mt-5 font-display text-3xl font-black">Your cart is empty</h2>
				<p class="mt-3 text-muted">Add something delicious from the menu.</p>
				<a
					href="/menu/"
					class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-dark"
				>
					Browse the Menu <ArrowRight class="h-5 w-5" />
				</a>
			</div>
		{:else}
			<div class="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
				<ul class="divide-y">
					{#each cart.items as item (item.dish.id)}
						<li class="flex gap-4 py-5 first:pt-0 last:pb-0">
							<img
								src={item.dish.image}
								alt={item.dish.name}
								class="h-24 w-24 shrink-0 rounded-2xl object-cover"
							/>
							<div class="flex min-w-0 flex-1 flex-col">
								<div class="flex items-start justify-between gap-2">
									<h2 class="font-display text-lg font-bold">{item.dish.name}</h2>
									<button
										type="button"
										onclick={() => cart.remove(item.dish.id)}
										aria-label="Remove {item.dish.name} from cart"
										class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-cream hover:text-red-600"
									>
										<Trash2 class="h-4 w-4" />
									</button>
								</div>
								<p class="text-sm text-muted">{item.dish.description}</p>
								<div class="mt-auto flex items-center justify-between pt-3">
									<div class="flex items-center gap-1 rounded-full border border-ink/10">
										<button
											type="button"
											onclick={() => cart.setQty(item.dish.id, item.qty - 1)}
											aria-label="Decrease quantity of {item.dish.name}"
											class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream"
										>
											<Minus class="h-4 w-4" />
										</button>
										<span class="w-6 text-center text-sm font-semibold" aria-live="polite">{item.qty}</span>
										<button
											type="button"
											onclick={() => cart.setQty(item.dish.id, item.qty + 1)}
											aria-label="Increase quantity of {item.dish.name}"
											class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream"
										>
											<Plus class="h-4 w-4" />
										</button>
									</div>
									<span class="font-bold">{formatPrice(item.dish.price * item.qty)}</span>
								</div>
							</div>
						</li>
					{/each}
				</ul>
				<div class="mt-6 space-y-2 border-t pt-6 text-[15px]">
					<div class="flex justify-between text-muted">
						<span>Subtotal</span><span>{formatPrice(cart.total)}</span>
					</div>
					<div class="flex justify-between text-muted">
						<span>Delivery</span><span>Free pickup</span>
					</div>
					<div class="flex justify-between text-xl font-black">
						<span>Total</span><span class="text-brand">{formatPrice(cart.total)}</span>
					</div>
				</div>
				<button
					type="button"
					onclick={checkout}
					class="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white transition-all hover:bg-brand-dark active:scale-[0.98]"
				>
					Place Order — {formatPrice(cart.total)}
				</button>
				<p class="mt-3 text-center text-xs text-muted">
					Demo checkout — no payment is taken. A real checkout will connect to the Go backend later.
				</p>
			</div>
		{/if}
	</div>
</section>
</Reveal>
