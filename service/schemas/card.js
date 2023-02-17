import { model, Schema } from "mongoose";

const cardSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			minLength: 2,
			maxLength: 100,
		},
		difficulty: {
			type: String,
			required: [true, "Choose difficulty of your task"],
			enum: ["Easy", "Normal", "Hard"],
			default: "Easy",
		},
		category: {
			type: String,
			enum: ["Stuff", "Family", "Health", "Learning", "Leisure", "Work"],
			default: "Stuff",
		},
		date: {
			type: String,
			required: [true, "Choose a date"],
		},
		time: {
			type: String,
		},
		type: {
			type: String,
			enum: ["Task", "Challenge"],
			required: [true, "Which type of task?"],
			default: "Task",
		},
		status: {
			type: String,
			enum: ["Complete", "Incomplete"],
			default: "Incomplete",
		},
		owner: { type: Schema.Types.ObjectId, ref: "user" },
	},
	{ versionKey: false, timestamp: true },
);

export const Card = model("card", cardSchema);
