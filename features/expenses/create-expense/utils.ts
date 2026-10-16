export function getLocalDateTime() {
	const now = new Date();
	const pad = (value: number) => String(value).padStart(2, "0");

	return {
		date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
		time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
	};
}

export function formatDate(value: string) {
	if (!value) return "Choose a date";

	const [year, month, day] = value.split("-").map(Number);

	return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function formatTime(value: string) {
	if (!value) return "Select time";

	const [hours, minutes] = value.split(":").map(Number);
	const hour12 = hours % 12 || 12;
	const period = hours >= 12 ? "PM" : "AM";

	return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function to24Hour(hour: number, minute: number, period: string) {
	const hour24 = period === "PM" ? (hour % 12) + 12 : hour % 12;

	return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function toSpentAt(date: string, time: string) {
	return new Date(`${date}T${time}`).toISOString();
}
