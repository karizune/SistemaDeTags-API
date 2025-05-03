import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { Company } from "../Domain/Entities/Company";
import { ICompanyController } from "../Domain/Interfaces/Controllers/ICompanyController";
import { ICompanyService } from "../Domain/Interfaces/Services/ICompanyService";
import { BaseController } from "./BaseController";

export class CompanyController extends BaseController<Company> implements ICompanyController {
	public constructor(private companyService: ICompanyService) {
		super(companyService);
	}

	public override async AddOne(company: Company): Promise<HttpResponse> {
		if (company !== null && company !== undefined && (await this.companyService.CompanyExistsByCNPJ(company.CNPJ))) {
			return new HttpResponse(409, "Empresa já cadastrada.");
		}

		return super.AddOne(company);
	}
}
