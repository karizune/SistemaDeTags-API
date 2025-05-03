import { Router, Request, Response } from "express";
import { AutoMapper } from "../Application/CustomModules/AutoMapper";
import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { IUserController } from "../Domain/Interfaces/Controllers/IUserController";
import { User } from "../Domain/Entities/User";

export class UserRoutes {

	public constructor(
		private userController: IUserController,
		private routes: Router = Router()
	) {
		this.GetUserRoutes();
	}

	public GetRoutes(): Router {
		return this.routes;
	}

	private GetUserRoutes(): void {
		this.routes.get("/GetOne", async (req: Request, res: Response) => {
			let id: number = Number.parseInt(req.query.ID as string);
			let response: HttpResponse = await this.userController.GetOne(id);
			return res.status(response.Status).json(response.Body);
		});

		this.routes.get("/GetAll", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.userController.GetAll();
			return res.status(response.Status).json(response.Body);
		})

		this.routes.post("/Add", async (req: Request, res: Response) => {
			let response: HttpResponse = await this.userController.AddOne(AutoMapper.Map(req.body, User));
			return res.status(response.Status).json(response.Body);
		});

		this.routes.put("/Update", async (req: Request, res: Response) => {
			console.log(req.query.ID as string)
			let user: User = AutoMapper.Map(req.body, User);
			user.ID = Number.parseInt(req.query.ID as string)
			let response: HttpResponse = await this.userController.UpdateOne(user);

			return res.status(response.Status).json(response.Body);
		});

		this.routes.delete("/Delete", async (req: Request, res: Response) => {
			let id: number = Number.parseInt(req.query.ID as string);
			let response: HttpResponse = await this.userController.InactivateOne(id);
			return res.status(response.Status).json(response.Body);
		})
	}
}
