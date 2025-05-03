/**
 * Simple list class to manipulate a list of objects
 */
export class List<T> {
	private InternalArray: Array<T>;

	/**
	 * Initialize the new list empty
	 */
	public constructor()

	/**
	 * Initialize the new list with some items
	 * @param array The initial items that will be in the internal list when initialized
	 */
	public constructor(array: Array<T>)
	public constructor(array?: Array<T>) {
		this.InternalArray = [];

		if (array && array?.length > 0) {
			array.forEach(element => {
				this.InternalArray.push(element);
			});
		}
	}

	/** Every item in the internal array
	* @returns Items in the internal array
	*/
	public ToArray(): Array<T> {
		return this.InternalArray;
	}

	public HasItems(): boolean {
		return this.InternalArray.length > 0;
	}

	/**
	 * Try to find the first ocurrence of the search otherwise is null instead.
	 * @param prop The property to use.
	 * @param value The value to search.
	 * @returns A item retrieved or null.
	 */
	public FindOne(prop: string, value: any): T | null {
		return this.InternalArray.find((item: any) => {
			if (item[prop] === value) {
				return item;
			}
			else {
				return null;
			}
		}) ?? null;
	}

	public FindAllLike(prop: string, value: string): List<T> {
		let lst: List<T> = new List<T>();
		this.InternalArray.forEach((element: any) => {
			if (typeof element[prop] === "string" && element[prop].includes(value)) {
				lst.Add(element);
			}
		});

		return lst;
	}

	/**
	 * Try find all items that have the prop name and value informed
	 * @param prop the property to use.
	 * @param value the value to be searched.
	 * @returns A List T of the items retrieved.
	 */
	public FindAll(prop: string, value: any): List<T> {
		let lst: List<T> = new List<T>();

		this.InternalArray.forEach((item: any) => {
			if (item[prop] === value) {
				lst.Add(item);
			}
		});

		return lst;
	}

	/**
	 * Get the first item if the list its not empty, otherwise it will be null.
	 * @returns The first item of the internal list or null
	 */
	public First(): T | null {
		if (this.HasItems()) {
			return this.InternalArray[0];
		}

		return null;
	}

	/**
	 * Get the last item if the list its not empty, otherwise it will be null.
	 * @returns The last item of the internal list or null
	 */
	public Last(): T | null {
		if (this.HasItems()) {
			return this.InternalArray[this.Count() - 1];
		}

		return null;
	}

	/**
	 * Orders every item in the internal list into ascending order
	 * @returns The list itself, in ascending order
	 */
	public OrderBy(): List<T>
	/**
	 * Orders every item in the internal list into ascending order
	 * @param PropertyName Property name that will be use to order
	 * @returns The list itself, in ascending order by property name
	 */
	public OrderBy(PropertyName: string): List<T>
	public OrderBy(Name?: string): List<T> {
		if (this.InternalArray.length === 0) {
			return new List<T>();
		}

		let propertyName: string = "";
		let newList: List<T> = new List();

		if (Name && Name.length > 0) {
			propertyName = Name;
			newList.AddMany(this.InternalArray.sort((a: any, b: any) => a[propertyName] - b[propertyName]));
		}
		else {
			newList.AddMany(this.InternalArray.sort((a: any, b: any) => a - b));
		}

		return newList;
	}

	/**
	 * Orders every item in the internal list into descending order
	 * @returns The list itself, in descending order
	 */
	public OrderByDescending(): List<T>

	/**
	 * @param PropertyName Property name that will be use to order
	 * @returns The list itself, in descending order by property name
	 */
	public OrderByDescending(PropertyName: string): List<T>
	public OrderByDescending(Name?: string): List<T> {
		if (this.InternalArray.length === 0) {
			return new List<T>();
		}

		let propertyName: string = "";
		let newList: List<T> = new List();

		if (Name && Name.length > 0) {
			propertyName = Name;
			newList.AddMany(this.InternalArray.sort((a: any, b: any) => b[propertyName] - a[propertyName]));
		}
		else {
			newList.AddMany(this.InternalArray.sort((a: any, b: any) => b - a));
		}

		return newList;
	}

	/**
	 * Add the new item in the last index of the internal list.
	 * @param item The item to add in the internal list.
	 */
	public Add(item: T): void {
		this.InternalArray.push(item);
	}

	/**
	 * Adds every item in the param list in the last index of the internal list.
	 * @param Items The items thats will be imported to internal list.
	 */
	public AddMany(items: Array<T>): void {
		items.forEach((item: T) => {
			this.InternalArray.push(item);
		});
	}

	/**
	 * Adds every item in the param list in the last index of the internal list from the old "List"
	 * @param items The list of items thats will be imported to internal list
	 */
	public AddManyFromList(items: List<T>): void {
		items.ToArray().forEach((item: T) => {
			this.InternalArray.push(item);
		});
	}

	/**
	 * Remove one single item from the list
	 * @param item The item that will be removed from the internal list
	 */
	public Remove(item: T): void {
		let newArray: Array<T> = [];

		if (this.InternalArray.length === 0) {
			return;
		}

		let index: number = this.InternalArray.findIndex((element: T, index: number) => {
			if (element === item) {
				return index
			}

			return -1;
		});

		if (index === 0) {
			newArray.concat(this.InternalArray.slice(1, this.InternalArray.length - 1));
		}
		else if (index === this.InternalArray.length - 1) {
			newArray.concat(this.InternalArray.slice(0, this.InternalArray.length - 2));
		}
		else {
			newArray.concat(this.InternalArray.slice(0, index - 1));
			newArray.concat(this.InternalArray.slice(index + 1, this.InternalArray.length - 1));
		}

		this.InternalArray = newArray;
	}

	/**
	 * Removes every item from the internal list if exists in the parameter
	 * @param Items The list of items that will be removed from the internal list
	 */
	public RemoveMany(Items: Array<T>): void {
		Items.forEach((item: T) => {
			this.Remove(item);
		})
	}

	/**
	 * Retrieves the number of items in the internal list
	 * @returns Number of items
	 */
	public Count(): number {
		return this.InternalArray.length;
	}
}
