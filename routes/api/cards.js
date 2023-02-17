import * as controller from "../../controller/users.js";
import { validateData } from "../../middlewares/validator.js";
import { userValidate } from "../../utils/validator.js";
import { auth } from "../../middlewares/authorizationJwt.js";

const router = express.Router();

export default router;
