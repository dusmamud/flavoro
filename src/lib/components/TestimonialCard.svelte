<script lang="ts">
	import { Star } from '@lucide/svelte';
	import type { Testimonial } from '#lib/testimonials';

	let { testimonial }: { testimonial: Testimonial } = $props();
</script>

<!-- SAMPLE — replace with real customer reviews before launch (see src/lib/testimonials.ts). -->
<figure
	class="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(31,26,21,0.08)]"
>
	<div class="flex gap-1" aria-label="Rated {testimonial.rating} out of 5 stars">
		{#each Array.from({ length: 5 }, (_, i) => i) as i (i)}
			<Star
				class="h-5 w-5 {i < testimonial.rating ? 'fill-brand text-brand' : 'text-ink/20'}"
			/>
		{/each}
	</div>
	<blockquote class="mt-4 flex-1 leading-relaxed text-ink/85">
		“{testimonial.quote}”
	</blockquote>
	<figcaption class="mt-5 border-t border-ink/10 pt-4">
		<p class="font-display text-lg font-bold">{testimonial.name}</p>
		<p class="text-sm text-muted">{testimonial.role}</p>
	</figcaption>
</figure>
