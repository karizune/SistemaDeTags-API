import { List } from "../../../Application/CustomModules/List";
import { BaseClass } from "../../Classes/BaseClass";

export interface IBaseRepository<T extends BaseClass> {

	/**
	 * Try to verify if the object can be valid by having an id and not being null or undefined
	 * @param obj The object to be validated
	 */
	ObjectIsValid(obj: any): boolean;

	/**
	 * Gets every item T into a List of T.
	 * @returns A new List of T.
	 */
	GetAll(): Promise<List<T>>;

	/**
	 * Gets every item T into a List of T including inactives.
	 * @returns A new List of T.
	 */
	GetAllWithInactives(): Promise<List<T>>;

	/**
	 * Gets the last id in the database.
	 * @returns Last ID of the table.
	 */
	GetLastId(): Promise<number>;

	/**
	 * Get an item T if exists and its active based on his ID.
	 * @param id The ID from item T to search.
	 * @returns A item of T if exists.
	 */
	GetOneById(id: number): Promise<T | null>;

	/**
	 * Get an item T if exists based on his ID.
	 * @param id The ID from item T to search.
	 * @returns A item of T if exists.
	 */
	GetOneInactiveById(id: number): Promise<T | null>;

	/**
	 * Add the new item T into the database.
	 * @param item The new item T to be added.
	 * @returns True if success.
	 */
	AddOne(item: T): Promise<boolean>;

	/**
	 * Updates an item T if exists.
	 * @param item The item T to be updated.
	 * @returns The updated item T if exists.
	 */
	UpdateOne(item: T): Promise<boolean>;

	/**
	 * Inactive one item T based on his ID.
	 * @param id The ID of the item to be inactivated.
	 * @returns True if success.
	 */
	InactivateOne(id: number): Promise<boolean>;

	/**
	 * Reactivate one item T based on his ID.
	 * @param id The ID of the item to be reactivated.
	 * @returns True if success.
	 */
	ReactivateOne(id: number): Promise<boolean>;

	/**
	 * For mocking purposes, deletes a item from db.
	 * @param id
	 */
	DeleteOne(id: number): Promise<boolean>
}
