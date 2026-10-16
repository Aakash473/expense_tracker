export const APP_TIMEZONE = "Asia/Kolkata";

export type MonthRange = {
	month: string;
	start: Date;
	end: Date;
};

export function getMonthRange(now: Date): MonthRange {
	const parts = new Intl.DateTimeFormat("en-CA", {
		timeZone: APP_TIMEZONE,
		year: "numeric",
		month: "2-digit",
	}).formatToParts(now);

	const year = Number(parts.find((part) => part.type === "year")?.value);
	const month = Number(parts.find((part) => part.type === "month")?.value);

	const monthStartUtc = Date.UTC(year, month - 1, 1);
	const nextMonthStartUtc = Date.UTC(year, month, 1);
	const istOffsetMs = 330 * 60 * 1000;

	return {
		month: `${year}-${String(month).padStart(2, "0")}-01`,
		start: new Date(monthStartUtc - istOffsetMs),
		end: new Date(nextMonthStartUtc - istOffsetMs),
	};
}
