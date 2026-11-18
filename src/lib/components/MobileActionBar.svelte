<script lang="ts">
	import { CalendarDays, Phone, ShoppingBag } from '@lucide/svelte';

	// Sticky mobile action bar: Order / Book a Table / Call, thumb-sized
	// 48px targets, safe-area aware. Mobile only (<768px). It slides away
	// while the footer is in view so the footer bottom bar stays fully
	// reachable; on desktop it never renders.
	let footerInView = $state(false);

	$effect(() => {
		const footer = document.querySelector('footer');
		if (!footer || !('IntersectionObserver' in window)) return;
		const io = new IntersectionObserver(
			(entries) => {
				footerInView = entries[0]?.isIntersecting ?? false;
			},
			{ threshold: 0 }
		);
		io.observe(footer);
		return () => io.disconnect();
	});
</script>

<nav
	aria-label="Quick actions"
	inert={footerInView ? true : undefined}
	class="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 shadow-[0_-4px_20px_rgba(31,26,21,0.08)] backdrop-blur transition-transform duration-300 md:hidden {footerInView
		? 'pointer-events-none translate-y-full'
		: 'translate-y-0'}"
	style="padding-bottom: env(safe-area-inset-bottom)"
>
	<div class="grid grid-cols-3 gap-2 px-3 py-2">
		<a
			href="/order/"
			class="flex h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold text-ink transition-colors hover:bg-cream active:scale-95"
		>
			<ShoppingBag class="h-5 w-5 text-brand" />
			Order
		</a>
		<a
			href="/reservations/"
			class="flex h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold text-ink transition-colors hover:bg-cream active:scale-95"
		>
			<CalendarDays class="h-5 w-5 text-brand" />
			Book a Table
		</a>
		<a
			href="tel:+12345678900"
			class="flex h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold text-ink transition-colors hover:bg-cream active:scale-95"
		>
			<Phone class="h-5 w-5 text-brand" />
			Call
		</a>
	</div>
</nav>
