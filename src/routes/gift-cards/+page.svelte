<script lang="ts">
	import { CheckCircle2, Gift, Mail } from '@lucide/svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SubmitButton from '#lib/components/SubmitButton.svelte';

	const denominations = [25, 50, 100, 150];

	let amount = $state(50);
	let customAmount = $state('');
	let recipientName = $state('');
	let recipientEmail = $state('');
	let senderName = $state('');
	let message = $state('');
	let error = $state('');
	let invalidField = $state('');
	let submitting = $state(false);
	let confirmation = $state<string | null>(null);
	let confirmedAmount = $state(0);

	const finalAmount = $derived(
		amount === 0 ? Number(customAmount) || 0 : amount
	);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		invalidField = '';
		if (!recipientName.trim()) {
			error = 'Please tell us who the gift card is for.';
			invalidField = 'recipientName';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
			error = 'Please enter a valid email address for the recipient.';
			invalidField = 'recipientEmail';
			return;
		}
		if (!senderName.trim()) {
			error = 'Please tell us your name so the recipient knows who sent it.';
			invalidField = 'senderName';
			return;
		}
		if (finalAmount < 10 || finalAmount > 500) {
			error = 'Please choose an amount between $10 and $500.';
			invalidField = 'amount';
			return;
		}
		// Brief loading state (simulated send) so the button shows a
		// spinner and cannot double-submit.
		if (submitting) return;
		submitting = true;
		window.setTimeout(() => {
			confirmedAmount = finalAmount;
			confirmation = `FLV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
			submitting = false;
		}, 600);
	}
</script>

<svelte:head>
	<title>Gift Cards — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Give a Flavoro gift card — $25, $50, $100 or $150, delivered by email. The tasty gift for any occasion."
	/>
	<meta property="og:title" content="Gift Cards — Flavoro Restaurant" />
	<meta property="og:image" content="/images/dish-lava.jpg" />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Give Good Taste</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Gift Cards</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		The tasty gift for birthdays, thank-yous and everything in between — delivered by email.
	</p>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-3xl px-4 sm:px-6">
		{#if confirmation}
			<div class="rounded-3xl bg-white p-8 text-center shadow-xl" role="status">
				<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
					<Gift class="h-10 w-10 text-brand" />
				</span>
				<h2 class="mt-5 font-display text-3xl font-black">Gift Card Ready!</h2>
				<p class="mt-3 text-muted">
					A <strong class="text-ink">${confirmedAmount} gift card</strong> for
					<strong class="text-ink">{recipientName}</strong> ({recipientEmail}) from
					<strong class="text-ink">{senderName}</strong> is confirmed.
					{#if message.trim()}
						Your message — “{message.trim()}” — will go with it.
					{/if}
				</p>
				<p class="mt-4 inline-block rounded-full bg-cream px-5 py-2 font-mono text-sm font-bold">
					Gift card code: {confirmation}
				</p>
				<p class="mt-4 text-sm text-muted">
					Demo — gift cards are confirmed on this device only. No payment was taken and no email
					was sent yet.
				</p>
				<button
					type="button"
					onclick={() => {
						confirmation = null;
						recipientName = '';
						recipientEmail = '';
						senderName = '';
						message = '';
					}}
					class="mt-6 inline-flex h-11 items-center rounded-full border-2 border-brand px-6 font-semibold text-brand hover:bg-brand hover:text-white"
				>
					Buy Another Gift Card
				</button>
			</div>
		{:else}
			<form
				onsubmit={submit}
				novalidate
				class="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
				aria-label="Gift card purchase form"
			>
				<h2 class="font-display text-2xl font-black">Choose an Amount</h2>
				<div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Gift card amount">
					{#each denominations as value (value)}
						<button
							type="button"
							aria-pressed={amount === value}
							onclick={() => {
								amount = value;
								customAmount = '';
							}}
							class="flex h-14 flex-col items-center justify-center rounded-2xl border-2 font-display text-2xl font-black transition-all active:scale-[0.97] {amount ===
							value
								? 'border-brand bg-brand text-white'
								: 'border-ink/15 hover:border-brand'}"
						>
							${value}
						</button>
					{/each}
				</div>
				<label class="mt-4 block">
					<span class="mb-1.5 block text-sm font-semibold">Or a custom amount ($10 – $500)</span>
					<input
						type="number"
						bind:value={customAmount}
						oninput={() => (amount = 0)}
						min="10"
						max="500"
						placeholder="e.g. 75"
						aria-invalid={invalidField === 'amount' ? true : undefined}

						class="field h-12 {invalidField === 'amount' ? 'field-error' : ''}"
					/>
				</label>

				<h3 class="mt-8 font-display text-xl font-bold">Who Is It For?</h3>
				{#if error}
					<p
						class="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
						role="alert"
					>
						{error}
					</p>
				{/if}
				<div class="mt-4 grid gap-5 sm:grid-cols-2">
					<label class="block">
						<span class="mb-1.5 block text-sm font-semibold">Recipient Name</span>
						<input
							type="text"
							bind:value={recipientName}
							placeholder="e.g. Maya Patel"
							autocomplete="name"
							required
							aria-invalid={invalidField === 'recipientName' ? true : undefined}

							class="field h-12 {invalidField === 'recipientName' ? 'field-error' : ''}"
						/>
					</label>
					<label class="block">
						<span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
							<Mail class="h-4 w-4 text-brand" /> Recipient Email
						</span>
						<input
							type="email"
							bind:value={recipientEmail}
							placeholder="friend@example.com"
							autocomplete="email"
							required
							aria-invalid={invalidField === 'recipientEmail' ? true : undefined}

							class="field h-12 {invalidField === 'recipientEmail' ? 'field-error' : ''}"
						/>
					</label>
					<label class="block sm:col-span-2">
						<span class="mb-1.5 block text-sm font-semibold">Your Name (sender)</span>
						<input
							type="text"
							bind:value={senderName}
							placeholder="e.g. Alex Morgan"
							autocomplete="name"
							required
							aria-invalid={invalidField === 'senderName' ? true : undefined}

							class="field h-12 {invalidField === 'senderName' ? 'field-error' : ''}"
						/>
					</label>
					<label class="block sm:col-span-2">
						<span class="mb-1.5 block text-sm font-semibold">A Message (optional)</span>
						<textarea
							bind:value={message}
							rows="3"
							maxlength="200"
							placeholder="Happy birthday — dinner is on me!"
							aria-invalid={invalidField === 'message' ? true : undefined}

							class="field resize-none py-3 {invalidField === 'message' ? 'field-error' : ''}"
						></textarea>
					</label>
				</div>
				<div class="mt-6">
					<SubmitButton
						loading={submitting}
						label="Buy Gift Card — {finalAmount > 0 ? `$${finalAmount}` : '—'}"
						loadingLabel="Processing…"
					>
						<Gift class="h-5 w-5" />
					</SubmitButton>
				</div>
				<p class="mt-3 text-center text-xs text-muted">
					Demo — gift cards are confirmed on this device only. No payment is taken; a real
					purchase will connect to the Go backend later. Gift cards never expire.
				</p>
			</form>
		{/if}
	</div>
</section>
</Reveal>
