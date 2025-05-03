import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { User } from "../Domain/Entities/User";
import { IUserController } from "../Domain/Interfaces/Controllers/IUserController";
import { ICompanyService } from "../Domain/Interfaces/Services/ICompanyService";
import { IUserService } from "../Domain/Interfaces/Services/IUserSerice";
import { BaseController } from "./BaseController";

export class UserController extends BaseController<User> implements IUserController {
	public constructor(
		private userService: IUserService,
		private companyService: ICompanyService
	) {
		super(userService);
	}

	public override async AddOne(user: User): Promise<HttpResponse> {
		if (user === null || user === undefined) {
			return await super.AddOne(user); //it will fail because the model is invalid.
		}

		if (!await this.companyService.CompanyExistsById(user.CompanyID)) {
			return HttpResponse.BadRequest("Empresa inválida.");
		}

		if (await this.userService.UserExistsByName(user.Name)) {
			return new HttpResponse(409, "Usuário já cadastrado.");
		}

		return await super.AddOne(user);
	}
}
