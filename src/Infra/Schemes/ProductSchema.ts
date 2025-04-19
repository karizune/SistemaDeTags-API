import Mongoose from "mongoose"
import { Product } from "../../Domain/Classes/Product";

const ProductSchema: Mongoose.Schema<Product> = new Mongoose.Schema({
	ID: Number, //PK
	Name: String,
	Description: String,
	ImageUrl: String,
	Price: Number,
	CreatedAt: Date,
	UpdatedAt: Date,
	Active: Boolean
});

export { ProductSchema }
