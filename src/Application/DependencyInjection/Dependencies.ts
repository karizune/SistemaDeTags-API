import * as Mongoose from "mongoose";

import { Database } from "../../Infra/Data/Database";
import { Configuration } from "../Config/Configuration";
import { IProductRepository } from "../../Domain/Interfaces/Repositories/Product/IProductRepository";
import { ProductRepository } from "../../Infra/Repositories/Product/ProductRepository";
import { Product } from "../../Domain/Classes/Product";
import { ProductSchema } from "../../Infra/Schemes/ProductSchema";
import { ProductController } from "../../Controller/ProductController";
import { IProductService } from "../../Domain/Interfaces/Services/IProductService";
import { ProductService } from "../../Service/ProductService";
import { IProductController } from "../../Domain/Interfaces/Controllers/IProductController";

//talvez trocar por inversifyJS
export class Dependencies {
	//Data
	private static Database: Mongoose.Connection = new Database().Connect(Configuration.ConnectionString);

	//Repository
	private static ProductRepository: IProductRepository = new ProductRepository(this.Database.model<Product>("Product", ProductSchema));

	//Service
	private static ProductService: IProductService = new ProductService(this.ProductRepository);

	//Controller
	public static ProductController: IProductController = new ProductController(this.ProductService);
}
