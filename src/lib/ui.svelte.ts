// Shared UI state (cart drawer open/close).
class UiStore {
	cartOpen = $state(false);

	openCart() {
		this.cartOpen = true;
	}

	closeCart() {
		this.cartOpen = false;
	}
}

export const ui = new UiStore();
