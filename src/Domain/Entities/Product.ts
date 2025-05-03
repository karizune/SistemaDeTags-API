import { BaseClass } from "../Classes/BaseClass";

export class Product extends BaseClass {
	public CompanyID: number;
	public Name: string
	public Description: string;
	public ImageUrl: string;
	public Price: number;
	public RelatedProducts: number[]

	public constructor(id?: number, companyId?: number, name?: string, description?: string, imageUrl?: string, price?: number, relatedProducts?: number[], createdAt?: Date, updatedAt?: Date, active?: boolean) {
		super(id, createdAt, updatedAt, active);
		this.CompanyID = companyId ?? 0;
		this.Name = name ?? "";
		this.Description = description ?? "";
		this.ImageUrl = imageUrl ?? "";
		this.Price = price ?? 0.00;
		this.RelatedProducts = relatedProducts ?? [];
	}
}
