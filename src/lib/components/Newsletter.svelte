<script lang="ts">
	import { CheckCircle2, Send } from '@lucide/svelte';

	// Reusable newsletter signup — client-side only (no backend yet).
	// Validates the email inline, shows a success state on subscribe, and
	// cannot double-submit: once subscribed the form is replaced by the
	// success message.
	// tone: 'dark' for the footer, 'light' for a band on a light page.
	let { tone = 'dark' }: { tone?: 'dark' | 'light' } = $props();

	let email = $state('');
	let error = $state('');
	let done = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (done) return;
		error = '';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		done = true;
	}
</script>

{#if done}
	<p
		class="flex items-center gap-2 text-[15px] font-medium {tone === 'dark'
			? 'text-white'
			: 'text-ink'}"
		role="status"
	>
		<CheckCircle2 class="h-5 w-5 shrink-0 text-brand" />
		You are on the list — tasty news is on its way to {email.trim()}.
	</p>
{:else}
	<form onsubmit={submit} novalidate aria-label="Newsletter signup" class="w-full">
		<div class="flex flex-col gap-2 sm:flex-row">
			<label class="flex-1">
				<span class="sr-only">Email address</span>
				<input
					type="email"
					bind:value={email}
					placeholder="you@example.com"
					autocomplete="email"
					aria-invalid={error ? true : undefined}
					aria-describedby={error ? 'newsletter-error' : undefined}
					class="h-12 w-full rounded-full px-5 text-[15px] outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/50 {error
						? 'border-2 border-red-400'
						: ''} {tone === 'dark'
						? 'border border-white/25 bg-white/10 text-white placeholder:text-white/50'
						: 'border border-ink/15 bg-white text-ink'}"
				/>
			</label>
			<button
				type="submit"
				class="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 font-semibold text-white transition-all hover:bg-brand-dark active:scale-[0.98]"
			>
				<Send class="h-5 w-5" />
				Subscribe
			</button>
		</div>
		{#if error}
			<p
				id="newsletter-error"
				class="mt-2 text-sm font-medium {tone === 'dark' ? 'text-red-400' : 'text-red-600'}"
				role="alert"
			>
				{error}
			</p>
		{/if}
	</form>
{/if}
