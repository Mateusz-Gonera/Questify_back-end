import { User } from "./schemas/user.js";

export const getUser = async (body) => User.findOne(body);
