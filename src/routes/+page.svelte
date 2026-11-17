<script lang="ts">
	import {
		ArrowRight,
		CalendarDays,
		ChefHat,
		ChevronLeft,
		ChevronRight,
		ConciergeBell,
		Heart,
		Leaf,
		Star,
		Users,
		UtensilsCrossed
	} from '@lucide/svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import LeafDeco from '#lib/components/Leaf.svelte';
	import { popularDishes } from '#lib/api';

	let carousel: HTMLDivElement | undefined = $state();

	function scrollCarousel(dir: 1 | -1) {
		if (!carousel) return;
		const card = carousel.querySelector('article');
		const step = card ? card.getBoundingClientRect().width + 24 : 320;
		carousel.scrollBy({ left: dir * step, behavior: 'smooth' });
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: 'Flavoro Restaurant',
		description:
			'Flavoro is where taste meets passion. We serve delicious food, great vibes, and unforgettable moments.',
		servesCuisine: ['Italian', 'American', 'Continental'],
		priceRange: '$$',
		telephone: '+1234 567 8900',
		email: 'info@flavoro.com',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '123 Food Street',
			addressLocality: 'New York',
			postalCode: '10001',
			addressCountry: 'US'
		},
		openingHours: ['Mo-Fr 11:00-22:00', 'Sa-Su 10:00-23:00']
	};
</script>

<svelte:head>
	<title>Flavoro Restaurant — Delicious Food Made with Love</title>
	<meta
		name="description"
		content="Experience the perfect blend of taste, quality and happiness in every bite. Fresh ingredients, expert chefs and a warm ambience."
	/>
	<meta property="og:title" content="Flavoro Restaurant — Delicious Food Made with Love" />
	<meta
		property="og:description"
		content="Experience the perfect blend of taste, quality and happiness in every bite."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/images/hero.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<!-- ============ HERO ============ -->
<!-- Single continuous photograph as the section background (no <img>):
     dark bokeh left, plate right — same photo across the full width.
     The section is pulled up 76px under the transparent header so
     header + hero read as one continuous photo. -->
<section class="hero-bg relative -mt-[76px] overflow-hidden bg-night text-white">
	<!-- #4: light overlay only — bokeh stays visible across the whole hero -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-r from-night/55 via-night/35 to-night/15"
		aria-hidden="true"
	></div>

	<!-- #10: floating leaves over the plate area of the photo (lg only, so
	     they never sit on text); one small leaf stays visible on mobile at
	     the bottom-right corner, clear of the USP rows -->
	<LeafDeco
		class="animate-floaty pointer-events-none absolute top-32 right-60 z-10 hidden h-24 w-24 rotate-12 opacity-90 lg:block"
	/>
	<LeafDeco
		class="animate-floaty pointer-events-none absolute bottom-28 left-4 z-10 hidden h-20 w-20 -rotate-45 opacity-80 [animation-delay:1.6s] lg:block"
	/>
	<LeafDeco
		class="animate-floaty pointer-events-none absolute top-[46%] right-[4%] z-10 hidden h-16 w-16 -rotate-12 opacity-90 lg:block"
	/>
	<LeafDeco
		class="animate-floaty pointer-events-none absolute right-[38%] bottom-[26%] z-10 hidden h-14 w-14 rotate-45 opacity-80 [animation-delay:1.2s] lg:block"
	/>
	<LeafDeco
		class="animate-floaty pointer-events-none absolute top-[58%] right-[46%] z-10 hidden h-12 w-12 rotate-12 opacity-70 [animation-delay:2.1s] lg:block"
	/>
	<LeafDeco
		class="animate-floaty pointer-events-none absolute right-[10%] bottom-[18%] z-10 hidden h-12 w-12 -rotate-45 opacity-80 [animation-delay:0.8s] lg:block"
	/>

	<!-- Best Food In Town badge — absolute over the plate area. Top-right
	     from sm up; bottom-right below sm, where the headline spans the
	     full width and a top-right badge would sit on the text. -->
	<div
		class="absolute right-4 bottom-16 z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-dashed border-brand/70 bg-night/80 text-center shadow-xl backdrop-blur sm:top-28 sm:right-6 sm:bottom-auto lg:right-16 lg:h-32 lg:w-32"
	>
		<ChefHat class="h-6 w-6 text-brand" />
		<span class="mt-1 font-script text-lg leading-none text-brand">Best Food</span>
		<span class="text-[11px] font-semibold tracking-widest text-white uppercase">In Town</span>
	</div>

	<div class="relative mx-auto grid max-w-7xl gap-10 px-4 pt-[124px] pb-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-[140px] lg:pb-32">
		<div class="relative z-10">
			<p class="font-script text-3xl text-brand sm:text-4xl">Good Food, Good Mood</p>
			<h1 class="mt-3 font-display text-5xl leading-[1.05] font-black sm:text-6xl lg:text-7xl">
				Delicious Food
				<span class="mt-1 block font-script text-5xl font-normal text-brand sm:text-6xl lg:text-7xl">
					Made with Love
					<!-- #7: small heart doodle after "Made with Love" -->
					<Heart class="mb-2 inline h-5 w-5 fill-brand text-brand" />
				</span>
			</h1>
			<p class="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
				Experience the perfect blend of taste, quality and happiness in every bite.
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href="/menu/"
					class="flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
				>
					<UtensilsCrossed class="h-5 w-5" />
					Explore Menu
				</a>
				<a
					href="/reservations/"
					class="flex h-12 items-center gap-2 rounded-full border border-white/60 px-7 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
				>
					<CalendarDays class="h-5 w-5" />
					Book a Table
				</a>
			</div>

			<ul class="mt-12 grid max-w-lg grid-cols-1 gap-5 sm:grid-cols-3">
				<li class="flex items-center gap-3">
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/60 text-brand">
						<UtensilsCrossed class="h-5 w-5" />
					</span>
					<span class="leading-tight">
						<span class="block text-sm font-semibold">Fresh Ingredients</span>
						<span class="block text-xs text-white/60">100% Fresh &amp; Healthy</span>
					</span>
				</li>
				<li class="flex items-center gap-3">
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/60 text-brand">
						<ChefHat class="h-5 w-5" />
					</span>
					<span class="leading-tight">
						<span class="block text-sm font-semibold">Expert Chefs</span>
						<span class="block text-xs text-white/60">10+ Years Experience</span>
					</span>
				</li>
				<li class="flex items-center gap-3">
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/60 text-brand">
						<!-- #8: Star (was Heart) for "Great Ambience / Feel Like Home" -->
						<Star class="h-5 w-5" />
					</span>
					<span class="leading-tight">
						<span class="block text-sm font-semibold">Great Ambience</span>
						<span class="block text-xs text-white/60">Feel Like Home</span>
					</span>
				</li>
			</ul>
		</div>

		<!-- Right column is empty on purpose: the plate lives in the
		     background photograph, so the photo shows through here. -->
	</div>

	<!-- #9: irregular rough paper tear (inline SVG, uneven non-repeating peaks/valleys),
	     replaces the regular zigzag .torn-edge clip-path -->
	<svg
		class="absolute right-0 bottom-0 left-0 block h-12 w-full text-cream"
		viewBox="0 0 1440 48"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path
			fill="currentColor"
			d="M0,48 L0,28 L37,18 L71,30 L118,12 L163,26 L205,8 L260,24 L301,14 L355,30 L402,10 L458,25 L500,16 L552,32 L610,12 L655,27 L710,9 L768,24 L812,15 L870,29 L920,11 L975,26 L1020,14 L1075,30 L1120,10 L1175,25 L1220,16 L1275,31 L1330,12 L1380,26 L1440,18 L1440,48 Z"
		/>
	</svg>
