import * as service from "../service/cards.js";
import { Card } from "../service/schemas/card.js";

export const create = async (req, res, next) => {
	try {
		const { title, difficulty, date, time, type } = req.body;
		const card = await service.createCard(req.body);
		res.status(201).json({
			createdCard: {
				title,
				difficulty,
				category: card.category,
				date,
				time,
				status: card.status,
				type,
				id: card.id,
			},
		});
	} catch (err) {
		next(err);
	}
};
