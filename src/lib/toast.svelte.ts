class ToastStore {
	message = $state('');
	visible = $state(false);
	private timer: ReturnType<typeof setTimeout> | undefined;

	show(message: string) {
		this.message = message;
		this.visible = true;
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.visible = false;
		}, 2600);
	}

	hide() {
		this.visible = false;
		clearTimeout(this.timer);
	}
}

export const toast = new ToastStore();
