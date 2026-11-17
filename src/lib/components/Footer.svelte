<script lang="ts">
	import { ChevronRight, Heart, Mail, MapPin, Phone, UtensilsCrossed } from '@lucide/svelte';
	import { restaurantInfo } from '#lib/api';

	const quickLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about/', label: 'About Us' },
		{ href: '/menu/', label: 'Menu' },
		{ href: '/gallery/', label: 'Gallery' },
		{ href: '/reservations/', label: 'Reservations' },
		{ href: '/contact/', label: 'Contact' }
	];
</script>

<footer class="footer-bg relative overflow-hidden bg-night text-white">
	<!-- Subtle dark gradient on the LEFT only, for text readability; the
	     food photo on the right stays fully visible. -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-r from-night/55 via-night/20 to-transparent"
		aria-hidden="true"
	></div>
	<div
		class="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8"
	>
		<div>
			<a href="/" class="flex items-center gap-2.5" aria-label="Flavoro Restaurant — home">
				<UtensilsCrossed class="h-7 w-7 text-brand" />
				<span class="leading-none">
					<span class="block font-script text-[34px] leading-none text-white">Flavoro</span>
					<span class="mt-1 block text-[9px] font-semibold tracking-[0.35em] text-brand">RESTAURANT</span>
				</span>
			</a>
			<p class="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
				Flavoro is where taste meets passion. We serve delicious food, great vibes, and unforgettable
				moments.
			</p>
			<div class="mt-6 flex gap-3">
				<a
					href="https://www.facebook.com/"
					target="_blank"
					rel="noreferrer"
					aria-label="Flavoro on Facebook"
					class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
				>
					<!-- Facebook brand mark (Lucide has no brand icons) -->
					<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true"
						><path
							d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z"
						/></svg
					>
				</a>
				<a
					href="https://www.instagram.com/"
					target="_blank"
					rel="noreferrer"
					aria-label="Flavoro on Instagram"
					class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
				>
					<!-- Instagram brand mark (Lucide has no brand icons) -->
					<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true"
						><path
							d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.3 4 3.9 2.4 7.1 2.3c1.3-.1 1.7-.1 4.9-.1ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"
						/></svg
					>
				</a>
				<a
					href="https://www.pinterest.com/"
					target="_blank"
					rel="noreferrer"
					aria-label="Flavoro on Pinterest"
					class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
				>
					<!-- Pinterest brand mark (Lucide has no brand icons) -->
					<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true"
						><path
							d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.99 9.13-.08-.78-.16-1.98.03-2.83l1.24-5.26s-.32-.63-.32-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.57 2.25-.87 3.5-.25 1.04.52 1.89 1.55 1.89 1.86 0 3.29-1.96 3.29-4.79 0-2.5-1.8-4.25-4.37-4.25-2.98 0-4.72 2.23-4.72 4.54 0 .9.35 1.86.78 2.39.09.1.1.19.09.3l-.29 1.2c-.05.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.96-.53-2.29-1.15l-.62 2.37c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2Z"
						/></svg
					>
				</a>
				<a
					href="https://www.youtube.com/"
					target="_blank"
					rel="noreferrer"
					aria-label="Flavoro on YouTube"
					class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
				>
					<!-- YouTube brand mark (Lucide has no brand icons) -->
					<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true"
						><path
							d="M23.5 7.2a3 3 0 0 0-2.12-2.12C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.38.53A3 3 0 0 0 .5 7.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 4.8 3 3 0 0 0 2.12 2.12c1.88.53 9.38.53 9.38.53s7.5 0 9.38-.53a3 3 0 0 0 2.12-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-4.8ZM9.6 15.6V8.4L15.83 12 9.6 15.6Z"
						/></svg
					>
				</a>
			</div>
		</div>

		<nav aria-label="Quick links">
			<h3 class="font-display text-xl font-bold text-brand">Quick Links</h3>
			<span class="mt-2 block h-0.5 w-10 bg-brand" aria-hidden="true"></span>
			<ul class="mt-5 space-y-3">
				{#each quickLinks as link (link.href)}
					<li>
						<a
							href={link.href}
							class="group flex items-center gap-1.5 text-[15px] text-white/70 transition-colors hover:text-brand"
						>
							<ChevronRight class="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div>
			<h3 class="font-display text-xl font-bold text-brand">Opening Hours</h3>
			<span class="mt-2 block h-0.5 w-10 bg-brand" aria-hidden="true"></span>
			<ul class="mt-5 space-y-3 text-[15px] text-white/70">
				<li>Monday – Friday<br />11:00 AM – 10:00 PM</li>
				<li>Saturday – Sunday<br />10:00 AM – 11:00 PM</li>
			</ul>
			<p class="mt-4 font-script text-2xl text-brand">We are Open Everyday!</p>
		</div>

		<div>
			<h3 class="font-display text-xl font-bold text-brand">Contact Us</h3>
			<span class="mt-2 block h-0.5 w-10 bg-brand" aria-hidden="true"></span>
			<ul class="mt-5 space-y-4 text-[15px] text-white/70">
				<li class="flex items-start gap-2.5">
					<Phone class="mt-0.5 h-5 w-5 shrink-0 text-brand" />
					<a href="tel:+12345678900" class="transition-colors hover:text-brand">{restaurantInfo.phone}</a>
				</li>
				<li class="flex items-start gap-2.5">
					<Mail class="mt-0.5 h-5 w-5 shrink-0 text-brand" />
					<a href="mailto:info@flavoro.com" class="transition-colors hover:text-brand"
						>{restaurantInfo.email}</a
					>
				</li>
				<li class="flex items-start gap-2.5">
					<MapPin class="mt-0.5 h-5 w-5 shrink-0 text-brand" />
					<span>123 Food Street,<br />New York, USA 10001</span>
				</li>
			</ul>
		</div>
	</div>

	<!-- Bottom bar sits on the SAME background photo (transparent, no
	     solid band, no divider line) — part of the same dark footer. -->
	<div class="relative z-10">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-white/60 sm:flex-row sm:px-6 lg:px-8"
		>
			<p>
				© 2025 Flavoro Restaurant. All Rights Reserved.<Heart
					class="ml-1 inline h-4 w-4 fill-brand text-brand"
					aria-hidden="true"
				/>
			</p>
			<p>
				<a href="/privacy/" class="transition-colors hover:text-brand">Privacy Policy</a>
				<span class="mx-2 text-white/30">|</span>
				<a href="/terms/" class="transition-colors hover:text-brand">Terms &amp; Conditions</a>
			</p>
		</div>
	</div>
</footer>

<style>
	/* Footer: ONE dark photograph across the full width (near-black wood
	   left, basil/tomato/spices right), continuing under the bottom bar.
	   No <img> — a pasted image can never align. bg-night underneath is
	   the fallback if /images/footer-bg.jpg is missing.
	   Mobile/tablet: cover anchored 75% across — the food cluster stays
	   on the right while dark wood sits under the stacked text, so every
	   line stays readable.
	   Desktop (>=1024px): the photo is 20% wider than the footer and
	   bottom-anchored, which pushes the food cluster right of the Contact
	   column — the text sits on plain dark wood, the tomato/basil/spice
	   bowls stay clearly visible at the right edge. Plain cover puts a
	   bowl rim through the phone number (verified in screenshots). */
	.footer-bg {
		background-image: url('/images/footer-bg.jpg');
		background-size: cover;
		background-position: 75% center;
	}
	@media (min-width: 1024px) {
		.footer-bg {
			background-size: 120% auto;
			background-position: left bottom;
		}
	}
</style>
