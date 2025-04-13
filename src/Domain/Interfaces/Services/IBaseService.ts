import { List } from "../../../Application/CustomModules/List";
import { BaseClass } from "../../Classes/BaseClass";

export interface IBaseService<T extends BaseClass> {

	/**
	 * Get one item T by id.
	 * @param id the id of the item.
	 * @returns New item of T.
	 */
	GetOne(id: number): Promise<T | null>;

	/**
	 * Get every active item T in a List of T.
	 * @returns New List of T.
	 */
	GetAll(): Promise<List<T>>;

	/**
	 * Add new item T into the database.
	 * @param item New item to add.
	 * @returns True if success.
	 */
	AddOne(item: T): Promise<boolean>;

	/**
	 * Updates an item if exists in the database.
	 * @param item A updated item to save.
	 * @returns The updated item itself if exists.
	 */
	UpdateOne(item: T): Promise<boolean>;

	/**
	 * Inactivate an item T based on his ID.
	 * @param id Id from item T to inactivate.
	 * @returns True if success.
	 */
	InactivateOne(id: number): Promise<boolean>;

	/**
	 * Reactivates an item T based on his ID.
	 * @param id Id from item T to reactivate.
	 * @returns True if success.
	 */
	ReactivateOne(id: number): Promise<boolean>;
}
