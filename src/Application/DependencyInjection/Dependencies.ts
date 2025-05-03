import * as Mongoose from "mongoose";

import { IProductRepository } from "../../Domain/Interfaces/Repositories/IProductRepository";
import { IProductService } from "../../Domain/Interfaces/Services/IProductService";
import { IProductController } from "../../Domain/Interfaces/Controllers/IProductController";
import { ICompanyRepository } from "../../Domain/Interfaces/Repositories/ICompanyRepository";
import { ICompanyController } from "../../Domain/Interfaces/Controllers/ICompanyController";
import { ICompanyService } from "../../Domain/Interfaces/Services/ICompanyService";

import { ProductSchema } from "../../Infra/Schemes/ProductSchema";
import { CompanySchema } from "../../Infra/Schemes/CompanySchema";
import { Configuration } from "../Config/Configuration";
import { Database } from "../../Infra/Data/Database";

import { Product } from "../../Domain/Entities/Product";
import { Company } from "../../Domain/Entities/Company";

import { CompanyRepository } from "../../Infra/Repositories/CompanyRepository";
import { ProductRepository } from "../../Infra/Repositories/ProductRepository";

import { CompanyService } from "../../Service/CompanyService";
import { ProductService } from "../../Service/ProductService";

import { CompanyController } from "../../Controller/CompanyController";
import { ProductController } from "../../Controller/ProductController";
import { IUserController } from "../../Domain/Interfaces/Controllers/IUserController";
import { IUserService } from "../../Domain/Interfaces/Services/IUserSerice";
import { IUserRepository } from "../../Domain/Interfaces/Repositories/IUserRepository";
import { UserRepository } from "../../Infra/Repositories/UserRepository";
import { UserSchema } from "../../Infra/Schemes/UserSchema";
import { User } from "../../Domain/Entities/User";
import { UserService } from "../../Service/UserService";
import { UserController } from "../../Controller/UserController";

//talvez trocar por inversifyJS
export class Dependencies {
	//Data
	private static Database: Mongoose.Connection = new Database().Connect(Configuration.ConnectionString);

	//Repository
	private static UserRepository: IUserRepository = new UserRepository(this.Database.model<User>("User", UserSchema));
	private static ProductRepository: IProductRepository = new ProductRepository(this.Database.model<Product>("Product", ProductSchema));
	private static CompanyRepository: ICompanyRepository = new CompanyRepository(this.Database.model<Company>("Company", CompanySchema));

	//Service
	private static UserService: IUserService = new UserService(this.UserRepository);
	private static CompanyService: ICompanyService = new CompanyService(this.CompanyRepository, this.UserService);
	private static ProductService: IProductService = new ProductService(this.ProductRepository, this.CompanyRepository);

	//Controller
	public static UserController: IUserController = new UserController(this.UserService, this.CompanyService)
	public static CompanyController: ICompanyController = new CompanyController(this.CompanyService)
	public static ProductController: IProductController = new ProductController(this.ProductService, this.CompanyService);
}
