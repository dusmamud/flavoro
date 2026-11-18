<script lang="ts">
	import { Award, ChefHat, Heart, Leaf, Users } from '@lucide/svelte';
	import TestimonialCard from '#lib/components/TestimonialCard.svelte';
	import { chefs } from '#lib/api';
	import { aboutTestimonials } from '#lib/testimonials';
	import Reveal from '#lib/components/Reveal.svelte';

	const stats = [
		{ value: '10+', label: 'Years of Experience' },
		{ value: '50+', label: 'Dishes on the Menu' },
		{ value: '12k+', label: 'Happy Customers' },
		{ value: '4.9', label: 'Average Rating' }
	];
</script>

<svelte:head>
	<title>About Us — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Our story: great food brings people together. Meet the chefs behind Flavoro Restaurant."
	/>
	<meta property="og:title" content="About Us — Flavoro Restaurant" />
	<meta property="og:image" content="/images/interior.jpg" />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Our Story</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">About Flavoro</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		A small kitchen with a big heart — serving New York since 2015.
	</p>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
		<img
			src="/images/interior.jpg"
			alt="Warm dining room inside Flavoro Restaurant"
			class="w-full rounded-3xl object-cover shadow-xl"
		/>
		<div>
			<p class="font-script text-3xl text-brand">Since 2015</p>
			<h2 class="mt-2 font-display text-4xl leading-tight font-black">
				Good Food, <span class="font-script font-normal text-brand">Good Mood</span>
			</h2>
			<p class="mt-5 leading-relaxed text-muted">
				Flavoro started with one simple idea: a restaurant where every plate feels like it was made for
				family. Ten years on, that idea has not changed — only the dining room has grown.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				We buy fresh every morning, cook everything in-house, and plate every dish like it matters —
				because it does. Whether it is a weekday lunch or a birthday dinner, you will always find the
				same care on the plate.
			</p>
			<ul class="mt-6 space-y-3">
				<li class="flex items-center gap-3">
					<Leaf class="h-5 w-5 shrink-0 text-brand" /> Fresh, local ingredients every single day
				</li>
				<li class="flex items-center gap-3">
					<ChefHat class="h-5 w-5 shrink-0 text-brand" /> Recipes perfected over a decade
				</li>
				<li class="flex items-center gap-3">
					<Heart class="h-5 w-5 shrink-0 text-brand" /> A dining room that feels like home
				</li>
			</ul>
		</div>
	</div>

	<div class="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
		{#each stats as stat (stat.label)}
			<div class="rounded-2xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<p class="font-display text-4xl font-black text-brand">{stat.value}</p>
				<p class="mt-1 text-sm font-medium text-muted">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>
</Reveal>

<Reveal>
<section class="bg-cream-deep py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<p class="font-script text-3xl text-brand">Meet the Team</p>
			<h2 class="mt-1 font-display text-4xl font-black">Our Chefs</h2>
		</div>
		<div class="mt-10 grid gap-6 sm:grid-cols-3">
			{#each chefs as chef (chef.name)}
				<article
					class="overflow-hidden rounded-2xl bg-white text-center shadow-[0_8px_30px_rgba(31,26,21,0.08)]"
				>
					<img src={chef.image} alt={chef.name} loading="lazy" class="aspect-[4/3] w-full object-cover" />
					<div class="p-6">
						<h3 class="font-display text-2xl font-bold">{chef.name}</h3>
						<p class="mt-1 text-sm font-semibold tracking-wide text-brand uppercase">{chef.role}</p>
						<p class="mt-3 text-sm leading-relaxed text-muted">{chef.bio}</p>
					</div>
				</article>
			{/each}
		</div>
		<p class="mt-10 flex items-center justify-center gap-2 text-center text-sm text-muted">
			<Award class="h-5 w-5 text-brand" />
			<Users class="h-5 w-5 text-brand" />
			Our kitchen team has served more than 12,000 happy guests — and counting.
		</p>
	</div>
</section>
</Reveal>

<!-- ============ GUEST WORDS ============ -->
<!-- SAMPLE — replace with real customer reviews before launch
     (see src/lib/testimonials.ts; every quote carries sample: true). -->
<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<p class="font-script text-3xl text-brand">Kind Words</p>
			<h2 class="mt-1 font-display text-4xl font-black">What Our Guests Say</h2>
			<p class="mx-auto mt-3 max-w-xl text-sm text-muted">
				Sample quotes shown while we collect real guest reviews.
			</p>
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-3">
			{#each aboutTestimonials as testimonial, i (testimonial.name)}
				<Reveal class="h-full" delay={Math.min(i * 90, 270)}>
					<TestimonialCard {testimonial} />
				</Reveal>
			{/each}
		</div>
	</div>
</section>
</Reveal>
