import express from "express";
import * as controller from "../../controller/users.js";
import { validateData } from "../../middlewares/validator.js";
import { userValidate } from "../../utils/validator.js";
import { auth } from "../../middlewares/authorizationJwt.js";

const router = express.Router();

router.post("/register", validateData(userValidate), controller.register);

router.post("/login", validateData(userValidate), controller.login);

router.post("/logout", auth, controller.logout);

export default router;
