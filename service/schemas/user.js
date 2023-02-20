import { model, Schema } from "mongoose";
import bCrypt from "bcryptjs";

const userSchema = new Schema(
	{
		accessToken: {
			type: String,
			default: null,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: 8,
			maxLength: 100,
		},
		userData: {
			name: { type: String, required: [true, "Name is required"] },
			email: {
				type: String,
				required: [true, "Email is required"],
				unique: true,
				minLength: 3,
				maxLength: 254,
			},
			avatarURL: { type: String },
			cards: [{ type: Schema.Types.ObjectId, ref: "card" }],
		},
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
