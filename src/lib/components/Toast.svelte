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
	<!-- Outer div owns positioning/centering; the inner pill owns the
	     entrance animation — the animation's transform fill used to
	     override -translate-x-1/2 and push the toast off-centre. -->
	<div class="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 md:bottom-6">
		<div
			class="animate-fade-up flex items-center gap-3 rounded-full bg-night px-5 py-3 text-sm font-medium whitespace-nowrap text-white shadow-2xl"
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
	</div>
{/if}