</section>

<!-- ============ ABOUT ============ -->
<section class="relative overflow-hidden bg-cream py-16 lg:py-20">
	<!-- #15: black torn strip at the top-left corner -->
	<svg
		class="absolute top-0 left-0 z-10 block h-8 w-44 text-night sm:w-56"
		viewBox="0 0 224 32"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path
			fill="currentColor"
			d="M0,0 H224 V12 L202,19 L178,11 L152,21 L126,13 L102,22 L78,12 L54,20 L28,11 L0,19 Z"
		/>
	</svg>

	<!-- #13: decorative green leaves at the About section's right edge -->
	<LeafDeco class="pointer-events-none absolute top-24 -right-3 h-14 w-14 rotate-45 opacity-90" />
	<LeafDeco class="pointer-events-none absolute right-6 bottom-24 h-10 w-10 -rotate-12 opacity-80" />

	<div class="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-center lg:gap-8 lg:px-8">
		<div>
			<p class="font-script text-3xl text-brand">About Us</p>
			<h2 class="mt-2 font-display text-4xl leading-tight font-black sm:text-5xl">
				We Serve
				<span class="block font-script text-5xl font-normal text-brand sm:text-6xl">
					Happiness
					<!-- #12: small heart doodle next to "Happiness" -->
					<Heart class="mb-1 inline h-6 w-6 text-brand" />
				</span>
			</h2>
			<p class="mt-5 leading-relaxed text-muted">
				At Flavoro, we believe that great food brings people together. Our chefs craft every dish with
				fresh ingredients and a passion for perfection.
			</p>
			<p class="mt-6 font-script text-3xl text-ink">Flavoro Restaurant</p>
			<a
				href="/about/"
				class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
			>
				Learn More About Us
				<ArrowRight class="h-5 w-5" />
			</a>
		</div>

		<div class="relative">
			<img
				src="/images/interior.jpg"
				alt="Warm dining room inside Flavoro Restaurant"
				loading="lazy"
				class="aspect-[6/5] w-full rounded-3xl object-cover shadow-xl"
			/>
			<div
				class="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl sm:left-6"
			>
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
					<ChefHat class="h-7 w-7" />
				</span>
				<span class="leading-tight">
					<span class="block font-display text-2xl font-black">10+</span>
					<span class="block text-xs font-medium text-muted">Years of<br />Experience</span>
				</span>
			</div>
		</div>

		<!-- #11: ONE white panel with thin divider lines (gap-px over bg-ink/10),
		     not 4 separate cards — same 4 labels/icons, no gaps, no per-card shadows -->
		<div class="pt-4 lg:pt-0">
			<div class="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10 shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
				<div class="flex flex-col items-center bg-white p-6 text-center">
					<Leaf class="h-8 w-8 text-brand" />
					<p class="mt-3 text-sm font-semibold">Fresh<br />Ingredients</p>
				</div>
				<div class="flex flex-col items-center bg-white p-6 text-center">
					<ChefHat class="h-8 w-8 text-brand" />
					<p class="mt-3 text-sm font-semibold">Skilled<br />Chefs</p>
				</div>
				<div class="flex flex-col items-center bg-white p-6 text-center">
					<ConciergeBell class="h-8 w-8 text-brand" />
					<p class="mt-3 text-sm font-semibold">Fast &amp; Friendly<br />Service</p>
				</div>
				<div class="flex flex-col items-center bg-white p-6 text-center">
					<Users class="h-8 w-8 text-brand" />
					<p class="mt-3 text-sm font-semibold">Happy<br />Customers</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ============ POPULAR DISHES ============ -->
