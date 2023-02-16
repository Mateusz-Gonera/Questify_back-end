import express from "express";
import * as controller from "../../controller/users.js";
import { validateData } from "../../middlewares/validator.js";
import { userValidate } from "../../utils/validator.js";

const router = express.Router();

router.post("/register", validateData(userValidate), controller.register);

export default router;