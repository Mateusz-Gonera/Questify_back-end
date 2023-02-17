import express from "express";
import * as controller from "../../controller/cards.js";
import { validateData } from "../../middlewares/validator.js";
import { cardValidate } from "../../utils/validator.js";
import { auth } from "../../middlewares/authorizationJwt.js";

const router = express.Router();

router.post("/", auth, validateData(cardValidate), controller.create);

export default router;
