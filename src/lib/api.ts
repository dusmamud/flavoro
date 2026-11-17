// API seam — mock/static data now, Go REST API later.
// When the backend is ready, set API_BASE_URL in src/env.ts and swap the
// `fetch*` helpers to hit it; the shape of the data stays the same.
import { PUBLIC_API_BASE_URL } from '$app/env/public';

export const apiBaseUrl = PUBLIC_API_BASE_URL;

export type DishCategory =
	| 'Starters'
	| 'Main Course'
	| 'Pizza'
	| 'Pasta'
	| 'Desserts'
	| 'Drinks';

export interface Dish {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: DishCategory;
	badge?: string;
}

export const popularDishes: Dish[] = [
	{
		id: 'alfredo-pasta',
		name: 'Creamy Alfredo Pasta',
		description: 'White sauce pasta with herbs',
		price: 12.99,
		image: '/images/dish-pasta.jpg',
		category: 'Pasta',
		badge: 'Best Seller'
	},
	{
		id: 'grilled-chicken',
		name: 'Grilled Chicken Steak',
		description: 'Served with veggies & sauce',
		price: 15.99,
		image: '/images/dish-chicken.jpg',
		category: 'Main Course'
	},
	{
		id: 'margherita-pizza',
		name: 'Margherita Pizza',
		description: 'Classic cheese pizza',
		price: 11.99,
		image: '/images/dish-pizza.jpg',
		category: 'Pizza'
	},
	{
		id: 'lava-cake',
		name: 'Chocolate Lava Cake',
		description: 'Warm chocolate with ice cream',
		price: 7.99,
		image: '/images/dish-lava.jpg',
		category: 'Desserts'
	}
];

export const menuDishes: Dish[] = [
	...popularDishes,
	{
		id: 'bruschetta',
		name: 'Tomato Bruschetta',
		description: 'Grilled bread, tomato, basil & garlic',
		price: 6.99,
		image: '/images/dish-bruschetta.jpg',
		category: 'Starters'
	},
	{
		id: 'garden-salad',
		name: 'Garden Fresh Salad',
		description: 'Mixed greens, cherry tomato & citrus dressing',
		price: 8.49,
		image: '/images/dish-salad.jpg',
		category: 'Starters'
	},
	{
		id: 'tomato-soup',
		name: 'Roasted Tomato Soup',
		description: 'Slow-roasted tomato with basil cream',
		price: 6.49,
		image: '/images/dish-soup.jpg',
		category: 'Starters'
	},
	{
		id: 'grilled-salmon',
		name: 'Grilled Salmon',
		description: 'Lemon butter salmon with herb rice',
		price: 18.99,
		image: '/images/dish-salmon.jpg',
		category: 'Main Course'
	},
	{
		id: 'flavoro-burger',
		name: 'Flavoro Smash Burger',
		description: 'Double patty, cheddar & house sauce',
		price: 10.99,
		image: '/images/dish-burger.jpg',
		category: 'Main Course'
	},
	{
		id: 'pasta-arrabbiata',
		name: 'Penne Arrabbiata',
		description: 'Spicy tomato sauce with parmesan',
		price: 11.49,
		image: '/images/dish-pasta2.jpg',
		category: 'Pasta'
	},
	{
		id: 'tiramisu',
		name: 'Classic Tiramisu',
		description: 'Coffee-soaked ladyfingers & mascarpone',
		price: 6.99,
		image: '/images/dish-tiramisu.jpg',
		category: 'Desserts'
	},
	{
		id: 'fresh-lemonade',
		name: 'Fresh Mint Lemonade',
		description: 'Hand-pressed lemon with fresh mint',
		price: 4.99,
		image: '/images/dish-lemonade.jpg',
		category: 'Drinks'
	}
];

export const menuCategories: ('All' | DishCategory)[] = [
	'All',
	'Starters',
	'Main Course',
	'Pizza',
	'Pasta',
	'Desserts',
	'Drinks'
];

export interface Chef {
	name: string;
	role: string;
	image: string;
	bio: string;
}

export const chefs: Chef[] = [
	{
		name: 'Marco Bellini',
		role: 'Head Chef',
		image: '/images/chef-1.jpg',
		bio: '15 years behind the stove, from Naples to New York — pasta is his first language.'
	},
	{
		name: 'Sofia Ramirez',
		role: 'Pastry Chef',
		image: '/images/chef-2.jpg',
		bio: 'Desserts that end the meal on a high note — her lava cake is the house legend.'
	},
	{
		name: 'Arjun Mehta',
		role: 'Grill Master',
		image: '/images/chef-3.jpg',
		bio: 'Fire, smoke and patience. Every steak and chicken leaves his grill perfectly charred.'
	}
];

