import { List } from "../Application/CustomModules/List";
import { Product } from "../Domain/Entities/Product";
import { ICompanyRepository } from "../Domain/Interfaces/Repositories/ICompanyRepository";
import { IProductRepository } from "../Domain/Interfaces/Repositories/IProductRepository";
import { IProductService } from "../Domain/Interfaces/Services/IProductService";
import { BaseService } from "./BaseService";

export class ProductService extends BaseService<Product> implements IProductService {

	public constructor(
		private productRepository: IProductRepository,
		private companyRepository: ICompanyRepository
	) {
		super(productRepository);
	}

	public async GetAllByCompany(companyID: number): Promise<List<Product>> {
		return await this.productRepository.GetAllByCompany(companyID);
	}

	public async GetOneByNameAndCompany(name: string, companyID: number): Promise<Product | null> {
		if (!(await this.companyRepository.CompanyExistsById(companyID))) {
			return null;
		}

		return await this.productRepository.GetOneByNameAndCompany(name, companyID);
	}

	public async GetOneByCompany(id: number, companyID: number): Promise<Product | null> {
		return await this.productRepository.GetOneByCompany(id, companyID);
	}

	public async ProductExistsByNameAndCompany(name: string, companyID: number): Promise<boolean> {
		return await this.productRepository.ProductExistsByNameAndCompany(name, companyID);
	}

	public async InactivateOneByCompany(id: number, companyID: number): Promise<boolean> {
		if (!(await this.companyRepository.CompanyExistsById(companyID))) {
			return false;
		}

		return await this.productRepository.InactivateOneByCompany(id, companyID);
	}
}
