<script lang="ts">
	import { CheckCircle2, Mail, Phone, Users } from '@lucide/svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SubmitButton from '#lib/components/SubmitButton.svelte';
	import { restaurantInfo } from '#lib/api';

	// PLACEHOLDER numbers — Dus can change these before launch:
	// room capacities, minimum spend and package prices below are sensible
	// defaults, not confirmed business terms.
	const SEATED_CAPACITY = 40;
	const STANDING_CAPACITY = 60;
	const MIN_SPEND_WEEKDAY = 500;
	const MIN_SPEND_WEEKEND = 800;

	const packages = [
		{
			name: 'Intimate Dinner',
			price: 45,
			unit: 'per person',
			includes: ['Private room for up to 20 guests', 'Three-course set menu', 'Dedicated server', 'Personalised menu cards']
		},
		{
			name: 'Celebration Evening',
			price: 65,
			unit: 'per person',
			includes: [
				`Private room, up to ${SEATED_CAPACITY} seated`,
				'Four-course menu + welcome drink',
				'Dedicated server & bartender',
				'Cake cutting & decoration'
			],
			featured: true
		},
		{
			name: 'Full Buyout',
			price: 120,
			unit: 'per person',
			includes: [
				`Whole restaurant, up to ${STANDING_CAPACITY} standing`,
				'Five-course tasting menu',
				'Full bar & sommelier',
				'Live music space & AV setup'
			]
		}
	];

	const photos = [
		{ src: '/images/interior.jpg', alt: 'The private dining room set for dinner' },
		{ src: '/images/gallery-2.jpg', alt: 'The dining room dressed for an evening event' },
		{ src: '/images/gallery-6.jpg', alt: 'Friends sharing a meal at a long table' }
	];

	let date = $state('');
	let guests = $state(20);
	let occasion = $state('Birthday');
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let details = $state('');
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
		if (guests < 1 || guests > STANDING_CAPACITY) {
			error = `The room holds up to ${STANDING_CAPACITY} guests — please enter a number in that range.`;
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
	<title>Private Dining &amp; Events — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Private dining at Flavoro: a room for up to 40 seated guests, set menus and dedicated service for birthdays, weddings and corporate evenings."
	/>
	<meta property="og:title" content="Private Dining & Events — Flavoro Restaurant" />
	<meta property="og:image" content="/images/interior.jpg" />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Your Own Room</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Private Dining &amp; Events</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		Birthdays, anniversaries, weddings and work evenings — a room of your own, a menu made for
		the occasion.
	</p>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Capacity + minimum spend -->
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<Users class="mx-auto h-7 w-7 text-brand" />
				<p class="mt-2 font-display text-2xl font-black">{SEATED_CAPACITY} seated</p>
				<p class="mt-1 text-sm font-medium text-muted">Up to {STANDING_CAPACITY} standing</p>
			</div>
			<div class="rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<p class="font-display text-3xl font-black text-brand">${MIN_SPEND_WEEKDAY}</p>
				<p class="mt-1 text-sm font-medium text-muted">Minimum spend, Mon–Thu</p>
			</div>
			<div class="rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<p class="font-display text-3xl font-black text-brand">${MIN_SPEND_WEEKEND}</p>
				<p class="mt-1 text-sm font-medium text-muted">Minimum spend, Fri–Sun</p>
			</div>
		</div>

		<!-- Photos of the set-up space (existing images only) -->
		<div class="mt-10 grid gap-4 sm:grid-cols-3">
			{#each photos as photo (photo.src)}
				<img
					src={photo.src}
					alt={photo.alt}
					loading="lazy"
					class="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_8px_30px_rgba(31,26,21,0.08)]"
				/>
			{/each}
		</div>

		<!-- Packages -->
		<div class="mt-12 text-center">
			<p class="font-script text-3xl text-brand">Packages</p>
			<h2 class="mt-1 font-display text-4xl font-black">Evening Packages</h2>
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
					<p class="mt-3">
						<span class="font-display text-4xl font-black text-brand">${pkg.price}</span>
						<span class="text-sm text-muted"> {pkg.unit}</span>
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

		<!-- Inquiry form -->
		<div class="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
			<div>
				<h2 class="font-display text-3xl font-black">Good to Know</h2>
				<ul class="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
					<li class="flex gap-3">
						<Users class="h-5 w-5 shrink-0 text-brand" />
						<span>Room hire is free when the minimum spend is met — otherwise a hire fee applies.</span>
					</li>
					<li class="flex gap-3">
						<Phone class="h-5 w-5 shrink-0 text-brand" />
						<span>Prefer to talk it through? Call <a href="tel:+12345678900" class="font-semibold text-brand">{restaurantInfo.phone}</a></span>
					</li>
				</ul>
				<p class="mt-6 rounded-2xl bg-white p-5 text-sm leading-relaxed text-muted shadow-sm">
					Every inquiry gets a personal reply within one working day. We hold a date for 48 hours
					while you decide — no deposit needed to enquire.
				</p>
			</div>

			{#if confirmation}
				<div class="rounded-3xl bg-white p-8 text-center shadow-xl" role="status">
					<CheckCircle2 class="mx-auto h-16 w-16 text-brand" />
					<h2 class="mt-4 font-display text-3xl font-black">Inquiry Received!</h2>
					<p class="mt-3 text-muted">
						Thank you, <strong class="text-ink">{name}</strong>. Your {occasion.toLowerCase()} inquiry
						for <strong class="text-ink">{guests} guests</strong> on
						<strong class="text-ink">{date}</strong> is in. We will reply to
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
					aria-label="Private dining inquiry form"
				>
					<h2 class="font-display text-2xl font-black">Enquire About the Room</h2>
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
							<span class="mb-1.5 block text-sm font-semibold">Occasion</span>
							<select
								bind:value={occasion}
								class="field h-12"
							>
								<option>Birthday</option>
								<option>Anniversary</option>
								<option>Wedding</option>
								<option>Corporate</option>
								<option>Other celebration</option>
							</select>
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
							<span class="mb-1.5 block text-sm font-semibold">Guests (max {STANDING_CAPACITY})</span>
							<input
								type="number"
								bind:value={guests}
								min="1"
								max={STANDING_CAPACITY}
								required
								aria-invalid={invalidField === 'guests' ? true : undefined}

								class="field h-12 {invalidField === 'guests' ? 'field-error' : ''}"
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
						<label class="block">
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
						<label class="block sm:col-span-2">
							<span class="mb-1.5 block text-sm font-semibold">Tell Us More (optional)</span>
							<textarea
								bind:value={details}
								rows="3"
								placeholder="Menu ideas, decoration, timings…"
								class="field resize-none py-3"
							></textarea>
						</label>
					</div>
					<div class="mt-6">
						<SubmitButton
							loading={submitting}
							label="Send My Inquiry"
							loadingLabel="Sending your inquiry…"
						/>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
</Reveal>
