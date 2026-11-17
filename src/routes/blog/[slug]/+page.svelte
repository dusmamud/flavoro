<script lang="ts">
	import { ArrowLeft, ArrowRight, CalendarDays, User } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const post = $derived(data.post);
	const related = $derived(data.related);
</script>

<svelte:head>
	<title>{post.title} — Flavoro Blog</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:image" content={post.image} />
	<meta property="og:type" content="article" />
</svelte:head>

<article class="bg-cream py-14 lg:py-16">
	<div class="mx-auto max-w-3xl px-4 sm:px-6">
		<a
			href="/blog/"
			class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5"
		>
			<ArrowLeft class="h-4 w-4" /> Back to Blog
		</a>
		<p class="mt-6 font-script text-3xl text-brand">{post.category}</p>
		<h1 class="mt-2 font-display text-4xl leading-tight font-black sm:text-5xl">{post.title}</h1>
		<p class="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
			<span class="flex items-center gap-1.5">
				<CalendarDays class="h-4 w-4 text-brand" /> {post.date}
			</span>
			<span class="flex items-center gap-1.5"><User class="h-4 w-4 text-brand" /> {post.author}</span>
		</p>
		<img
			src={post.image}
			alt={post.title}
			class="mt-8 w-full rounded-3xl object-cover shadow-xl"
		/>
		<div class="mt-8 space-y-5 text-[17px] leading-relaxed text-ink/90">
			{#each post.content as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>

		<div class="mt-10 rounded-2xl bg-white p-6 text-center shadow-sm">
			<p class="font-script text-3xl text-brand">Hungry yet?</p>
			<p class="mt-2 text-muted">Come taste what you just read about.</p>
			<a
				href="/reservations/"
				class="mt-4 inline-flex h-12 items-center rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-dark"
			>
				Book a Table
			</a>
		</div>
	</div>

	{#if related.length > 0}
		<div class="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-center font-display text-3xl font-black">Keep Reading</h2>
			<div class="mt-8 grid gap-6 sm:grid-cols-2">
				{#each related as item (item.slug)}
					<article class="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(31,26,21,0.08)]">
						<a href="/blog/{item.slug}/" class="block">
							<img
								src={item.image}
								alt={item.title}
								loading="lazy"
								class="aspect-[16/9] w-full object-cover"
							/>
						</a>
						<div class="p-6">
							<h3 class="font-display text-xl font-bold">
								<a href="/blog/{item.slug}/" class="hover:text-brand">{item.title}</a>
							</h3>
							<a
								href="/blog/{item.slug}/"
								class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
							>
								Read More <ArrowRight class="h-4 w-4" />
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}
</article>
