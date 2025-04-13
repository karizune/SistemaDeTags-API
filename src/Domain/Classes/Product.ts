import { BaseClass } from "./BaseClass";

export class Product extends BaseClass {
	public Description: string;
	public ImageUrl: string;

	public constructor(id?: number, description?: string, imageUrl?: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
		super(id, createdAt, updatedAt, active);
		this.Description = description ?? "";
		this.ImageUrl = imageUrl ?? "";
	}
}