<section class="bg-cream py-14 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<p class="font-script text-3xl text-brand">Our Menu</p>
			<h2 class="mt-1 font-display text-4xl font-black sm:text-5xl">Popular Dishes</h2>
			<!-- #19: small cutlery glyph under the heading -->
			<UtensilsCrossed class="mx-auto mt-3 h-5 w-5 text-brand" />
		</div>

		<!-- #16 PRESERVED EXACTLY: xl 4-col grid, no row scroll, arrows xl:hidden,
		     carousel + arrows unchanged below 1280px -->
		<div class="relative mt-8">
			<div
				bind:this={carousel}
				class="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:grid xl:grid-cols-4 xl:overflow-visible xl:pb-0"
			>
				{#each popularDishes as dish (dish.id)}
					<div class="w-[280px] shrink-0 snap-start sm:w-[320px] xl:w-auto">
						<DishCard {dish} />
					</div>
				{/each}
			</div>
			<button
				type="button"
				onclick={() => scrollCarousel(-1)}
				aria-label="Scroll dishes left"
				class="absolute top-1/2 -left-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-colors hover:bg-brand hover:text-white md:flex lg:-left-6 xl:hidden"
			>
				<ChevronLeft class="h-6 w-6" />
			</button>
			<button
				type="button"
				onclick={() => scrollCarousel(1)}
				aria-label="Scroll dishes right"
				class="absolute top-1/2 -right-2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-colors hover:bg-brand hover:text-white md:flex lg:-right-6 xl:hidden"
			>
				<ChevronRight class="h-6 w-6" />
			</button>
		</div>

		<!-- #17: "View Full Menu →" button block REMOVED entirely -->
	</div>
</section>

<!-- ============ RESERVE BANNER ============ -->
<section class="bg-cream px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
	<div class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
		<img
			src="/images/reserve-bg.jpg"
			alt=""
			aria-hidden="true"
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<!-- #22: much lighter overlay (was bg-night/70) so the photo reads clearly -->
		<div class="absolute inset-0 bg-night/35" aria-hidden="true"></div>
		<div
			class="relative flex flex-col items-start justify-between gap-6 px-6 py-12 text-white sm:px-10 sm:py-14 lg:flex-row lg:items-center"
		>
			<div>
				<!-- #21: title-case eyebrow with LARGE calendar icon at the left -->
				<p class="flex items-center gap-3 text-lg font-semibold text-brand">
					<CalendarDays class="h-8 w-8 sm:h-10 sm:w-10" />
					Book Your Table
				</p>
				<h2 class="mt-3 font-display text-3xl font-black sm:text-4xl lg:text-5xl">
					Reserve Your Table Now!
				</h2>
				<!-- #23: small leaf icon before the subtext -->
				<p class="mt-3 flex items-center gap-2 text-white/75">
					<Leaf class="h-4 w-4 shrink-0 text-brand" />
					Good food is better when shared.
				</p>
			</div>
			<a
				href="/reservations/"
				class="flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
			>
				<CalendarDays class="h-5 w-5" />
				Book a Table
			</a>
		</div>
	</div>
</section>

<style>
	/* Hero: ONE continuous photograph (dark bokeh left, plate right).
	   Mobile keeps the plate in frame (~70% anchor); desktop anchors it
	   to the right edge. No <img> — a pasted image can never align. */
	.hero-bg {
		background-image: url('/images/hero.jpg');
		background-size: cover;
		background-position: 70% center;
	}
	@media (min-width: 1024px) {
		.hero-bg {
			background-position: right center;
		}
	}
</style>
