import { List } from "../../../Application/CustomModules/List";
import { User } from "../../Entities/User";
import { IBaseService } from "./IBaseService";

export interface IUserService extends IBaseService<User> {
	UserExistsByName(username: string): Promise<boolean>
	GetAllByCompany(companyID: number): Promise<List<User>>
}
