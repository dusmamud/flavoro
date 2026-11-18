<script lang="ts">
	import { Bike, CheckCircle2, Clock, Mail, Phone, Store, Users } from '@lucide/svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SubmitButton from '#lib/components/SubmitButton.svelte';
	import { restaurantInfo } from '#lib/api';

	// PLACEHOLDER numbers — Dus can change these before launch:
	// minimum order, lead time, per-person prices and serving sizes below
	// are sensible defaults, not confirmed business terms.
	const MINIMUM_ORDER = 150; // $ minimum catering order
	const LEAD_TIME_HOURS = 48; // book at least 48h ahead
	const MIN_GUESTS = 20; // packages serve 20+ guests

	interface Package {
		name: string;
		pricePerPerson: number;
		serves: string;
		includes: string[];
		featured?: boolean;
	}

	const packages: Package[] = [
		{
			name: 'Lunch Box',
			pricePerPerson: 14,
			serves: `Serves ${MIN_GUESTS}+`,
			includes: ['Choice of sandwich or pasta', 'Garden salad', 'Fresh fruit cup', 'Bottled water']
		},
		{
			name: 'Family Feast',
			pricePerPerson: 22,
			serves: `Serves ${MIN_GUESTS}+`,
			includes: [
				'Two mains (pasta + grilled chicken)',
				'Margherita pizza platter',
				'Garlic bread & salad',
				'Dessert platter'
			],
			featured: true
		},
		{
			name: 'Celebration Spread',
			pricePerPerson: 32,
			serves: `Serves ${MIN_GUESTS}+`,
			includes: [
				'Three mains incl. grilled salmon',
				'Bruschetta & starters platter',
				'Wood-fired pizza station',
				'Tiramisu & lava cake',
				'Lemonade & soft drinks'
			]
		}
	];

	let date = $state('');
	let guests = $state(20);
	let budget = $state('$300 – $600');
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let details = $state('');
	let fulfilment = $state<'pickup' | 'delivery'>('pickup');
	let error = $state('');
	let invalidField = $state('');
	let submitting = $state(false);
	let confirmation = $state<string | null>(null);

	const today = new Date().toISOString().split('T')[0];

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		invalidField = '';
		if (!name.trim()) {
			error = 'Please tell us your name.';
			invalidField = 'name';
			return;
		}
		if (!date) {
			error = 'Please pick a date for your event.';
			invalidField = 'date';
			return;
		}
		if (date < today) {
			error = 'That date is in the past — please pick today or a future date.';
			invalidField = 'date';
			return;
		}
		if (guests < MIN_GUESTS) {
			error = `Catering packages serve ${MIN_GUESTS} guests and more — please enter at least ${MIN_GUESTS}.`;
			invalidField = 'guests';
			return;
		}
		if (!/^\+?[0-9\s\-()]{7,}$/.test(phone.trim())) {
			error = 'Please enter a valid phone number so we can confirm your inquiry.';
			invalidField = 'phone';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			invalidField = 'email';
			return;
		}
		// Brief loading state (simulated send) so the button shows a
		// spinner and cannot double-submit.
		if (submitting) return;
		submitting = true;
		window.setTimeout(() => {
			confirmation = `FLV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
			submitting = false;
		}, 600);
	}
</script>

<svelte:head>
	<title>Catering — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Flavoro catering for offices, parties and events. Packages from $14 per person, serving 20+ guests."
	/>
	<meta property="og:title" content="Catering — Flavoro Restaurant" />
	<meta property="og:image" content="/images/gallery-5.jpg" />
</svelte:head>

<Reveal>
	<section class="bg-night py-16 text-center text-white lg:py-20">
		<p class="font-script text-3xl text-brand">Feed a Crowd</p>
		<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Catering</h1>
		<p class="mx-auto mt-4 max-w-xl text-white/70">
			Office lunches, birthdays and big family days — we bring the Flavoro table to you.
		</p>
	</section>
</Reveal>

<Reveal>
	<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Key facts -->
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<p class="font-display text-3xl font-black text-brand">${MINIMUM_ORDER}</p>
				<p class="mt-1 text-sm font-medium text-muted">Minimum order</p>
			</div>
			<div class="rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<Clock class="mx-auto h-7 w-7 text-brand" />
				<p class="mt-2 font-display text-2xl font-black">{LEAD_TIME_HOURS}h lead time</p>
				<p class="mt-1 text-sm font-medium text-muted">Book at least {LEAD_TIME_HOURS} hours ahead</p>
			</div>
			<div class="rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<Users class="mx-auto h-7 w-7 text-brand" />
				<p class="mt-2 font-display text-2xl font-black">Serves {MIN_GUESTS}+</p>
				<p class="mt-1 text-sm font-medium text-muted">Packages start at {MIN_GUESTS} guests</p>
			</div>
		</div>

		<!-- Packages -->
		<div class="mt-12 text-center">
			<p class="font-script text-3xl text-brand">Packages</p>
			<h2 class="mt-1 font-display text-4xl font-black">Catering Menus</h2>
			<p class="mx-auto mt-3 max-w-xl text-muted">
				Prices per person. Tell us about dietary needs in the form below — vegan and gluten-free
				options are available on every package.
			</p>
		</div>
		<div class="mt-8 grid gap-6 md:grid-cols-3">
			{#each packages as pkg, i (pkg.name)}
				<Reveal class="h-full" delay={Math.min(i * 90, 270)}>
					<article
						class="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_8px_30px_rgba(31,26,21,0.08)] {pkg.featured
							? 'ring-2 ring-brand'
							: ''}"
					>
					{#if pkg.featured}
						<span
							class="self-start rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase"
						>
							Most Popular
						</span>
					{/if}
					<h3 class="mt-3 font-display text-2xl font-bold">{pkg.name}</h3>
					<p class="mt-1 text-sm text-muted">{pkg.serves}</p>
					<p class="mt-3">
						<span class="font-display text-4xl font-black text-brand">${pkg.pricePerPerson}</span>
						<span class="text-sm text-muted"> / person</span>
					</p>
					<ul class="mt-5 flex-1 space-y-2.5 text-[15px] text-ink/85">
						{#each pkg.includes as item (item)}
							<li class="flex gap-2">
								<CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {item}
							</li>
						{/each}
					</ul>
				</article>
				</Reveal>
			{/each}
		</div>

		<!-- Pickup / delivery + inquiry form -->
		<div class="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
			<div>
				<h2 class="font-display text-3xl font-black">How It Works</h2>
				<ul class="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
					<li class="flex gap-3">
						<Store class="h-5 w-5 shrink-0 text-brand" />
						<span><strong class="text-ink">Pickup</strong> — collect your order from the restaurant, hot and ready at your chosen time.</span>
					</li>
					<li class="flex gap-3">
						<Bike class="h-5 w-5 shrink-0 text-brand" />
						<span><strong class="text-ink">Delivery</strong> — we deliver within 5 miles. Larger events, ask us about on-site setup.</span>
					</li>
					<li class="flex gap-3">
						<Phone class="h-5 w-5 shrink-0 text-brand" />
						<span>Questions? Call <a href="tel:+12345678900" class="font-semibold text-brand">{restaurantInfo.phone}</a></span>
					</li>
				</ul>
				<p class="mt-6 rounded-2xl bg-white p-5 text-sm leading-relaxed text-muted shadow-sm">
					Every inquiry gets a personal reply from our team — usually within one working day.
					Final pricing is confirmed by email before anything is booked.
				</p>
			</div>

			{#if confirmation}
				<div class="rounded-3xl bg-white p-8 text-center shadow-xl" role="status">
					<CheckCircle2 class="mx-auto h-16 w-16 text-brand" />
					<h2 class="mt-4 font-display text-3xl font-black">Inquiry Received!</h2>
					<p class="mt-3 text-muted">
						Thank you, <strong class="text-ink">{name}</strong>. Your catering inquiry for
						<strong class="text-ink">{guests} guests</strong> on
						<strong class="text-ink">{date}</strong> ({fulfilment}) is in. We will reply to
						<strong class="text-ink">{email}</strong> within one working day.
					</p>
					<p class="mt-4 inline-block rounded-full bg-cream px-5 py-2 font-mono text-sm font-bold">
						Reference: {confirmation}
					</p>
					<p class="mt-4 text-sm text-muted">
						Demo — inquiries are confirmed on this device only. Nothing was sent yet.
					</p>
					<button
						type="button"
						onclick={() => {
							confirmation = null;
							name = '';
							phone = '';
							email = '';
							details = '';
						}}
						class="mt-6 inline-flex h-11 items-center rounded-full border-2 border-brand px-6 font-semibold text-brand hover:bg-brand hover:text-white"
					>
						Send Another Inquiry
					</button>
				</div>
			{:else}
				<form
					onsubmit={submit}
					novalidate
					class="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
					aria-label="Catering inquiry form"
				>
					<h2 class="font-display text-2xl font-black">Request a Catering Quote</h2>
					<p class="mt-2 text-sm text-muted">
						Demo — inquiries are confirmed on this device only until the Go backend is connected.
					</p>
					{#if error}
						<p
							class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
							role="alert"
						>
							{error}
						</p>
					{/if}
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
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
						<label class="block sm:col-span-2">
							<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
								<Mail class="h-4 w-4 text-brand" /> Email
							</span>
							<input
								type="email"
								bind:value={email}
								placeholder="you@example.com"
								autocomplete="email"
								required
								aria-invalid={invalidField === 'email' ? true : undefined}

								class="field h-12 {invalidField === 'email' ? 'field-error' : ''}"
							/>
						</label>
						<label class="block">
							<span class="mb-1.5 block text-sm font-semibold">Event Date</span>
							<input
								type="date"
								bind:value={date}
								min={today}
								required
								aria-invalid={invalidField === 'date' ? true : undefined}

								class="field h-12 {invalidField === 'date' ? 'field-error' : ''}"
							/>
						</label>
						<label class="block">
							<span class="mb-1.5 block text-sm font-semibold">Guests (min {MIN_GUESTS})</span>
							<input
								type="number"
								bind:value={guests}
								min={MIN_GUESTS}
								max="500"
								required
								aria-invalid={invalidField === 'guests' ? true : undefined}

								class="field h-12 {invalidField === 'guests' ? 'field-error' : ''}"
							/>
						</label>
						<label class="block">
							<span class="mb-1.5 block text-sm font-semibold">Budget</span>
							<select
								bind:value={budget}
								class="field h-12"
							>
								<option value="$150 – $300">$150 – $300</option>
								<option value="$300 – $600">$300 – $600</option>
								<option value="$600 – $1,000">$600 – $1,000</option>
								<option value="$1,000+">$1,000+</option>
							</select>
						</label>
						<fieldset class="block">
							<legend class="mb-1.5 text-sm font-semibold">Pickup or Delivery</legend>
							<div class="flex gap-2">
								<button
									type="button"
									aria-pressed={fulfilment === 'pickup'}
									onclick={() => (fulfilment = 'pickup')}
									class="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-semibold {fulfilment ===
									'pickup'
										? 'border-brand bg-brand text-white'
										: 'border-ink/15 hover:border-brand'}"
								>
									<Store class="h-4 w-4" /> Pickup
								</button>
								<button
									type="button"
									aria-pressed={fulfilment === 'delivery'}
									onclick={() => (fulfilment = 'delivery')}
									class="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-semibold {fulfilment ===
									'delivery'
										? 'border-brand bg-brand text-white'
										: 'border-ink/15 hover:border-brand'}"
								>
									<Bike class="h-4 w-4" /> Delivery
								</button>
							</div>
						</fieldset>
						<label class="block sm:col-span-2">
							<span class="mb-1.5 block text-sm font-semibold">Tell Us More (optional)</span>
							<textarea
								bind:value={details}
								rows="3"
								placeholder="Occasion, dietary needs, serving style…"
								class="field resize-none py-3"
							></textarea>
						</label>
					</div>
					<div class="mt-6">
						<SubmitButton
							loading={submitting}
							label="Request My Quote"
							loadingLabel="Requesting your quote…"
						/>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
</Reveal>
