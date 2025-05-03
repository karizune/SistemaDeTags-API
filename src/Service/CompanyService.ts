import { List } from "../Application/CustomModules/List";
import { Company } from "../Domain/Entities/Company";
import { User } from "../Domain/Entities/User";
import { ICompanyRepository } from "../Domain/Interfaces/Repositories/ICompanyRepository";
import { ICompanyService } from "../Domain/Interfaces/Services/ICompanyService";
import { IUserService } from "../Domain/Interfaces/Services/IUserSerice";
import { BaseService } from "./BaseService";

export class CompanyService extends BaseService<Company> implements ICompanyService {
	public constructor(
		private companyRepository: ICompanyRepository,
		private userService: IUserService
	) {
		super(companyRepository);
	}

	public async CompanyExistsById(id: number): Promise<boolean> {
		return await this.companyRepository.CompanyExistsById(id);
	}

	public async CompanyExistsByCNPJ(cnpj: string): Promise<boolean> {
		return await this.companyRepository.CompanyExistsByCNPJ(cnpj);
	}

	public override async InactivateOne(id: number): Promise<boolean> {
		let users: User[] = (await this.userService.GetAllByCompany(id)).FindAll("CompanyID", id).ToArray();

		//inactivates every user in the company that's is inactivating
		for (let i: number = 0; i < users.length; i++) {
			await this.userService.InactivateOne(users[i].ID);
		}

		return await super.InactivateOne(id);
	}
}
