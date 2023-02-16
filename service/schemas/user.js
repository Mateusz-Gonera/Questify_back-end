import { model, Schema } from "mongoose";
import bCrypt from "bcryptjs";

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			minLength: 3,
			maxLength: 254,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: 8,
			maxLength: 100,
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: { type: String },
	},
	{ versionKey: false, timestamp: true },
);

userSchema.methods.setPassword = function (password) {
	this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
	return bCrypt.compareSync(password, this.password);
};

export const User = model("user", userSchema);
