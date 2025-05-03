import { List } from "./List";
import { BaseClass } from "../../Domain/Classes/BaseClass";

export class AutoMapper {

	/**
	 * Parses an object to a defined T
	 * @param object an object to be parsed
	 * @param type the type to be use as parser
	 * @returns new mapped instance of T
	 */
	public static Map<T extends BaseClass>(object: any, type: { new(): T; }): T {
		if (object === undefined || object === null || !(object instanceof Object)) {
			throw new Error("objeto de entrada não compatível.");
		}

		if (object instanceof List) {
			throw new Error("Objeto de entrada deve ser único.");
		}

		if (object instanceof Array) {
			if (object.length > 1) {
				throw new Error("Objeto de entrada deve ser único.");
			}

			if (object.length === 1) {
				object = object[0]; //mutates into a single one
			}

			if (object.length === 0) {
				return new type();
			}
		}

		let sample: T = new type();
		let props: string[] = Object.getOwnPropertyNames(sample);
		let ret: any = sample;

		props.forEach((prop: string) => {
			if (object[prop] !== null && object[prop] !== undefined) {
				ret[prop] = object[prop];
			}
		});

		return ret;
	}

	/**
	 * Parse to a list of T from an array
	 * @param list the list to be mapped
	 * @param type the type to be use as parser
	 * @returns new mapped List of T
	 */
	public static MapList<T extends BaseClass>(list: List<any>, type: { new(): T; }): List<T> {
		let ret: List<T> = new List<T>();

		list.ToArray().forEach((item: T) => {
			ret.Add(this.Map(item, type));
		});

		return ret;
	}

	/**
	 * Parse to a list of T from an array
	 * @param array the array to be mapped
	 * @param type the type to be use as parser
	 * @returns new mapped List of T
	 */
	public static MapArray<T extends BaseClass>(array: any[], type: { new(): T; }): List<T> {
		let ret: List<T> = new List<T>();

		array.forEach((item: T) => {
			ret.Add(this.Map(item, type));
		});

		return ret;
	}
}
