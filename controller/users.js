import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as service from "../service/users.js";
import { User } from "../service/schemas/user.js";
dotenv.config();
const secret = process.env.SECRET;

export const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const user = await service.getUser({ email });
		if (user)
			return res.status(409).json({ message: "Provided email already exists" });
		const avatarURL = gravatar.url(email, { s: "60", d: "mp" });
		const newUser = new User({ name, email, avatarURL });
		newUser.setPassword(password);
		await newUser.save();
		res.status(201).json({ email, id: newUser.id });
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await service.getUser({ email });
		if (!user) return res.status(403).json({ message: "Email doesn't exist" });
		if (!user.validPassword(password))
			return res.status(403).json({ message: "Password is wrong" });

		const payload = {
			id: user.id,
			email: user.email,
		};
		const accessToken = jwt.sign(payload, secret, { expiresIn: "1h" });
		await service.updateUser(user.id, { accessToken });
		res.status(200).json({
			accessToken,
			userData: {
				email,
				id: user.id,
				cards: [],
			},
		});
	} catch (err) {
		next(err);
	}
};

export const logout = async (req, res, next) => {
	try {
		const user = await service.getUser({ id: req.user.id });
		if (!user)
			return res
				.status(401)
				.json({ message: "Unauthorized (invalid access token)" });
		await service.updateUser(req.user.id, { accessToken: null });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
