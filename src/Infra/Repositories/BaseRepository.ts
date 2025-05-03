import Mongoose from "mongoose";

import { DateTime } from "../../Application/CustomModules/DateTime";
import { List } from "../../Application/CustomModules/List";
import { AutoMapper } from "../../Application/CustomModules/AutoMapper";
import { BaseClass } from "../../Domain/Classes/BaseClass";
import { IBaseRepository } from "../../Domain/Interfaces/Repositories/IBaseRepository";

export abstract class BaseRepository<T extends BaseClass> implements IBaseRepository<T> {

	public constructor(
		protected Context: Mongoose.Model<T>,
		protected Type: { new(): T }) { }

	public async GetAllWithInactives(): Promise<List<T>> {
		return AutoMapper.MapArray(await this.Context.find() ?? [], this.Type);
	}

	public ObjectIsValid(obj: any): boolean {
		if (obj === null || obj === undefined) {
			return false;
		}

		if (obj instanceof Array || obj instanceof List) {
			return true;
		}

		let parsed: T = AutoMapper.Map(obj, this.Type);
		return parsed.ID > 0;
	}

	public async GetLastId(): Promise<number> {
		return await this.Context.countDocuments();
	}

	public async GetAll(): Promise<List<T>> {
		return AutoMapper.MapArray((await this.Context.find({ Active: true } as Mongoose.FilterQuery<T>)) ?? [], this.Type);
	}

	public async GetOneById(id: number): Promise<T | null> {
		let item: any = await this.Context.findOne({ ID: id, Active: true } as Mongoose.FilterQuery<T>);
		return this.ObjectIsValid(item) ? AutoMapper.Map(item, this.Type) : null;
	}

	public async GetOneInactiveById(id: number): Promise<T | null> {
		let item: any = await this.Context.findOne({ ID: id } as Mongoose.FilterQuery<T>);
		return this.ObjectIsValid(item) ? AutoMapper.Map(item, this.Type) : null;
	}

	public async AddOne(item: T): Promise<boolean> {
		let date: Date = new DateTime().ToDate();
		item.ID = (await this.GetLastId()) + 1;
		item.Active = true;
		item.CreatedAt = date;
		item.UpdatedAt = date;

		await this.Context.create(item);
		return this.Context.find({ item } as Mongoose.FilterQuery<T>) !== null;
	}

	public async UpdateOne(item: T): Promise<boolean> {
		item.UpdatedAt = new DateTime().ToDate();

		return (await this.Context.updateOne({
			ID: item.ID,
			Active: true
		} as Mongoose.FilterQuery<T>, {
			$set: item
		})).acknowledged;
	}

	public async InactivateOne(id: number): Promise<boolean> {
		return (await this.Context.updateOne({
			ID: id
		} as Mongoose.FilterQuery<T>, {
			$set: {
				UpdatedAt: new DateTime().Now.toDate(),
				Active: false
			}
		})).acknowledged;
	}

	public async ReactivateOne(id: number): Promise<boolean> {
		return (await this.Context.updateOne({
			ID: id
		} as Mongoose.FilterQuery<T>, {
			$set: {
				UpdatedAt: new DateTime().Now.toDate(),
				Active: true
			}
		})).acknowledged;
	}

	public async DeleteOne(id: number): Promise<boolean> {
		return (await this.Context.deleteOne({
			ID: id
		} as Mongoose.FilterQuery<T>
		)).acknowledged;
	}
}
