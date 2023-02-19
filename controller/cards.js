import * as service from "../service/cards.js";
import * as serviceUser from "../service/users.js";
import { Card } from "../service/schemas/card.js";

export const create = async (req, res, next) => {
	try {
		const user = await serviceUser.getUserById(req.user.id);
		req.body.owner = user.id;
		const card = await service.createCard(req.body);
		await serviceUser.updateUser(user.id, {
			"userData.cards": [...user.userData.cards, card.id],
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
		res.status(201).json({ cards: allCards.userData.cards });
	} catch (err) {
		next(err);
	}
};
