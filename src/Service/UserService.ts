import { List } from "../Application/CustomModules/List";
import { User } from "../Domain/Entities/User";
import { IUserRepository } from "../Domain/Interfaces/Repositories/IUserRepository";
import { IUserService } from "../Domain/Interfaces/Services/IUserSerice";
import { BaseService } from "./BaseService";

export class UserService extends BaseService<User> implements IUserService {
	public constructor(private userRepository: IUserRepository) {
		super(userRepository);
	}

	public async GetAllByCompany(companyID: number): Promise<List<User>> {
		return (await this.Repository.GetAll()).FindAll("CompanyID", companyID);
	}

	public override async GetAll(): Promise<List<User>> {
		let users: User[] = (await super.GetAll()).ToArray();

		users.forEach(user => {
			user.Password = "";
		});

		return new List<User>(users);
	}

	public override async GetOne(id: number): Promise<User | null> {
		let user: User | null = await super.GetOne(id);

		if (user === null) {
			return null;
		}

		user.Password = "";
		return user;
	}

	public async UserExistsByName(username: string): Promise<boolean> {
		return this.userRepository.UserExistsByName(username);
	}
}
