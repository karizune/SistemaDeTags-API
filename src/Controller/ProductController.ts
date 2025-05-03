import { ErrorHandling } from "../Application/CustomModules/ErrorHandling";
import { List } from "../Application/CustomModules/List";
import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { Product } from "../Domain/Entities/Product";
import { IProductController } from "../Domain/Interfaces/Controllers/IProductController";
import { ICompanyService } from "../Domain/Interfaces/Services/ICompanyService";
import { IProductService } from "../Domain/Interfaces/Services/IProductService";
import { BaseController } from "./BaseController";

export class ProductController extends BaseController<Product> implements IProductController {
	public constructor(
		private productService: IProductService,
		private companyService: ICompanyService
	) {
		super(productService);
	}

	public async GetAllByCompany(companyID: number): Promise<HttpResponse> {
		try {
			let items: List<Product> = await this.productService.GetAllByCompany(companyID);

			if (!items.HasItems()) {
				return HttpResponse.NotFound();
			}

			return HttpResponse.Ok(items.ToArray());
		}
		catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ErrorHandling.TryGetErrorMessage(ex), this.BaseMessages.GetFailure);
		}
	}

	public async GetOneByCompany(id: number, companyID: number): Promise<HttpResponse> {
		try {
			let obj: { ID: number, CompanyID: number } = { ID: id, CompanyID: companyID };
			let validation: List<string> = ErrorHandling.ModelIsValid(obj);

			if (validation.HasItems() || id === undefined || companyID === undefined) {
				return HttpResponse.BadRequest(this.BaseMessages.PropIdRequired);
			}

			let item: Product | null = await this.productService.GetOneByCompany(id, companyID);

			if (item == null) {
				return HttpResponse.NotFound();
			}

			return HttpResponse.Ok(item);
		}
		catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ex);
		}
	}

	public async InactivateOneByCompany(id: number, companyID: number): Promise<HttpResponse> {
		try {
			let obj: { ID: number, CompanyID: number } = { ID: id, CompanyID: companyID };
			let validation: List<string> = ErrorHandling.ModelIsValid(obj);

			if (validation.HasItems() || id === undefined || companyID === undefined) {
				return HttpResponse.BadRequest(this.BaseMessages.DeleteFailure, validation.ToArray());
			}

			let item: Product | null = await this.productService.GetOneByCompany(id, companyID);

			if (item === null) {
				return HttpResponse.NotFound();
			}

			if (!(await this.Service.InactivateOne(id))) {
				return HttpResponse.BadRequest(this.BaseMessages.DeleteFailure);
			}

			return HttpResponse.Ok();
		}
		catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ErrorHandling.TryGetErrorMessage(ex), this.BaseMessages.DeleteFailure);
		}
	}

	public override async AddOne(item: Product): Promise<HttpResponse> {
		if (item === null || item === undefined) {
			return await super.AddOne(item)
		}

		if (!(await this.companyService.CompanyExistsById(item.CompanyID))) {
			return HttpResponse.BadRequest("Empresa inválida.");
		}

		if (await this.productService.ProductExistsByNameAndCompany(item.Name, item.CompanyID)) {
			return new HttpResponse(409, "Produto já cadastrado.");
		}

		return await super.AddOne(item);
	}
}
