import { List } from "../Application/CustomModules/List";
import { BaseClass } from "../Domain/Classes/BaseClass";
import { IBaseRepository } from "../Domain/Interfaces/Repositories/Base/IBaseRepository";
import { IBaseService } from "../Domain/Interfaces/Services/IBaseService";

export abstract class BaseService<T extends BaseClass> implements IBaseService<T> {

	Repository: IBaseRepository<T>;

	public constructor(repository: IBaseRepository<T>) {
		this.Repository = repository;
	}

	public async GetAll(): Promise<List<T>> {
		return await this.Repository.GetAll();
	}

	public async GetOne(id: number): Promise<T | null> {
		return await this.Repository.GetOneById(id);
	}

	public async AddOne(item: T): Promise<boolean> {
		return await this.Repository.AddOne(item);
	}

	public async UpdateOne(item: T): Promise<boolean> {
		return await this.Repository.UpdateOne(item);
	}

	public async InactivateOne(id: number): Promise<boolean> {
		let item: T | null = await this.GetOne(id);

		if (item === null) {
			return false;
		}

		return this.Repository.InactivateOne(id);
	}

	public async ReactivateOne(id: number): Promise<boolean> {
		let item: T | null = await this.Repository.GetOneInactiveById(id);

		if (item === null || item === undefined) {
			return false;
		}

		return this.Repository.ReactivateOne(id);
	}
}
