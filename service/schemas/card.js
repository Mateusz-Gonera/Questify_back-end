import { model, Schema } from "mongoose";

const cardSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			unique: true,
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
		},
		time: {
			type: String,
		},
		type: {
			type: String,
			enum: ["Task", "Challenge"],
			required: [true, "Task or Challenge?"],
			default: "Task",
		},
		owner: {},
	},
	{ versionKey: false, timestamp: true },
);
