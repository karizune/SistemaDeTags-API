import { List } from "../../../Application/CustomModules/List";
import { Product } from "../../Entities/Product";
import { IBaseRepository } from "./IBaseRepository";

export interface IProductRepository extends IBaseRepository<Product> {
	GetAllByCompany(companyID: number): Promise<List<Product>>;
	GetOneByCompany(id: number, companyID: number): Promise<Product | null>;
	GetOneByNameAndCompany(name: string, companyID: number): Promise<Product | null>;
	ProductExistsByNameAndCompany(name: string, companyID: number): Promise<boolean>;
	InactivateOneByCompany(id: number, companyID: number): Promise<boolean>;
}
