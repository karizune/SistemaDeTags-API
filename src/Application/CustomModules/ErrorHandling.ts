import { List } from "./List";

export class ErrorHandling {
	/**
	 * Try to get the error message from a exception.
	 * @param ex The error ocurred.
	 * @returns The message if succeded to obtain it.
	 */
	public static TryGetErrorMessage(ex: any): string {
		try {
			let error: Error = ex;
			return error.message;
		}
		catch (error: any) {
			return `${error}`;
		}
	}

	/**
	 * Validate a model in recursive way, for any methods thats not an "AddOne" method.
	 * @param model The item to be validated.
	 * @returns A list of errors.
	 */
	public static ModelIsValid<T extends object>(model: T): List<string> {
		let props: string[] = Object.getOwnPropertyNames(model);
		return this.ValidateProps(props, model);
	}

	/**
	 * Validate a model in recursive way, for "AddOne" methods, the PK ID will be invalid because the item still do not exists.
	 * @param model The item to be validated.
	 * @returns A list of errors.
	 */
	public static ModelIsValidWithoutID<T extends object>(model: T): List<string> {
		let props: string[] = Object.getOwnPropertyNames(model).filter(f => f !== "ID");
		return this.ValidateProps(props, model);
	}

	private static ValidateProps(propertiesNames: string[], model: any): List<string> {
		let errors: List<string> = new List<string>();

		for (let index: number = 0; index < propertiesNames.length; index++) {
			let propertyName: string = propertiesNames[index];
			let property: any = model[propertyName];
			let error: boolean = true;

			function ValidateProps(item: any, name: string) {
				switch (typeof (item)) {
					case "number":
						//FK ID
						if (name.toUpperCase().includes("ID")) {
							error = !ErrorHandling.ValidateID(item);
						}
						//any number prop
						else {
							error = !ErrorHandling.ValidateNumber(item);
						}
						break;
					case "string":
						if (name.toUpperCase().includes("EMAIL")) {
							error = !ErrorHandling.VerifyEmail(item)
						}
						else {
							error = !ErrorHandling.ValidateString(item);
						}
						break;
					case "boolean":
						error = !ErrorHandling.ValidateBoolean(item);
						break;
					case "object":
						if (ErrorHandling.ValidateObject(item)) {
							errors.AddManyFromList(ErrorHandling.ModelIsValid(item));
						}
						else {
							error = false;
						}
					default: //if needed, add new types to be validated above
						error = false;
						break;
				}
			}

			if (property instanceof Array && this.ValidateArray(property) && property.length > 0) {
				property.forEach(item => {
					ValidateProps(item, propertyName);
				});
			}
			else if (property instanceof List && this.ValidateList(property) && property.Count() > 0) {
				property.ToArray().forEach(item => {
					ValidateProps(item, propertyName);
				});
			}
			else {
				ValidateProps(property, propertyName);
			}

			if (error) {
				errors.Add(`${propertyName} é obrigatório.`);
			}
		}

		return errors;
	}

	private static ValidateID(id?: number): boolean {
		return id !== undefined && id > 0;
	}

	private static ValidateNumber(number?: number): boolean {
		return number !== undefined;
	}

	private static ValidateString(string?: string): boolean {
		return string !== undefined && string.length > 0;
	}

	private static ValidateBoolean(boolean?: boolean): boolean {
		return boolean !== undefined;
	}

	private static ValidateArray(array?: Array<any>): boolean {
		return array !== undefined;
	}

	private static ValidateObject(item: any): boolean {
		return item !== undefined && item !== null;
	}

	private static ValidateList(item: List<any>): boolean {
		return item !== undefined && item !== null;
	}

	private static VerifyEmail(email?: string): boolean {
		return email !== undefined && email.length > 0 && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null;
	}

	public static IsNullOrUndefined(item?: any) {
		return item === undefined || item === null;
	}
}
