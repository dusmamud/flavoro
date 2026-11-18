<script lang="ts">
	import { ArrowRight, CalendarDays, User } from '@lucide/svelte';
	import { blogPosts } from '#lib/api';
	import Reveal from '#lib/components/Reveal.svelte';
</script>

<svelte:head>
	<title>Blog — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Stories from the Flavoro kitchen: recipes, cooking tips and behind-the-scenes moments."
	/>
	<meta property="og:title" content="Blog — Flavoro Restaurant" />
	<meta property="og:image" content="/images/blog-1.jpg" />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">From Our Kitchen</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Our Blog</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		Recipes, tips and stories from the people who cook your food.
	</p>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-6 sm:grid-cols-2">
			{#each blogPosts as post (post.slug)}
				<article
					class="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(31,26,21,0.08)] transition-shadow hover:shadow-[0_14px_40px_rgba(31,26,21,0.14)]"
				>
					<a href="/blog/{post.slug}/" class="block">
						<div class="relative overflow-hidden">
							<img
								src={post.image}
								alt={post.title}
								loading="lazy"
								class="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<span
								class="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white uppercase"
							>
								{post.category}
							</span>
						</div>
					</a>
					<div class="p-6">
						<p class="flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
							<span class="flex items-center gap-1.5">
								<CalendarDays class="h-4 w-4 text-brand" /> {post.date}
							</span>
							<span class="flex items-center gap-1.5">
								<User class="h-4 w-4 text-brand" /> {post.author}
							</span>
						</p>
						<h2 class="mt-3 font-display text-2xl leading-snug font-bold">
							<a href="/blog/{post.slug}/" class="transition-colors hover:text-brand">{post.title}</a>
						</h2>
						<p class="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
						<a
							href="/blog/{post.slug}/"
							class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5"
						>
							Read More <ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
</Reveal>
