import { ErrorHandling } from "../Application/CustomModules/ErrorHandling";
import { List } from "../Application/CustomModules/List";
import { BaseClass } from "../Domain/Classes/BaseClass";
import { HttpResponse } from "../Domain/Classes/HttpResponse";
import { IBaseController } from "../Domain/Interfaces/Controllers/IBaseController";
import { IBaseService } from "../Domain/Interfaces/Services/IBaseService";

export abstract class BaseController<T extends BaseClass> implements IBaseController<T> {

	private Service: IBaseService<T>;

	protected readonly BaseMessages: {
		AddFailure: string,
		UpdateFailure: string,
		DeleteFailure: string,
		GetFailure: string,
		AddSuccess: string,
		UpdateSucess: string,
		DeleteSuccess: string,
		PropIdRequired: string
	};

	constructor(service: IBaseService<T>) {
		this.Service = service;

		this.BaseMessages = {
			AddFailure: "Já cadastrado ou impossível completar o cadastro.",
			UpdateFailure: "Falha em atualizar.",
			DeleteFailure: "Falha em remover.",
			GetFailure: "Nenhum registro encontrado.",
			AddSuccess: "Cadastrado com sucesso.",
			DeleteSuccess: "Removido com sucesso.",
			PropIdRequired: "ID é obrigatório",
			UpdateSucess: "Atualizado com sucesso."
		}
	}

	public async GetAll(): Promise<HttpResponse> {
		try {
			let items: List<T> = await this.Service.GetAll();

			if (!items.HasItems()) {
				return HttpResponse.NotFound();
			}

			return HttpResponse.Ok(items.ToArray());
		}
		catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ErrorHandling.TryGetErrorMessage(ex), this.BaseMessages.GetFailure);
		}
	}

	public async GetOne(id: number): Promise<HttpResponse> {
		try {
			let obj: { ID: number } = { ID: id };
			let validation: List<string> = ErrorHandling.ModelIsValid(obj);

			if (validation.HasItems() || id === undefined) {
				return HttpResponse.BadRequest(this.BaseMessages.PropIdRequired);
			}

			let item: T | null = await this.Service.GetOne(id);

			if (item == null) {
				return HttpResponse.NotFound();
			}

			return HttpResponse.Ok(item);
		}
		catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ex);
		}
	}

	public async AddOne(item: T): Promise<HttpResponse> {
		try {
			let validation: List<string> = ErrorHandling.ModelIsValidWithoutID(item);
			if (validation.HasItems()) {
				return HttpResponse.BadRequest(this.BaseMessages.AddFailure, validation.ToArray());
			}

			if (!(await this.Service.AddOne(item))) {
				return HttpResponse.InternalServerError(this.BaseMessages.AddFailure);
			}

			return HttpResponse.Ok();
		}
		catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ex);
		}
	}

	public async UpdateOne(item: T): Promise<HttpResponse> {
		try {
			let validation: List<string> = ErrorHandling.ModelIsValid(item);
			if (validation.HasItems()) {
				return HttpResponse.BadRequest(this.BaseMessages.UpdateFailure, validation.ToArray());
			}

			let original: T | null = await this.Service.GetOne(item.ID);

			if (original === null) {
				return HttpResponse.NotFound();
			}

			item.CreatedAt = original.CreatedAt;

			if (!(await this.Service.UpdateOne(item))) {
				return HttpResponse.InternalServerError(this.BaseMessages.UpdateFailure);
			}

			return HttpResponse.Ok();
		}
		catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ErrorHandling.TryGetErrorMessage(ex), this.BaseMessages.UpdateFailure);
		}
	}

	public async InactivateOne(id: number): Promise<HttpResponse> {
		try {
			let obj: { ID: number } = { ID: id };
			let validation: List<string> = ErrorHandling.ModelIsValid(obj);

			if (validation.HasItems() || id === undefined) {
				return HttpResponse.BadRequest(this.BaseMessages.DeleteFailure, validation.ToArray());
			}

			let item: T | null = await this.Service.GetOne(id);

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

	public async ReactivateOne(id: number): Promise<HttpResponse> {
		try {
			let obj: { ID: number } = { ID: id };
			let validation: List<string> = ErrorHandling.ModelIsValid(obj);

			if (validation.HasItems() || id === undefined) {
				return HttpResponse.BadRequest(this.BaseMessages.UpdateFailure, validation.ToArray());
			}

			let item: T | null = await this.Service.GetOne(id);

			if (item === null) {
				return HttpResponse.NotFound();
			}

			if (!(await this.Service.InactivateOne(id))) {
				return HttpResponse.BadRequest(this.BaseMessages.UpdateFailure);
			}

			return HttpResponse.Ok();
		} catch (ex: any) {
			return HttpResponse.InternalServerErrorEx(ErrorHandling.TryGetErrorMessage(ex), this.BaseMessages.UpdateFailure);
		}
	}
}
