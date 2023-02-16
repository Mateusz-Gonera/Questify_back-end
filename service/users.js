import { User } from "./schemas/user.js";

export const getUser = async (body) => User.findOne(body);

export const getUserById = async (id) => User.findById(id);

export const updateUser = async (id, body) =>
	User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
