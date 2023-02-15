import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connection
	.then(() => {
		app.listen(PORT, async () => {
			console.log("\nDatabase connection successful.");
			console.log(`Use our API on port: ${PORT}\n`);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});
