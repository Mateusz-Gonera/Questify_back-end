import express from "express";
import logger from "morgan";
import cors from "cors";
import usersRouter from "../routes/api/users.js";
import cardsRouter from "../routes/api/cards.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.connect(uriDb, () => {
	console.log("\nDatabase connection successful.\n");
});

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("/.netlify/functions/app/auth", usersRouter);
app.set("/.netlify/functions/app/card", cardsRouter);

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
export const handler = serverless(app);
