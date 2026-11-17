<script lang="ts">
	import { CalendarDays, CheckCircle2, Clock, Phone, Users } from '@lucide/svelte';
	import { restaurantInfo } from '#lib/api';

	let date = $state('');
	let time = $state('19:00');
	let guests = $state(2);
	let name = $state('');
	let phone = $state('');
	let notes = $state('');
	let error = $state('');
	let confirmation = $state<string | null>(null);

	const today = new Date().toISOString().split('T')[0];

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!name.trim()) {
			error = 'Please tell us your name.';
			return;
		}
		if (!date) {
			error = 'Please pick a date for your table.';
			return;
		}
		if (date < today) {
			error = 'That date is in the past — please pick today or a future date.';
			return;
		}
		if (!/^\+?[0-9\s\-()]{7,}$/.test(phone.trim())) {
			error = 'Please enter a valid phone number so we can confirm your table.';
			return;
		}
		if (guests < 1 || guests > 20) {
			error = 'Party size must be between 1 and 20 guests.';
			return;
		}
		confirmation = `FLV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
	}
</script>

<svelte:head>
	<title>Reservations — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Book your table at Flavoro Restaurant. Good food is better when shared."
	/>
	<meta property="og:title" content="Reservations — Flavoro Restaurant" />
	<meta property="og:image" content="/images/reserve-bg.jpg" />
</svelte:head>

<section class="relative overflow-hidden bg-night py-16 text-white lg:py-20">
	<img
		src="/images/reserve-bg.jpg"
		alt=""
		aria-hidden="true"
		loading="lazy"
		class="absolute inset-0 h-full w-full object-cover opacity-40"
	/>
	<div class="absolute inset-0 bg-night/60" aria-hidden="true"></div>
	<div class="relative text-center">
		<p class="font-script text-3xl text-brand">Book Your Table</p>
		<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Reserve Your Table Now!</h1>
		<p class="mx-auto mt-4 max-w-xl text-white/75">Good food is better when shared.</p>
	</div>
</section>

<section class="bg-cream py-14 lg:py-16">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
		<div>
			<h2 class="font-display text-3xl font-black">Good to Know</h2>
			<ul class="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
				<li class="flex gap-3">
					<Clock class="h-5 w-5 shrink-0 text-brand" />
					<span>{restaurantInfo.hoursWeekday}<br />{restaurantInfo.hoursWeekend}</span>
				</li>
				<li class="flex gap-3">
					<Users class="h-5 w-5 shrink-0 text-brand" />
					<span>Tables for 1–20 guests. Parties over 8, please call us directly.</span>
				</li>
				<li class="flex gap-3">
					<Phone class="h-5 w-5 shrink-0 text-brand" />
					<span
						>Prefer to call? Reach us at <a href="tel:+12345678900" class="font-semibold text-brand"
							>{restaurantInfo.phone}</a
						></span
					>
				</li>
			</ul>
			<p class="mt-6 rounded-2xl bg-white p-5 text-sm leading-relaxed text-muted shadow-sm">
				Your booking is confirmed instantly on this page. We will hold your table for 15 minutes past
				the reserved time.
			</p>
		</div>

		{#if confirmation}
			<div class="rounded-3xl bg-white p-8 text-center shadow-xl" role="status">
				<CheckCircle2 class="mx-auto h-16 w-16 text-brand" />
				<h2 class="mt-4 font-display text-3xl font-black">Table Reserved!</h2>
				<p class="mt-3 text-muted">
					Thank you, <strong class="text-ink">{name}</strong>. Your table for
					<strong class="text-ink">{guests} guest{guests === 1 ? '' : 's'}</strong> is booked for
					<strong class="text-ink">{date}</strong> at
					<strong class="text-ink">{time}</strong>.
				</p>
				<p class="mt-4 inline-block rounded-full bg-cream px-5 py-2 font-mono text-sm font-bold">
					Confirmation: {confirmation}
				</p>
				<p class="mt-4 text-sm text-muted">
					A confirmation text will be sent to {phone}. We look forward to seeing you!
				</p>
				<div class="mt-6 flex flex-wrap justify-center gap-3">
					<a
						href="/menu/"
						class="flex h-11 items-center rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-dark"
					>
						Browse the Menu
					</a>
					<button
						type="button"
						onclick={() => {
							confirmation = null;
							name = '';
							phone = '';
							notes = '';
						}}
						class="flex h-11 items-center rounded-full border-2 border-brand px-6 font-semibold text-brand hover:bg-brand hover:text-white"
					>
						Make Another Booking
					</button>
				</div>
			</div>
		{:else}
			<form
				onsubmit={submit}
				novalidate
				class="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
				aria-label="Reservation form"
			>
				<h2 class="font-display text-2xl font-black">Book a Table</h2>
				{#if error}
					<p class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
						{error}
					</p>
				{/if}
				<div class="mt-6 grid gap-5 sm:grid-cols-2">
					<label class="block">
						<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
							<CalendarDays class="h-4 w-4 text-brand" /> Date
						</span>
						<input
							type="date"
							bind:value={date}
							min={today}
							required
							class="h-12 w-full rounded-xl border border-ink/15 px-4 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
						/>
					</label>
					<label class="block">
						<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
							<Clock class="h-4 w-4 text-brand" /> Time
						</span>
						<select
							bind:value={time}
							class="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
						>
							<option value="11:00">11:00 AM</option>
							<option value="12:00">12:00 PM</option>
							<option value="13:00">1:00 PM</option>
							<option value="14:00">2:00 PM</option>
							<option value="18:00">6:00 PM</option>
							<option value="19:00">7:00 PM</option>
							<option value="20:00">8:00 PM</option>
							<option value="21:00">9:00 PM</option>
						</select>
					</label>
					<label class="block">
						<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
							<Users class="h-4 w-4 text-brand" /> Guests
						</span>
						<input
							type="number"
							bind:value={guests}
							min="1"
							max="20"
							required
							class="h-12 w-full rounded-xl border border-ink/15 px-4 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
						/>
					</label>
					<label class="block">
						<span class="mb-1.5 block text-sm font-semibold">Your Name</span>
						<input
							type="text"
							bind:value={name}
							placeholder="e.g. Alex Morgan"
							autocomplete="name"
							required
							class="h-12 w-full rounded-xl border border-ink/15 px-4 text-[15px] outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
						/>
					</label>
					<label class="block sm:col-span-2">
						<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
							<Phone class="h-4 w-4 text-brand" /> Phone
						</span>
						<input
							type="tel"
							bind:value={phone}
							placeholder="+1 234 567 8900"
							autocomplete="tel"
							required
							class="h-12 w-full rounded-xl border border-ink/15 px-4 text-[15px] outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
						/>
					</label>
					<label class="block sm:col-span-2">
						<span class="mb-1.5 block text-sm font-semibold">Special Requests (optional)</span>
						<textarea
							bind:value={notes}
							rows="3"
							placeholder="Birthday, window seat, allergies…"
							class="w-full resize-none rounded-xl border border-ink/15 px-4 py-3 text-[15px] outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
						></textarea>
					</label>
				</div>
				<button
					type="submit"
					class="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand-dark"
				>
					<CalendarDays class="h-5 w-5" />
					Confirm Reservation
				</button>
			</form>
		{/if}
	</div>
</section>
