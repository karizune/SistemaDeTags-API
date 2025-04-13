import { Product } from "../../../Domain/Classes/Product";
import { IProductRepository } from "../../../Domain/Interfaces/Repositories/Product/IProductRepository";
import { BaseRepository } from "../Base/BaseRepository";
import Mongoose from "mongoose";

export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
	constructor(context: Mongoose.Model<Product>) {
		super(context, Product);
	}
}
