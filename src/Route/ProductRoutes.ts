import { Router, Request, Response } from "express";
import { AutoMapper } from "../Application/CustomModules/AutoMapper";
import { Product } from "../Domain/Entities/Product";
import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { IProductController } from "../Domain/Interfaces/Controllers/IProductController";

export class ProductRoutes {

	public constructor(
		private productController: IProductController,
		private routes = Router()
	) {
		this.GetProductRoutes();
	}

	public GetRoutes(): Router {
		return this.routes;
	}

	private GetProductRoutes(): void {
		this.routes.get("/GetOne", async (req: Request, res: Response) => {
			let productID: number = Number.parseInt(req.query.ProductID as string);
			let companyID: number = Number.parseInt(req.query.CompanyID as string);
			let response: HttpResponse = await this.productController.GetOneByCompany(productID, companyID);

			return res.status(response.Status).json(response.Body);
		});

		this.routes.get("/GetAll", async (req: Request, res: Response) => {
			let companyID: number = Number.parseInt(req.query.CompanyID as string);
			let response: HttpResponse = await this.productController.GetAllByCompany(companyID);

			return res.status(response.Status).json(response.Body);
		})

		this.routes.post("/Add", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.productController.AddOne(AutoMapper.Map(req.body, Product));
			return res.status(response.Status).json(response.Body);
		});

		this.routes.put("/Update", async (req: Request, res: Response) => {
			let product: Product = AutoMapper.Map(req.body, Product);
			let productID: number = Number.parseInt(req.query.ProductID as string);
			let companyID: number = Number.parseInt(req.query.CompanyID as string);

			product.ID = productID;
			product.CompanyID = companyID;

			let response: HttpResponse = await this.productController.UpdateOne(product);

			return res.status(response.Status).json(response.Body);
		});

		this.routes.delete("/Delete", async (req: Request, res: Response) => {
			let id: number = Number.parseInt(req.query.ID as string);
			let companyID: number = Number.parseInt(req.query.CompanyID as string);
			let response: HttpResponse = await this.productController.InactivateOneByCompany(id, companyID);

			return res.status(response.Status).json(response.Body);
		})
	}
}
