import Mongoose from "mongoose"
import { Company } from "../../Domain/Entities/Company";

const CompanySchema: Mongoose.Schema<Company> = new Mongoose.Schema({
	ID: Number, //PK
	BusinessName: String,
	LegalName: String,
	Description: String,
	CNPJ: String,
	Address: String,
	Type: String,
	Email: String,
	WebSite: String,
	Phone: String,
	CreatedAt: Date,
	UpdatedAt: Date,
	Active: Boolean
});

export { CompanySchema }
