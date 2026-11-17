<script lang="ts">
	import { page } from '$app/state';
	import { CalendarDays, Menu, UtensilsCrossed, X } from '@lucide/svelte';
	import { ui } from '#lib/ui.svelte';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about/', label: 'About Us' },
		{ href: '/menu/', label: 'Menu' },
		{ href: '/gallery/', label: 'Gallery' },
		{ href: '/reservations/', label: 'Reservations' },
		{ href: '/blog/', label: 'Blog' },
		{ href: '/contact/', label: 'Contact' }
	];

	let mobileOpen = $state(false);
	let scrolledPastHero = $state(false);

	const isHome = $derived(page.url.pathname === '/' || page.url.pathname === '');

	$effect(() => {
		// On the home page the header is transparent while it sits over the
		// hero photo, so header + hero read as ONE continuous photograph
		// (same as the reference). Once the hero has scrolled away, the
		// header gets the same dark photo background as on every other page.
		if (!isHome) {
			scrolledPastHero = false;
			return;
		}
		const onScroll = () => {
			const hero = document.querySelector('main > section:first-of-type');
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
	class="sticky top-0 z-50 bg-night text-white {isHome && !scrolledPastHero
		? ''
		: 'shadow-lg backdrop-blur'}"
	style={isHome && !scrolledPastHero
		? 'background-image: linear-gradient(rgba(14, 11, 8, 0.6), rgba(14, 11, 8, 0)); background-size: cover; background-position: center top;'
		: "background-image: linear-gradient(rgba(14, 11, 8, 0.8), rgba(14, 11, 8, 0.8)), url('/images/hero.jpg'); background-size: cover; background-position: center;"}
>
	<div class="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
		<a href="/" class="flex shrink-0 items-center gap-2.5" aria-label="Flavoro Restaurant — home">
			<UtensilsCrossed class="h-7 w-7 text-brand" />
			<span class="leading-none">
				<span class="block font-script text-[34px] leading-none text-white">Flavoro</span>
				<span class="mt-1 block text-[9px] font-semibold tracking-[0.35em] text-brand">RESTAURANT</span>
			</span>
		</a>

		<nav class="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? 'page' : undefined}
					class="text-[15px] font-medium transition-colors {isActive(link.href)
						? 'text-brand'
						: 'text-white/85 hover:text-brand'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2 sm:gap-3">
			<a
				href="/reservations/"
				class="hidden h-11 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark sm:flex"
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
				Cart
			</button>
		</nav>
	{/if}
</header>
