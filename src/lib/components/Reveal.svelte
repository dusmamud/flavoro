<script lang="ts">
	import type { Snippet } from 'svelte';

	// Scroll-reveal wrapper: fade + translate-y once, when the element
	// scrolls into view. Content is visible by default (SSR + no-JS):
	// the hidden state only applies when JS adds .js to <html> (inline
	// script in +layout.svelte) and motion is allowed — see app.css.
	// A 4s backstop reveals everything even if the observer never fires,
	// so no section can stay hidden.
	let {
		children,
		delay = 0,
		class: cls = ''
	}: { children: Snippet; delay?: number; class?: string } = $props();

	let el: HTMLDivElement | undefined = $state();
	let visible = $state(false);

	$effect(() => {
		const node = el;
		if (!node) return;
		if (
			window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
			!('IntersectionObserver' in window)
		) {
			visible = true;
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visible = true;
						io.disconnect();
					}
				}
			},
			{ threshold: 0.08, rootMargin: '0px 0px 120px 0px' }
		);
		io.observe(node);
		const t = window.setTimeout(() => {
			visible = true;
			io.disconnect();
		}, 4000);
		return () => {
			io.disconnect();
			window.clearTimeout(t);
		};
	});
</script>

<div
	bind:this={el}
	class="reveal {visible ? 'reveal-visible' : ''} {cls}"
	style="transition-delay: {delay}ms"
>
	{@render children()}
</div>
