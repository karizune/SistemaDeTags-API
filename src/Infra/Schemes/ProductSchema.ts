import Mongoose from "mongoose"
import { Product } from "../../Domain/Entities/Product";

const ProductSchema: Mongoose.Schema<Product> = new Mongoose.Schema({
	ID: Number, //PK
	CompanyID: Number, //FK -> Company
	Name: String,
	Description: String,
	ImageUrl: String,
	Price: Number,
	RelatedProducts: Array<Number>, //Multiple FK's -> Product
	CreatedAt: Date,
	UpdatedAt: Date,
	Active: Boolean
});

export { ProductSchema }
