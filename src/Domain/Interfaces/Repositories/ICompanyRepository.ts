import { Company } from "../../Entities/Company";
import { IBaseRepository } from "./IBaseRepository";

export interface ICompanyRepository extends IBaseRepository<Company> {
	CompanyExistsById(id: number): Promise<boolean>
	CompanyExistsByCNPJ(cnpj: string): Promise<boolean>
}
