import { Router, Request, Response } from "express";
import { AutoMapper } from "../Application/CustomModules/AutoMapper";
import { Product } from "../Domain/Classes/Product";
import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { HttpHelper } from "../Application/CustomModules/HttpHelper";
import { IProductController } from "../Domain/Interfaces/Controllers/IProductController";

export class ProductRoutes {
	private Routes: Router;
	private ProductController: IProductController

	public constructor(ProductController: IProductController) {
		this.Routes = Router();
		this.ProductController = ProductController;
		this.GetProductRoutes();
	}

	public GetRoutes(): Router {
		return this.Routes;
	}

	private GetProductRoutes(): void {
		this.Routes.get("/GetOne", async (req: Request, res: Response) => {
			let props: { Id: number } = { Id: 0 };
			props = HttpHelper.TryGetParamsFromQueryString(req.query, props);
			let response: HttpResponse = await this.ProductController.GetOne(props.Id);
			return res.status(response.Status).json(response.Body);
		});

		this.Routes.get("/GetAll", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.ProductController.GetAll();
			return res.status(response.Status).json(response.Body);
		})

		this.Routes.post("/Add", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.ProductController.AddOne(AutoMapper.Map(req.body, Product));
			return res.status(response.Status).json(response.Body);
		});

		this.Routes.put("/Update", async (req: Request, res: Response) => {
			let prod: Product = AutoMapper.Map(req.body, Product);
			prod.ID = Number.parseInt(req.query.Id as string)
			let response: HttpResponse = await this.ProductController.UpdateOne(prod);

			return res.status(response.Status).json(response.Body);
		});

		this.Routes.delete("/Delete", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.ProductController.InactivateOne(Number.parseInt(req.query.Id as string));
			return res.status(response.Status).json(response.Body);
		})
	}
}
