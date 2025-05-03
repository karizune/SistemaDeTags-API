import Mongoose from "mongoose";
import { User } from "../../Domain/Entities/User";
import { IUserRepository } from "../../Domain/Interfaces/Repositories/IUserRepository";
import { BaseRepository } from "./BaseRepository";
import { AutoMapper } from "../../Application/CustomModules/AutoMapper";

export class UserRepository extends BaseRepository<User> implements IUserRepository {
	public constructor(context: Mongoose.Model<User>) {
		super(context, User);
	}

	public async UserExistsByName(username: string): Promise<boolean> {
		let user: User = AutoMapper.Map(await this.Context.find({ Active: true, Name: username }), User);
		return user.ID > 0;
	}
}
