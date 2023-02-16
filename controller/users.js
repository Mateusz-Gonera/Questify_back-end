import gravatar from "gravatar";
import * as service from "../service/users.js";
import { User } from "../service/schemas/user.js";

export const register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await service.getUser({ email });
		if (user)
			return res.status(409).json({ message: "Provided email already exists" });
		const avatarURL = gravatar.url(email, { s: "60", d: "mp" });
		const newUser = new User({ email, avatarURL });
		newUser.setPassword(password);
		await newUser.save();
		res.status(201).json({ email, id: newUser._id });
	} catch (err) {
		next(err);
	}
};
