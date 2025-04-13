import { DateTime } from "../../Application/CustomModules/DateTime";

export class BaseClass {
	public ID: number;
	public CreatedAt: Date;
	public UpdatedAt: Date;
	public Active: boolean;

	public constructor(id?: number, createdAt?: Date, updatedAt?: Date, active?: boolean) {
		this.ID = id ?? 0;
		this.CreatedAt = createdAt ?? new DateTime().ToDate();
		this.UpdatedAt = updatedAt ?? new DateTime().ToDate();
		this.Active = active ?? false;
	}
}
