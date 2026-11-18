// Opening hours + live open/closed status.
// Client-side only: call getOpenStatus() inside onMount (or an event
// handler) so prerendered HTML never bakes in a stale open/closed state.
// Hours: Mon–Fri 11:00–22:00, Sat–Sun 10:00–23:00 (local time).

export interface OpenStatus {
	open: boolean;
	label: string;
	/** e.g. "Today: 11:00 AM – 10:00 PM" */
	todayHours: string;
}

interface DayHours {
	open: number; // minutes from midnight
	close: number; // minutes from midnight
	openLabel: string;
	closeLabel: string;
}

const WEEKDAY: DayHours = {
	open: 11 * 60,
	close: 22 * 60,
	openLabel: '11:00 AM',
	closeLabel: '10:00 PM'
};

const WEEKEND: DayHours = {
	open: 10 * 60,
	close: 23 * 60,
	openLabel: '10:00 AM',
	closeLabel: '11:00 PM'
};

function hoursFor(day: number): DayHours {
	// 0 = Sunday, 6 = Saturday
	return day === 0 || day === 6 ? WEEKEND : WEEKDAY;
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
	const day = now.getDay();
	const h = hoursFor(day);
	const mins = now.getHours() * 60 + now.getMinutes();
	const todayHours = `Today: ${h.openLabel} – ${h.closeLabel}`;

	if (mins >= h.open && mins < h.close) {
		return { open: true, label: `Open now · closes ${h.closeLabel}`, todayHours };
	}
	if (mins < h.open) {
		return { open: false, label: `Closed · opens ${h.openLabel}`, todayHours };
	}
	// After closing — the next opening is tomorrow.
	const next = hoursFor((day + 1) % 7);
	return { open: false, label: `Closed · opens ${next.openLabel} tomorrow`, todayHours };
}
