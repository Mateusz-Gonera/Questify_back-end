import { Card } from "./schemas/card.js";

export const createCard = async (body) => Card.create(body);

export const getCard = async (body) => Card.findOne(body);