export interface GalleryItem {
	image: string;
	alt: string;
	caption: string;
}

export const galleryItems: GalleryItem[] = [
	{ image: '/images/gallery-1.jpg', alt: 'Signature dish plating', caption: 'Signature Plating' },
	{ image: '/images/gallery-2.jpg', alt: 'Restaurant interior', caption: 'The Dining Room' },
	{ image: '/images/gallery-3.jpg', alt: 'Fresh ingredients', caption: 'Fresh From the Market' },
	{ image: '/images/gallery-4.jpg', alt: 'Wood-fired pizza', caption: 'Wood-Fired Pizza' },
	{ image: '/images/gallery-5.jpg', alt: 'Dessert table', caption: 'Something Sweet' },
	{ image: '/images/gallery-6.jpg', alt: 'Friends sharing a meal', caption: 'Good Times, Shared' }
];

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string[];
	image: string;
	date: string;
	author: string;
	category: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: 'secret-perfect-pasta',
		title: 'The Secret Behind Our Perfect Pasta',
		excerpt: 'Fresh dough, slow sauces and one rule we never break — here is how our pasta earns its fans.',
		content: [
			'Great pasta starts long before the pan. We make our dough fresh every morning — flour, eggs, a pinch of salt — and let it rest until it is silky and ready to roll.',
			'The sauce is slow. Our Alfredo simmers gently so the cream, garlic and parmesan melt into one smooth coat instead of splitting apart.',
			'The rule we never break: pasta finishes in the sauce, never on top of it. The last two minutes in the pan are where the magic happens.'
		],
		image: '/images/blog-1.jpg',
		date: 'November 10, 2025',
		author: 'Marco Bellini',
		category: 'Kitchen Stories'
	},
	{
		slug: 'five-ingredients-every-kitchen-needs',
		title: '5 Ingredients Every Home Kitchen Needs',
		excerpt: 'You do not need a fancy pantry — just five honest ingredients and a little confidence.',
		content: [
			'Good olive oil, real parmesan, fresh basil, garlic and San Marzano tomatoes. With these five, you can cook half our menu at home.',
			'Buy the best you can afford and use less of it. A spoonful of great olive oil beats a cup of a bland one.',
			'Keep them where you can see them. Cooking starts with reaching, not searching.'
		],
		image: '/images/blog-2.jpg',
		date: 'November 2, 2025',
		author: 'Sofia Ramirez',
		category: 'Cooking Tips'
	},
	{
		slug: 'why-we-cook-with-fire',
		title: 'Why We Still Cook With Fire',
		excerpt: 'Gas is fast and electric is tidy — but nothing flavours food like real flame and wood smoke.',
		content: [
			'Our grill runs on hardwood, not gas. The smoke is subtle, but you can taste it in every steak that leaves the pass.',
			'Fire is honest. It punishes rushing and rewards patience — exactly the way we like to cook.',
			'Come and watch the grill on a Friday night. It is the best seat in the house.'
		],
		image: '/images/blog-3.jpg',
		date: 'October 24, 2025',
		author: 'Arjun Mehta',
		category: 'Behind the Scenes'
	},
	{
		slug: 'dessert-worth-saving-room-for',
		title: 'A Dessert Worth Saving Room For',
		excerpt: 'Our lava cake has a cult following. This is how a simple chocolate cake became the house legend.',
		content: [
			'It started as a happy accident — a cake pulled from the oven two minutes early, its centre still molten.',
			'We kept the accident and perfected it: dark chocolate, a whisper of espresso, and vanilla ice cream on the side.',
			'Order it when you sit down, not when you finish. It takes twelve minutes, and it is worth every one.'
		],
		image: '/images/blog-4.jpg',
		date: 'October 15, 2025',
		author: 'Sofia Ramirez',
		category: 'Sweet Endings'
	}
];

export const restaurantInfo = {
	name: 'Flavoro Restaurant',
	phone: '+1234 567 8900',
	email: 'info@flavoro.com',
	address: '123 Food Street, New York, USA 10001',
	hoursWeekday: 'Monday – Friday: 11:00 AM – 10:00 PM',
	hoursWeekend: 'Saturday – Sunday: 10:00 AM – 11:00 PM'
};
