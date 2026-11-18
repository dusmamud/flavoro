<script lang="ts">
	import {
		Bike,
		CheckCircle2,
		Clock,
		Minus,
		Phone,
		Plus,
		ShoppingBag,
		Store,
		Trash2
	} from '@lucide/svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SubmitButton from '#lib/components/SubmitButton.svelte';
	import { menuCategories, menuDishes, restaurantInfo } from '#lib/api';
	import { cart, formatPrice } from '#lib/cart.svelte';
	import type { DishCategory } from '#lib/api';

	type Fulfilment = 'pickup' | 'delivery';

	let fulfilment = $state<Fulfilment>('pickup');
	let category: 'All' | DishCategory = $state('All');
	let name = $state('');
	let phone = $state('');
	let address = $state('');
	let pickupTime = $state('18:30');
	let error = $state('');
	let invalidField = $state('');
	let submitting = $state(false);
	let confirmation = $state<string | null>(null);
	let confirmedTotal = $state(0);
	let confirmedFulfilment = $state<Fulfilment>('pickup');

	const deliveryFee = 3.99;
	const freeDeliveryOver = 30;

	const visibleDishes = $derived(
		category === 'All' ? menuDishes : menuDishes.filter((d) => d.category === category)
	);
	const fee = $derived(
		fulfilment === 'delivery' && cart.total < freeDeliveryOver ? deliveryFee : 0
	);
	const grandTotal = $derived(cart.total + fee);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		invalidField = '';
		if (cart.items.length === 0) {
			error = 'Your cart is empty — add a dish before checking out.';
			return;
		}
		if (!name.trim()) {
			error = 'Please tell us your name.';
			invalidField = 'name';
			return;
		}
		if (!/^\+?[0-9\s\-()]{7,}$/.test(phone.trim())) {
			error = 'Please enter a valid phone number so we can confirm your order.';
			invalidField = 'phone';
			return;
		}
		if (fulfilment === 'delivery' && !address.trim()) {
			error = 'Please enter a delivery address.';
			invalidField = 'address';
			return;
		}
		// Brief loading state (simulated send) so the button shows a
		// spinner and cannot double-submit.
		if (submitting) return;
		submitting = true;
		window.setTimeout(() => {
			confirmedTotal = grandTotal;
			confirmedFulfilment = fulfilment;
			confirmation = `FLV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
			cart.clear();
			submitting = false;
		}, 600);
	}
</script>

<svelte:head>
	<title>Order Online — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Order Flavoro online for pickup or delivery. Guest checkout, no account needed."
	/>
	<meta property="og:title" content="Order Online — Flavoro Restaurant" />
	<meta property="og:image" content="/images/dish-pizza.jpg" />
</svelte:head>

<Reveal>
	<section class="bg-night py-16 text-center text-white lg:py-20">
		<p class="font-script text-3xl text-brand">Skip the Queue</p>
		<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Order Online</h1>
		<p class="mx-auto mt-4 max-w-xl text-white/70">
			Pickup or delivery, guest checkout — no account needed.
		</p>
	</section>
</Reveal>

<Reveal>
	<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if confirmation}
			<div class="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl" role="status">
				<CheckCircle2 class="mx-auto h-16 w-16 text-brand" />
				<h2 class="mt-4 font-display text-3xl font-black">Order Confirmed!</h2>
				<p class="mt-3 text-muted">
					Thank you, <strong class="text-ink">{name}</strong>. Your
					{confirmedFulfilment === 'delivery' ? 'delivery' : 'pickup'} order totalling
					<strong class="text-ink">{formatPrice(confirmedTotal)}</strong> is confirmed.
					{#if confirmedFulfilment === 'delivery'}
						We will bring it to <strong class="text-ink">{address}</strong>.
					{:else}
						Please collect it at the restaurant around
						<strong class="text-ink">{pickupTime}</strong>.
					{/if}
				</p>
				<p class="mt-4 inline-block rounded-full bg-cream px-5 py-2 font-mono text-sm font-bold">
					Order number: {confirmation}
				</p>
				<p class="mt-4 text-sm text-muted">
					Demo — orders are confirmed on this device only. No payment was taken and nothing was
					sent to the kitchen yet.
				</p>
				<div class="mt-6 flex flex-wrap justify-center gap-3">
					<a
						href="/menu/"
						class="flex h-11 items-center rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-dark"
					>
						Order More
					</a>
					<button
						type="button"
						onclick={() => {
							confirmation = null;
							name = '';
							phone = '';
							address = '';
						}}
						class="flex h-11 items-center rounded-full border-2 border-brand px-6 font-semibold text-brand hover:bg-brand hover:text-white"
					>
						Place Another Order
					</button>
				</div>
			</div>
		{:else}
			<!-- Pickup / delivery toggle -->
			<div
				class="mx-auto flex max-w-md rounded-full bg-white p-1.5 shadow-[0_8px_30px_rgba(31,26,21,0.08)]"
				role="group"
				aria-label="Pickup or delivery"
			>
				<button
					type="button"
					aria-pressed={fulfilment === 'pickup'}
					onclick={() => (fulfilment = 'pickup')}
					class="flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-all active:scale-[0.98] {fulfilment ===
					'pickup'
						? 'bg-brand text-white'
						: 'text-ink hover:bg-cream'}"
				>
					<Store class="h-5 w-5" /> Pickup
				</button>
				<button
					type="button"
					aria-pressed={fulfilment === 'delivery'}
					onclick={() => (fulfilment = 'delivery')}
					class="flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-all active:scale-[0.98] {fulfilment ===
					'delivery'
						? 'bg-brand text-white'
						: 'text-ink hover:bg-cream'}"
				>
					<Bike class="h-5 w-5" /> Delivery
				</button>
			</div>
			<p class="mt-3 text-center text-sm text-muted">
				{#if fulfilment === 'pickup'}
					Free pickup at {restaurantInfo.address}. Ready in about 20 minutes.
				{:else}
					Delivery {formatPrice(deliveryFee)} — free on orders over {formatPrice(
						freeDeliveryOver
					)}. We deliver within 5 miles.
				{/if}
			</p>

			<div class="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
				<!-- Menu -->
				<div>
					<div class="flex flex-wrap gap-2" role="group" aria-label="Filter dishes by category">
						{#each menuCategories as cat (cat)}
							<button
								type="button"
								aria-pressed={category === cat}
								onclick={() => (category = cat)}
								class="flex h-11 items-center rounded-full px-5 text-sm font-semibold transition-all duration-200 active:scale-95 {category ===
								cat
									? 'bg-brand text-white'
									: 'bg-white text-ink hover:bg-brand/10'}"
							>
								{cat}
							</button>
						{/each}
					</div>
					<div class="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{#each visibleDishes as dish, i (dish.id)}
							<Reveal class="h-full" delay={Math.min((i % 6) * 70, 350)}>
								<DishCard {dish} />
							</Reveal>
						{/each}
					</div>
				</div>

				<!-- Cart summary + checkout -->
				<aside class="lg:sticky lg:top-24 lg:self-start">
					<div class="rounded-3xl bg-white p-6 shadow-xl sm:p-7">
						<h2 class="flex items-center gap-2 font-display text-2xl font-black">
							<ShoppingBag class="h-6 w-6 text-brand" /> Your Order
						</h2>
						{#if cart.items.length === 0}
							<p class="mt-4 text-[15px] leading-relaxed text-muted">
								Your cart is empty. Tap the <strong class="text-ink">+</strong> on any dish to add it here.
							</p>
						{:else}
							<ul class="mt-4 divide-y">
								{#each cart.items as item (item.dish.id)}
									<li class="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
										<div class="min-w-0 flex-1">
											<p class="truncate text-sm font-semibold">{item.dish.name}</p>
											<p class="text-xs text-muted">{formatPrice(item.dish.price)} each</p>
										</div>
										<div class="flex items-center gap-1 rounded-full border border-ink/10">
											<button
												type="button"
												onclick={() => cart.setQty(item.dish.id, item.qty - 1)}
												aria-label="Decrease quantity of {item.dish.name}"
												class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream"
											>
												<Minus class="h-4 w-4" />
											</button>
											<span class="w-5 text-center text-sm font-semibold" aria-live="polite"
												>{item.qty}</span
											>
											<button
												type="button"
												onclick={() => cart.setQty(item.dish.id, item.qty + 1)}
												aria-label="Increase quantity of {item.dish.name}"
												class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream"
											>
												<Plus class="h-4 w-4" />
											</button>
										</div>
										<span class="w-16 text-right text-sm font-bold"
											>{formatPrice(item.dish.price * item.qty)}</span
										>
										<button
											type="button"
											onclick={() => cart.remove(item.dish.id)}
											aria-label="Remove {item.dish.name} from cart"
											class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-cream hover:text-red-600"
										>
											<Trash2 class="h-4 w-4" />
										</button>
									</li>
								{/each}
							</ul>
							<div class="mt-5 space-y-2 border-t pt-5 text-[15px]">
								<div class="flex justify-between text-muted">
									<span>Subtotal</span><span>{formatPrice(cart.total)}</span>
								</div>
								<div class="flex justify-between text-muted">
									<span>{fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}</span>
									<span>{fee === 0 ? 'Free' : formatPrice(fee)}</span>
								</div>
								<div class="flex justify-between text-xl font-black">
									<span>Total</span><span class="text-brand">{formatPrice(grandTotal)}</span>
								</div>
							</div>
						{/if}

						<form onsubmit={submit} novalidate class="mt-6" aria-label="Checkout form">
							<h3 class="font-display text-xl font-bold">Checkout</h3>
							{#if error}
								<p
									class="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
									role="alert"
								>
									{error}
								</p>
							{/if}
							<div class="mt-4 grid gap-4">
								<label class="block">
									<span class="mb-1.5 block text-sm font-semibold">Your Name</span>
									<input
										type="text"
										bind:value={name}
										placeholder="e.g. Alex Morgan"
										autocomplete="name"
										required
										aria-invalid={invalidField === 'name' ? true : undefined}
										class="field h-12 {invalidField === 'name' ? 'field-error' : ''}"
									/>
								</label>
								<label class="block">
									<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
										<Phone class="h-4 w-4 text-brand" /> Phone
									</span>
									<input
										type="tel"
										bind:value={phone}
										placeholder="+1 234 567 8900"
										autocomplete="tel"
										required
										aria-invalid={invalidField === 'phone' ? true : undefined}
										class="field h-12 {invalidField === 'phone' ? 'field-error' : ''}"
									/>
								</label>
								{#if fulfilment === 'delivery'}
									<label class="block">
										<span class="mb-1.5 block text-sm font-semibold">Delivery Address</span>
										<textarea
											bind:value={address}
											rows="2"
											placeholder="Street, apartment, city"
											autocomplete="street-address"
											required
											aria-invalid={invalidField === 'address' ? true : undefined}
											class="field resize-none py-3 {invalidField === 'address'
												? 'field-error'
												: ''}"
										></textarea>
									</label>
								{:else}
									<label class="block">
										<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
											<Clock class="h-4 w-4 text-brand" /> Pickup Time
										</span>
										<select bind:value={pickupTime} class="field h-12">
											<option value="ASAP">As soon as possible (~20 min)</option>
											<option value="12:30">12:30 PM</option>
											<option value="13:30">1:30 PM</option>
											<option value="18:30">6:30 PM</option>
											<option value="19:30">7:30 PM</option>
											<option value="20:30">8:30 PM</option>
										</select>
									</label>
								{/if}
							</div>
							<div class="mt-5">
								<SubmitButton
									loading={submitting}
									label="Place Order — {formatPrice(grandTotal)}"
									loadingLabel="Placing your order…"
								>
									<ShoppingBag class="h-5 w-5" />
								</SubmitButton>
							</div>
							<p class="mt-3 text-center text-xs text-muted">
								Demo — orders are confirmed on this device only. No payment is taken; a real
								checkout will connect to the Go backend later.
							</p>
						</form>
					</div>
				</aside>
			</div>
		{/if}
	</div>
</section>
</Reveal>
