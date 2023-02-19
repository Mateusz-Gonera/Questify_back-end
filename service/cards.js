import { Card } from "./schemas/card.js";
import { User } from "./schemas/user.js";

export const createCard = async (body) => Card.create(body);

export const getCard = async (body) => Card.findOne(body);

export const editCard = async (id, body) =>
	Card.findByIdAndUpdate(id, body, { new: true, runValidators: true });

export const getAllCards = async (id) =>
	User.findById(id).populate("userData.cards");
