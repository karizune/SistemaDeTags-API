import { HttpResponse } from "../../Classes/HttpResponse";

export interface IBaseController<T> {
	/**
	 * Get an item of T based on his ID if exists.
	 * @param id The ID from item T.
	 * @returns A HttpResponse containing the item T or the error ocurred.
	 */
	GetOne(id?: number): Promise<HttpResponse>;

	/**
	 * Get every item of T if exists.
	 * @returns A HttpResponse containing the List T or the error ocurred.
	 */
	GetAll(): Promise<HttpResponse>;

	/**
	 * Adds new item T if not exists
	 * @param item The new item to be added.
	 * @returns A HttpResponse containing a message of success or the error ocurred.
	 */
	AddOne(item: T): Promise<HttpResponse>;

	/**
	 * Updates an item T if exists.
	 * @param item The item T to be updated.
	 * @returns A HttpResponse containing the item T itself or the error ocurred.
	 */
	UpdateOne(item: T): Promise<HttpResponse>;

	/**
	 * Inactivate an item of T based on his ID.
	 * @param id The ID from item T.
	 * @returns A HttpResponse containing a message of success or the error ocurred.
	 */
	InactivateOne(id: number): Promise<HttpResponse>;

	/**
	 * Reactivate an item of T based on his ID.
	 * @param id The ID from item T.
	 * @returns A HttpResponse containing a message of success or the error ocurred.
	 */
	ReactivateOne(id: number): Promise<HttpResponse>;
}
