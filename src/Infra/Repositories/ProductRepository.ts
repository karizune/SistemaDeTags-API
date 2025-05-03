import { AutoMapper } from "../../Application/CustomModules/AutoMapper";
import { DateTime } from "../../Application/CustomModules/DateTime";
import { List } from "../../Application/CustomModules/List";
import { Product } from "../../Domain/Entities/Product";
import { IProductRepository } from "../../Domain/Interfaces/Repositories/IProductRepository";
import { BaseRepository } from "./BaseRepository";
import Mongoose from "mongoose";

export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
	public constructor(context: Mongoose.Model<Product>) {
		super(context, Product);
	}

	public async GetAllByCompany(companyID: number): Promise<List<Product>> {
		let products: Product[] = await this.Context.find({ CompanyID: companyID, Active: true }) ?? [];
		return AutoMapper.MapArray(products, Product);
	}

	public async GetOneByCompany(id: number, companyID: number): Promise<Product | null> {
		let product: any = await this.Context.findOne({ ID: id, CompanyID: companyID, Active: true })
		return this.ObjectIsValid(product) ? AutoMapper.Map(product, Product) : null;
	}

	public async GetOneByNameAndCompany(name: string, companyID: number): Promise<Product | null> {
		let product: any = await this.Context.findOne({ Active: true, CompanyID: companyID, Name: name });
		return this.ObjectIsValid(product) ? AutoMapper.Map(product, Product) : null;
	}

	public async ProductExistsByNameAndCompany(name: string, companyID: number): Promise<boolean> {
		return (await this.GetOneByNameAndCompany(name, companyID)) !== null
	}

	public override async UpdateOne(product: Product): Promise<boolean> {
		product.UpdatedAt = new DateTime().ToDate();

		return (await this.Context.updateOne({
			ID: product.ID,
			CompanyID: product.CompanyID,
			Active: true
		} as Mongoose.FilterQuery<Product>, {
			$set: product
		})).acknowledged;
	}

	public async InactivateOneByCompany(id: number, companyID: number): Promise<boolean> {
		return (await this.Context.updateOne({
			ID: id,
			CompanyID: companyID
		} as Mongoose.FilterQuery<Product>, {
			$set: {
				UpdatedAt: new DateTime().Now.toDate(),
				Active: false
			}
		})).acknowledged;
	}
}
