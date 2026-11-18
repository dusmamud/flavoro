// Testimonials data — shared by Home and About.
// SAMPLE — replace with real customer reviews before launch.
// Every entry carries `sample: true` so no placeholder quote can ever be
// mistaken for a real review. Do NOT add fake dates or "verified purchase"
// claims here; real quotes drop into this same shape (name + rating + quote).
export interface Testimonial {
	name: string;
	role: string;
	quote: string;
	rating: number; // 1–5 stars
	sample: true;
}

export const homeTestimonials: Testimonial[] = [
	{
		name: 'Sarah Thompson',
		role: 'Regular Guest',
		quote:
			'The Alfredo pasta is the best I have had outside Italy — creamy, fresh, and the room feels like home.',
		rating: 5,
		sample: true
	},
	{
		name: 'James Carter',
		role: 'Weekend Regular',
		quote:
			'We came for a birthday dinner and stayed for dessert. The lava cake alone is worth the visit.',
		rating: 5,
		sample: true
	},
	{
		name: 'Priya Sharma',
		role: 'First-time Visitor',
		quote:
			'Warm staff, generous portions, and a pizza straight from the wood-fired oven. We will be back.',
		rating: 5,
		sample: true
	}
];

// About reuses two Home quotes and adds one more — same data file, same shape.
export const aboutTestimonials: Testimonial[] = [
	homeTestimonials[0],
	homeTestimonials[1],
	{
		name: 'Michael Brown',
		role: 'Neighbourhood Regular',
		quote:
			'Ten years in and the kitchen has never missed. It is our family’s go-to table for every occasion.',
		rating: 5,
		sample: true
	}
];
