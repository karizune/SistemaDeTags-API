import { HttpResponse } from "../../Classes/HttpResponse";
import { Product } from "../../Entities/Product";
import { IBaseController } from "./IBaseController";

export interface IProductController extends IBaseController<Product> {
	GetAllByCompany(companyID: number): Promise<HttpResponse>;
	GetOneByCompany(id: number, companyID: number): Promise<HttpResponse>;
	InactivateOneByCompany(id: number, companyID: number): Promise<HttpResponse>;
}
