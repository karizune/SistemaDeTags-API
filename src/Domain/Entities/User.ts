import { BaseClass } from "../Classes/BaseClass";

export class User extends BaseClass {
	public CompanyID: number;
	public Name: string;
	public Password: string;

	public constructor(id?: number, companyID?: number, name?: string, password?: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
		super(id, createdAt, updatedAt, active);
		this.CompanyID = companyID ?? 0;
		this.Name = name ?? "";
		this.Password = password ?? "";
	}
}
