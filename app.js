import express from "express";
import logger from "morgan";
import cors from "cors";
import usersRouter from "./routes/api/users.js";
import cardsRouter from "./routes/api/cards.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", usersRouter);

app.use("/card", cardsRouter);

app.use((_, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: `That site doesn't exist`,
		data: "Not found",
	});
});

app.use((err, _, res, __) => {
	console.log(err.stack);
	res.status(500).json({
		status: "fail",
		code: 500,
		message: err.message,
		data: "Internal Server Error",
	});
});

export default app;
