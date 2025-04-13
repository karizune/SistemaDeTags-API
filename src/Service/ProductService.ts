import { Product } from "../Domain/Classes/Product";
import { IProductRepository } from "../Domain/Interfaces/Repositories/Product/IProductRepository";
import { IProductService } from "../Domain/Interfaces/Services/IProductService";
import { BaseService } from "./BaseService";

export class ProductService extends BaseService<Product> implements IProductService {
	public constructor(ProductRepository: IProductRepository) {
		super(ProductRepository);
	}
}
