<script lang="ts">
	import { ChevronDown, MessageCircleQuestion } from '@lucide/svelte';
	import { restaurantInfo } from '#lib/api';
	import Reveal from '#lib/components/Reveal.svelte';

	interface Faq {
		q: string;
		a: string;
	}

	const faqs: Faq[] = [
		{
			q: 'Do I need a reservation, or can I just walk in?',
			a: 'Walk-ins are always welcome and we keep tables free for them every service. On Friday and Saturday evenings we recommend booking ahead — you can reserve online in under a minute, or call us.'
		},
		{
			q: 'Where can I park?',
			a: 'There is free street parking on Food Street and the two side streets around the restaurant. The nearest public car park is a 3-minute walk away on Main Street, and it is free for the first hour.'
		},
		{
			q: 'Are children welcome?',
			a: 'Absolutely — children are welcome at lunch and dinner. We have high chairs, a kids menu with smaller portions of pasta, pizza and chicken, and colouring sheets to keep little ones busy.'
		},
		{
			q: 'Do you have outdoor seating?',
			a: 'Yes, our patio seats 24 guests from spring through autumn, weather permitting. Patio tables are first-come, first-served — ask at the door and we will do our best to seat you outside.'
		},
		{
			q: 'Do you have vegan or gluten-free options?',
			a: 'Yes. Several dishes are vegan or gluten-free as listed on the menu, and most pasta and pizza dishes can be adapted — just tell your server. Please always mention allergies when you order so the kitchen can take extra care.'
		},
		{
			q: 'What are your opening hours?',
			a: 'Monday to Friday 11:00 AM – 10:00 PM, and Saturday to Sunday 10:00 AM – 11:00 PM. The kitchen closes 30 minutes before the restaurant.'
		},
		{
			q: 'How do I book a table?',
			a: 'Use the reservations page on this site, or call us. Parties of up to 20 can book online; for larger groups, please see our private dining page or call us directly.'
		},
		{
			q: 'Can I order food for pickup or delivery?',
			a: 'Yes — our order page offers pickup and delivery with guest checkout, no account needed. Delivery costs $3.99 and is free on orders over $30, within 5 miles of the restaurant.'
		},
		{
			q: 'Do you cater events or offer private dining?',
			a: 'Both. Catering packages start at $14 per person for groups of 20 or more, with a $150 minimum order and 48 hours’ notice. Our private room seats up to 40 guests — see the catering and private dining pages to enquire.'
		},
		{
			q: 'Do you sell gift cards?',
			a: 'Yes — gift cards are available in $25, $50, $100 and $150 denominations (or any custom amount from $10 to $500) on our gift cards page. They are delivered by email and never expire.'
		}
	];

	let openIndex = $state<number | null>(0);

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<svelte:head>
	<title>Frequently Asked Questions — Flavoro Restaurant</title>
	<meta
		name="description"
		content="Flavoro FAQ: parking, kids, patio, walk-ins, vegan and gluten-free options, hours, reservations, ordering and private dining."
	/>
	<meta property="og:title" content="FAQ — Flavoro Restaurant" />
</svelte:head>

<Reveal>
<section class="bg-night py-16 text-center text-white lg:py-20">
	<p class="font-script text-3xl text-brand">Good to Know</p>
	<h1 class="mt-2 font-display text-4xl font-black sm:text-5xl">Frequently Asked Questions</h1>
	<p class="mx-auto mt-4 max-w-xl text-white/70">
		Everything guests usually ask — before you even have to.
	</p>
</section>
</Reveal>

<Reveal>
<section class="bg-cream py-16 lg:py-24">
	<div class="mx-auto max-w-3xl px-4 sm:px-6">
		<div class="space-y-3">
			{#each faqs as faq, i (faq.q)}
				<div class="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(31,26,21,0.06)]">
					<h2>
						<button
							type="button"
							onclick={() => toggle(i)}
							aria-expanded={openIndex === i}
							aria-controls="faq-panel-{i}"
							id="faq-button-{i}"
							class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-bold transition-colors hover:text-brand"
						>
							{faq.q}
							<ChevronDown
								class="h-5 w-5 shrink-0 text-brand transition-transform duration-300 {openIndex ===
								i
									? 'rotate-180'
									: ''}"
							/>
						</button>
					</h2>
					{#if openIndex === i}
						<p
							id="faq-panel-{i}"
							role="region"
							aria-labelledby="faq-button-{i}"
							class="px-6 pb-6 leading-relaxed text-muted"
						>
							{faq.a}
						</p>
					{/if}
				</div>
			{/each}
		</div>

		<div class="mt-10 rounded-3xl bg-white p-7 text-center shadow-xl">
			<MessageCircleQuestion class="mx-auto h-10 w-10 text-brand" />
			<h2 class="mt-3 font-display text-2xl font-black">Still Curious?</h2>
			<p class="mt-2 text-muted">
				Call us at <a href="tel:+12345678900" class="font-semibold text-brand">{restaurantInfo.phone}</a>
				or write to <a href="mailto:info@flavoro.com" class="font-semibold text-brand">{restaurantInfo.email}</a>
				— we reply within one working day.
			</p>
			<a
				href="/contact/"
				class="mt-5 inline-flex h-12 items-center rounded-full bg-brand px-7 font-semibold text-white transition-colors hover:bg-brand-dark"
			>
				Contact Us
			</a>
		</div>
	</div>
</section>
</Reveal>
