<script lang="ts">
	import { LoaderCircle } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	// Shared submit button: one primary orange pill everywhere, with a
	// loading state (spinner + label change, disabled) so a form can
	// never double-submit. Pass an icon as children.
	let {
		loading = false,
		label,
		loadingLabel = 'Please wait…',
		disabled = false,
		children
	}: {
		loading?: boolean;
		label: string;
		loadingLabel?: string;
		disabled?: boolean;
		children?: Snippet;
	} = $props();
</script>

<button type="submit" disabled={loading || disabled} class="btn-primary">
	{#if loading}
		<LoaderCircle class="h-5 w-5 animate-spin" />
		{loadingLabel}
	{:else}
		{@render children?.()}
		{label}
	{/if}
</button>
