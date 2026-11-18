<script lang="ts">
	import { onMount } from 'svelte';
	import { getOpenStatus, type OpenStatus } from '#lib/hours';

	// Live open/closed pill. Renders nothing until mounted (client-side
	// only) so the prerendered HTML never bakes in a stale status.
	// tone: 'dark' for the header/footer (dark photo backgrounds),
	// 'light' for light pages such as Contact.
	let {
		tone = 'dark',
		showTodayHours = false
	}: { tone?: 'dark' | 'light'; showTodayHours?: boolean } = $props();

	let status = $state<OpenStatus | null>(null);

	onMount(() => {
		const tick = () => {
			status = getOpenStatus();
		};
		tick();
		const id = setInterval(tick, 60_000);
		return () => clearInterval(id);
	});
</script>

{#if status}
	<span
		class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap {tone ===
		'dark'
			? 'bg-white/10 text-white'
			: 'bg-white text-ink shadow-sm ring-1 ring-ink/10'}"
		role="status"
	>
		<span
			class="h-2 w-2 shrink-0 rounded-full {status.open ? 'bg-emerald-400' : 'bg-red-500'}"
			aria-hidden="true"
		></span>
		{status.label}
	</span>
	{#if showTodayHours}
		<span class="block text-sm {tone === 'dark' ? 'text-white/70' : 'text-muted'}">
			{status.todayHours}
		</span>
	{/if}
{/if}
