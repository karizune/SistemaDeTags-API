import { BaseClass } from "../Classes/BaseClass";

export class Company extends BaseClass {
	public BusinessName: string;
	public LegalName: string;
	public Description?: string;
	public CNPJ: string;
	public Address?: string;
	public Type?: string;
	public Email?: string;
	public WebSite?: string;
	public Phone?: string;

	public constructor(
		id?: number,
		businessName?: string,
		legalName?: string,
		description?: string,
		cnpj?: string,
		address?: string,
		type?: string,
		email?: string,
		webSite?: string,
		phone?: string,
		createdAt?: Date,
		updatedAt?: Date,
		active?: boolean
	) {
		super(id, createdAt, updatedAt, active);
		this.BusinessName = businessName ?? "";
		this.LegalName = legalName ?? "";
		this.Description = description;
		this.CNPJ = cnpj ?? "";
		this.Address = address;
		this.Type = type;
		this.Email = email;
		this.WebSite = webSite;
		this.Phone = phone;
	}
}
