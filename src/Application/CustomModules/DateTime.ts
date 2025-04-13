import Moment from "moment";
import { Configuration } from "../Config/Configuration";

export class DateTime {
	public readonly Now: Moment.Moment;
	public readonly Day: number;
	public readonly Month: number;
	public readonly Year: number;
	public readonly Hour: number;
	public readonly Minute: number;
	public readonly Second: number;
	public readonly MiliSecond: number;

	constructor(now?: Moment.Moment, day?: number, month?: number, year?: number, hour?: number, minute?: number, second?: number, milisecond?: number) {
		Moment.locale(Configuration.Locale);
		this.Now = now ?? Moment().utcOffset("-03:00", false);
		this.Day = day ?? this.Now.get("D");
		this.Month = month ?? this.Now.get("M");
		this.Year = year ?? this.Now.get("y");
		this.Hour = hour ?? this.Now.get("h");
		this.Minute = minute ?? this.Now.get("m");
		this.Second = second ?? this.Now.get("s");
		this.MiliSecond = milisecond ?? this.Now.get("ms");
	}

	/**
	 * Converts a DateTime mooment to a TypeScript Date.
	 * @returns Date parsed from DateTime.
	 */
	public ToDate(): Date {
		let date: Date = new Date();
		date.setUTCFullYear(this.Year, this.Month, this.Day);
		date.setUTCHours(this.Hour, this.Minute, this.Second, this.MiliSecond);
		return date;
	}

	/**
	 * Converts a date from string with pattern 0000-00-00T00:00:00.000Z
	 * @param date a string date to be parsed
	 * @returns a new DateTime defined by a date received
	 */
	public static FromString(date: string): DateTime {
		date = date.substring(0, date.length - 1);
		let fullYear: string = date.split("T")[0];
		let fullHours: string = date.split("T")[1].split(".")[0];

		let year: number = Number.parseInt(fullYear.split("-")[0]);
		let month: number = Number.parseInt(fullYear.split("-")[1]);
		let day: number = Number.parseInt(fullYear.split("-")[2]);

		let hour: number = Number.parseInt(fullHours.split(":")[0]);
		let minute: number = Number.parseInt(fullHours.split(":")[1]);
		let second: number = Number.parseInt(fullHours.split(":")[2]);
		let milisecond: number = Number.parseInt(date.split("T")[1].split(".")[1]);

		return new DateTime(undefined, day, month, year, hour, minute, second, milisecond);
	}
}
