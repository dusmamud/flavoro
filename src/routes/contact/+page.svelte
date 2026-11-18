<script lang="ts">
	import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from '@lucide/svelte';
	import OpenStatus from '#lib/components/OpenStatus.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SubmitButton from '#lib/components/SubmitButton.svelte';
	import { restaurantInfo } from '#lib/api';

	let name = $state('');
	let email = $state('');
	let subject = $state('General Question');
	let message = $state('');
	let error = $state('');
	let invalidField = $state('');
	let submitting = $state(false);
	let sent = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		invalidField = '';
		if (!name.trim()) {
			error = 'Please tell us your name.';
			invalidField = 'name';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			invalidField = 'email';
			return;
		}
		if (message.trim().length < 10) {
			error = 'Please write a message of at least 10 characters.';
			invalidField = 'message';
			return;
		}
		// Brief loading state (simulated send) so the button shows a
		// spinner and cannot double-submit.
		if (submitting) return;
		submitting = true;
		window.setTimeout(() => {
			sent = true;
			submitting = false;
		}, 600);
	}
</script>

<svelte:head>
	<title>Contact — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Get in touch with Flavoro Restaurant — 123 Food Street, New York. Call +1234 567 8900 or send us a message."
	/>
	<meta property="og:title" content="Contact — Flavoro Restaurant" />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Get in Touch</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Contact Us</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		Questions, feedback or a big celebration — we would love to hear from you.
	</p>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
		<div class="space-y-4">
			<div class="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
					<MapPin class="h-6 w-6" />
				</span>
				<div>
					<h2 class="font-display text-lg font-bold">Visit Us</h2>
					<!-- NOTE: the address below is a placeholder — replace with
					     the real address when it is confirmed. -->
					<p class="mt-1 text-sm leading-relaxed text-muted">
						123 Food Street,<br />New York, USA 10001
					</p>
					<!-- Placeholder parking/access info — confirm the real
					     details (nearest station, parking) before launch. -->
					<p class="mt-2 text-sm leading-relaxed text-muted">
						Street parking is available nearby, and the nearest subway station is a short
						walk away. The entrance is step-free and wheelchair accessible.
					</p>
					<a
						href="https://maps.google.com/?q=123+Food+Street+New+York"
						target="_blank"
						rel="noreferrer"
						class="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
					>
						Open in Google Maps →
					</a>
				</div>
			</div>
			<div class="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
					<Phone class="h-6 w-6" />
				</span>
				<div>
					<h2 class="font-display text-lg font-bold">Call Us</h2>
					<a href="tel:+12345678900" class="mt-1 block text-sm text-muted hover:text-brand">
						{restaurantInfo.phone}
					</a>
				</div>
			</div>
			<div class="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
					<Mail class="h-6 w-6" />
				</span>
				<div>
					<h2 class="font-display text-lg font-bold">Email Us</h2>
					<a href="mailto:info@flavoro.com" class="mt-1 block text-sm text-muted hover:text-brand">
						{restaurantInfo.email}
					</a>
				</div>
			</div>
			<div class="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
					<Clock class="h-6 w-6" />
				</span>
				<div>
					<h2 class="font-display text-lg font-bold">Opening Hours</h2>
					<p class="mt-1 text-sm leading-relaxed text-muted">
						{restaurantInfo.hoursWeekday}<br />{restaurantInfo.hoursWeekend}
					</p>
					<div class="mt-3 flex flex-col items-start gap-1.5">
						<OpenStatus tone="light" showTodayHours />
					</div>
					<!-- Placeholder holiday-hours note — replace with the real
					     holiday schedule when it is confirmed. -->
					<p class="mt-3 text-sm leading-relaxed text-muted">
						Holiday hours may differ — on public holidays we usually open at 12:00 PM and
						close early. Call us to confirm before you visit.
					</p>
					<p class="mt-2 font-script text-2xl text-brand">We are Open Everyday!</p>
				</div>
			</div>
		</div>

		{#if sent}
			<div class="flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-xl" role="status">
				<CheckCircle2 class="h-16 w-16 text-brand" />
				<h2 class="mt-4 font-display text-3xl font-black">Message Sent!</h2>
				<p class="mt-3 max-w-md text-muted">
					Thank you, {name}. We have received your message about “{subject}” and will reply to {email}
					within one working day.
				</p>
				<button
					type="button"
					onclick={() => {
						sent = false;
						name = '';
						email = '';
						message = '';
					}}
					class="mt-6 flex h-11 items-center rounded-full border-2 border-brand px-6 font-semibold text-brand hover:bg-brand hover:text-white"
				>
					Send Another Message
				</button>
			</div>
		{:else}
			<form
				onsubmit={submit}
				novalidate
				class="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
				aria-label="Contact form"
			>
				<h2 class="font-display text-2xl font-black">Send Us a Message</h2>
				{#if error}
					<p class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
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
						<span class="mb-1.5 block text-sm font-semibold">Email</span>
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
						<span class="mb-1.5 block text-sm font-semibold">Subject</span>
						<select
							bind:value={subject}
							class="field h-12"
						>
							<option>General Question</option>
							<option>Reservation Help</option>
							<option>Private Event</option>
							<option>Feedback</option>
						</select>
					</label>
					<label class="block sm:col-span-2">
						<span class="mb-1.5 block text-sm font-semibold">Message</span>
						<textarea
							bind:value={message}
							rows="5"
							placeholder="Write your message here…"
							required
							aria-invalid={invalidField === 'message' ? true : undefined}

							class="field resize-none py-3 {invalidField === 'message' ? 'field-error' : ''}"
						></textarea>
					</label>
				</div>
				<div class="mt-6">
					<SubmitButton loading={submitting} label="Send Message" loadingLabel="Sending…">
						<Send class="h-5 w-5" />
					</SubmitButton>
				</div>
			</form>
		{/if}
	</div>
</section>
</Reveal>
