import express from "express";
import * as controller from "../../controller/cards.js";
import { validateData } from "../../middlewares/validator.js";
import { cardValidate } from "../../utils/validator.js";
import { auth } from "../../middlewares/authorizationJwt.js";

const router = express.Router();

router.post("/", auth, validateData(cardValidate), controller.create);

router.patch("/:id", auth, controller.edit);

router.get("/", auth, controller.getAll);

router.patch("/complete/:id", auth, controller.complete);

router.delete("/:id", auth, controller.deleteOne);

export default router;
