import Mongoose from "mongoose"
import { User } from "../../Domain/Entities/User";

const UserSchema: Mongoose.Schema<User> = new Mongoose.Schema({
	ID: Number, //PK
	CompanyID: Number,
	Name: String,
	Password: String,
	CreatedAt: Date,
	UpdatedAt: Date,
	Active: Boolean
});

export { UserSchema }
