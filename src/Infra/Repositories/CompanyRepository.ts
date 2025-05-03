import { AutoMapper } from "../../Application/CustomModules/AutoMapper";
import { List } from "../../Application/CustomModules/List";
import { Company } from "../../Domain/Entities/Company";
import { ICompanyRepository } from "../../Domain/Interfaces/Repositories/ICompanyRepository";
import { BaseRepository } from "./BaseRepository";
import Mongoose from "mongoose";

export class CompanyRepository extends BaseRepository<Company> implements ICompanyRepository {
	public constructor(context: Mongoose.Model<Company>) {
		super(context, Company);
	}

	public async CompanyExistsById(id: number): Promise<boolean> {
		let company: Company | null = await super.GetOneById(id);
		return company !== null;
	}

	public async CompanyExistsByCNPJ(cnpj: string): Promise<boolean> {
		let companies: List<Company> = AutoMapper.MapArray((await this.Context.find({ Active: true, CNPJ: cnpj })) ?? [], Company);
		return companies.Count() > 0
	}
}
