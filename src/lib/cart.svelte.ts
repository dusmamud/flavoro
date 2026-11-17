import { browser } from '$app/env';
import type { Dish } from './api';

export interface CartItem {
	dish: Dish;
	qty: number;
}

const STORAGE_KEY = 'flavoro-cart-v1';

function load(): CartItem[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as CartItem[];
		return Array.isArray(parsed) ? parsed.filter((i) => i?.dish?.id && i.qty > 0) : [];
	} catch {
		return [];
	}
}

class CartStore {
	items = $state<CartItem[]>(load());

	count = $derived(this.items.reduce((n, i) => n + i.qty, 0));
	total = $derived(this.items.reduce((n, i) => n + i.qty * i.dish.price, 0));

	// NOTE (verifier fix 2026-11-17): $effect() cannot run in a class
	// constructor at module scope — the singleton below is created outside
	// any component, so Svelte threw effect_orphan on every page load and
	// hydration died (no click handler in the app worked). Persist
	// explicitly on every mutation instead; same behaviour, no effect.
	private persist() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
		} catch {
			// Storage unavailable — cart still works in memory.
		}
	}

	add(dish: Dish) {
		const found = this.items.find((i) => i.dish.id === dish.id);
		if (found) found.qty += 1;
		else this.items.push({ dish, qty: 1 });
		this.persist();
	}

	remove(id: string) {
		this.items = this.items.filter((i) => i.dish.id !== id);
		this.persist();
	}

	setQty(id: string, qty: number) {
		const found = this.items.find((i) => i.dish.id === id);
		if (!found) return;
		if (qty <= 0) this.remove(id);
		else {
			found.qty = Math.min(qty, 9);
			this.persist();
		}
	}

	clear() {
		this.items = [];
		this.persist();
	}
}

export const cart = new CartStore();

export function formatPrice(n: number): string {
	return `$${n.toFixed(2)}`;
}
