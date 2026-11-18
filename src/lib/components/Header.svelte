<script lang="ts">
	import { page } from '$app/state';
	import { CalendarDays, Menu, ShoppingBag, UtensilsCrossed, X } from '@lucide/svelte';
	import OpenStatus from '#lib/components/OpenStatus.svelte';
	import { cart } from '#lib/cart.svelte';
	import { ui } from '#lib/ui.svelte';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about/', label: 'About Us' },
		{ href: '/menu/', label: 'Menu' },
		{ href: '/order/', label: 'Order' },
		{ href: '/gallery/', label: 'Gallery' },
		{ href: '/reservations/', label: 'Reservations' },
		{ href: '/blog/', label: 'Blog' },
		{ href: '/contact/', label: 'Contact' }
	];

	// New pages that live in the mobile menu + footer only — the desktop
	// nav is already full and these do not fit without wrapping.
	const moreLinks = [
		{ href: '/catering/', label: 'Catering' },
		{ href: '/private-dining/', label: 'Private Dining' },
		{ href: '/gift-cards/', label: 'Gift Cards' },
		{ href: '/faq/', label: 'FAQ' }
	];

	let mobileOpen = $state(false);
	let scrolledPastHero = $state(false);
	let scrolled = $state(false);

	const isHome = $derived(page.url.pathname === '/' || page.url.pathname === '');

	// Compact header once the page is scrolled at all (76px → 64px,
	// transitioned — no jump). On home the compact state waits until
	// the hero has scrolled away, so the transparent-over-photo header
	// keeps its full height while it sits on the hero.
	const compact = $derived(isHome ? scrolledPastHero : scrolled);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 24;
			if (!isHome) return;
			// Hero is a descendant of <main> (page-transition wrapper).
			const hero = document.querySelector('main section:first-of-type');
			const heroH = hero ? hero.getBoundingClientRect().height : 640;
			scrolledPastHero = window.scrollY > Math.max(0, heroH - 76);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	function isActive(href: string): boolean {
		const path = page.url.pathname;
		if (href === '/') return path === '/' || path === '';
		return path === href || path.startsWith(href);
	}
</script>

<!-- Transparent over the hero on the home page (one continuous photo,
     no band at the junction — the gradient fades to fully transparent at
     the header's bottom edge); dark photo background everywhere else, and
     on home once the hero has scrolled away. bg-night underneath is the
     fallback if /images/hero.jpg is missing. -->
<header
	class="sticky top-0 z-50 bg-night text-white transition-shadow duration-300 {isHome && !scrolledPastHero
		? ''
		: 'shadow-lg backdrop-blur'}"
	style={isHome && !scrolledPastHero
		? 'background-image: linear-gradient(rgba(14, 11, 8, 0.6), rgba(14, 11, 8, 0)); background-size: cover; background-position: center top;'
		: "background-image: linear-gradient(rgba(14, 11, 8, 0.8), rgba(14, 11, 8, 0.8)), url('/images/hero.jpg'); background-size: cover; background-position: center;"}
>
	<div
		class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 {compact
			? 'h-16'
			: 'h-[76px]'}"
	>
		<a href="/" class="flex shrink-0 items-center gap-2.5" aria-label="Flavoro Restaurant — home">
			<UtensilsCrossed class="h-7 w-7 text-brand" />
			<span class="leading-none">
				<span class="block font-script text-[34px] leading-none text-white">Flavoro</span>
				<span class="mt-1 block text-[9px] font-semibold tracking-[0.35em] text-brand">RESTAURANT</span>
			</span>
		</a>

		<nav class="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Main navigation">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? 'page' : undefined}
					class="text-[15px] font-medium whitespace-nowrap transition-colors {isActive(link.href)
						? 'text-brand'
						: 'text-white/85 hover:text-brand'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2 sm:gap-3">
			<!-- Cart button with count badge; the badge pops (scale keyframe)
			     on every add, keyed on cart.count. -->
			<button
				type="button"
				onclick={() => ui.openCart()}
				aria-label="Open cart{cart.count > 0 ? `, ${cart.count} item${cart.count === 1 ? '' : 's'}` : ''}"
				class="relative flex h-11 w-11 items-center justify-center rounded-full text-white transition-all hover:bg-white/10 active:scale-90"
			>
				<ShoppingBag class="h-6 w-6" />
				{#if cart.count > 0}
					{#key cart.count}
						<span
							class="animate-badge-pop absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white"
						>
							{cart.count}
						</span>
					{/key}
				{/if}
			</button>
			<!-- Open-now pill: desktop only, and only from xl up — at lg
			     (1024) the nav + CTA already fill the bar, so the pill
			     would force a wrap. It stays in the footer + contact page
			     at every width. -->
			<div class="hidden xl:block">
				<OpenStatus />
			</div>
			<a
				href="/reservations/"
				class="hidden h-11 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-all hover:bg-brand-dark active:scale-[0.98] sm:flex"
			>
				<CalendarDays class="h-5 w-5" />
				Book a Table
			</a>
			<button
				type="button"
				class="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
				onclick={() => (mobileOpen = !mobileOpen)}
			>
				{#if mobileOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<nav class="border-t border-white/10 bg-night px-4 pt-2 pb-4 lg:hidden" aria-label="Mobile navigation">
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={() => (mobileOpen = false)}
					class="flex min-h-11 items-center rounded-lg px-3 text-[16px] font-medium {isActive(link.href)
						? 'text-brand'
						: 'text-white/85 hover:bg-white/5'}"
				>
					{link.label}
				</a>
			{/each}
			<p class="mt-3 px-3 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
				More
			</p>
			{#each moreLinks as link (link.href)}
				<a
					href={link.href}
					onclick={() => (mobileOpen = false)}
					class="flex min-h-11 items-center rounded-lg px-3 text-[16px] font-medium {isActive(link.href)
						? 'text-brand'
						: 'text-white/85 hover:bg-white/5'}"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/reservations/"
				onclick={() => (mobileOpen = false)}
				class="mt-2 flex h-11 items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-white"
			>
				<CalendarDays class="h-5 w-5" />
				Book a Table
			</a>
			<button
				type="button"
				onclick={() => {
					mobileOpen = false;
					ui.openCart();
				}}
				class="mt-2 flex h-11 w-full items-center justify-center rounded-full border border-white/25 text-[15px] font-semibold text-white transition-colors hover:border-brand hover:text-brand"
			>
				Cart{#if cart.count > 0} ({cart.count}){/if}
			</button>
		</nav>
	{/if}
</header>
