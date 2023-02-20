import * as service from "../service/cards.js";
import { updateUser } from "../service/users.js";
import { Card } from "../service/schemas/card.js";

export const create = async (req, res, next) => {
	try {
		if (!req.body) return res.status(400).json({ message: "Bad request" });
		req.body.owner = req.user.id;
		const card = await service.createCard(req.body);
		const allCards = await service.getAllCards(req.user.id);
		await updateUser(req.user.id, {
			"userData.cards": [...allCards],
		});
		res.status(201).json({
			createdCard: card,
		});
	} catch (err) {
		next(err);
	}
};

export const edit = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!req.body || !req.params)
			return res.status(400).json({ message: "Bad request" });
		const card = await service.editCard(id, req.body);
		res.status(200).json({
			createdCard: card,
		});
	} catch (err) {
		next(err);
	}
};

export const getAll = async (req, res, next) => {
	try {
		const allCards = await service.getAllCards(req.user.id);
		res.status(201).json({ cards: allCards });
	} catch (err) {
		next(err);
	}
};

export const complete = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!req.params) return res.status(400).json({ message: "Bad request" });
		const card = await service.editCard(id, { status: "Complete" });
		res.status(200).json({
			createdCard: card,
		});
	} catch (err) {
		next(err);
	}
};

export const deleteOne = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!req.params) return res.status(400).json({ message: "Bad request" });
		const card = await service.deleteCard(id);
		if (!card) return res.status(400).json({ message: "Invalid cardID" });
		const allCards = await service.getAllCards(req.user.id);
		await updateUser(req.user.id, {
			"userData.cards": [...allCards],
		});
		res.status(204).json({ message: "Successfull operation" });
	} catch (err) {
		next(err);
	}
};
