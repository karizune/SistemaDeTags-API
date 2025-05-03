import { Router, Request, Response } from "express";
import { AutoMapper } from "../Application/CustomModules/AutoMapper";
import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { ICompanyController } from "../Domain/Interfaces/Controllers/ICompanyController";
import { Company } from "../Domain/Entities/Company";

export class CompanyRoutes {

	public constructor(
		private companyController: ICompanyController,
		private routes: Router = Router()
	) {
		this.GetCompanyRoutes();
	}

	public GetRoutes(): Router {
		return this.routes;
	}

	private GetCompanyRoutes(): void {
		this.routes.get("/GetOne", async (req: Request, res: Response) => {
			let id: number = Number.parseInt(req.query.ID as string);
			let response: HttpResponse = await this.companyController.GetOne(id);
			return res.status(response.Status).json(response.Body);
		});

		this.routes.get("/GetAll", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.companyController.GetAll();
			return res.status(response.Status).json(response.Body);
		})

		this.routes.post("/Add", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.companyController.AddOne(AutoMapper.Map(req.body, Company));
			return res.status(response.Status).json(response.Body);
		});

		this.routes.put("/Update", async (req: Request, res: Response) => {
			let company: Company = AutoMapper.Map(req.body, Company);
			company.ID = Number.parseInt(req.query.ID as string)
			let response: HttpResponse = await this.companyController.UpdateOne(company);

			return res.status(response.Status).json(response.Body);
		});

		this.routes.delete("/Delete", async (req: Request, res: Response) => {
			let id: number = Number.parseInt(req.query.ID as string);
			let response: HttpResponse = await this.companyController.InactivateOne(id);
			return res.status(response.Status).json(response.Body);
		})
	}
}
