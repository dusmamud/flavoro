<script lang="ts">
	import { CheckCircle2 } from '@lucide/svelte';
	import { toast } from '#lib/toast.svelte';
	import { ui } from '#lib/ui.svelte';

	function viewCart() {
		toast.hide();
		ui.openCart();
	}
</script>

{#if toast.visible}
	<div
		class="animate-fade-up fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-full bg-night px-5 py-3 text-sm font-medium text-white shadow-2xl"
		role="status"
	>
		<CheckCircle2 class="h-5 w-5 shrink-0 text-brand" />
		<span>{toast.message}</span>
		<button
			type="button"
			onclick={viewCart}
			class="shrink-0 font-bold text-brand underline underline-offset-2 transition-colors hover:text-brand-light"
		>
			View Cart
		</button>
	</div>
{/if}
