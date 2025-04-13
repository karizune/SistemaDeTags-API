import { Product } from "../Domain/Classes/Product";
import { IProductController } from "../Domain/Interfaces/Controllers/IProductController";
import { IProductService } from "../Domain/Interfaces/Services/IProductService";
import { BaseController } from "./BaseController";

export class ProductController extends BaseController<Product> implements IProductController {
	public constructor(ProductService: IProductService) {
		super(ProductService);
	}
}
