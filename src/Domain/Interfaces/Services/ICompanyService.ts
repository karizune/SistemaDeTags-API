import { Company } from "../../Entities/Company";
import { IBaseService } from "./IBaseService";

export interface ICompanyService extends IBaseService<Company> {
	CompanyExistsById(id: number): Promise<boolean>
	CompanyExistsByCNPJ(cnpj: string): Promise<boolean>
}
