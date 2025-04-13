export class HttpHelper {
	public static TryGetParamsFromQueryString(query: any, props: any): any {
		let original: any = props;

		try {
			let params: string[] = Object.getOwnPropertyNames(props);
			params.forEach((prop: string) => {
				let value: any = query[prop];
				if (value !== null && value !== undefined) {
					switch (typeof (props[prop])) {
						case "string":
							props[prop] = value.toString();
							break;
						case "number":
							props[prop] = Number.parseInt(value.toString());
							break;
						case "boolean":
							props[prop] = value.toString().toLowerCase() === "true";
							break;
						default:
							props[prop] = value;
					}
				}
			});

			return props;
		}
		catch {
			return original;
		}
	}
}
