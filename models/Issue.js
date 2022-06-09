import { Schema, models, model } from "mongoose";

const IssueSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please Add Your Name."],
		trim: true,
		maxlength: [30, "Name Cannot Exceed 30 Characters."],
	},
	email: {
		type: String,
		required: [true, "Please Add Your Email."],
		trim: true,
		maxlength: [30, "Email Cannot Exceed 30 Characters."],
	},
	category: {
		type: String,
		required: [true, "Please Add Your Category."],
		trim: true,
		maxlength: [20, "Category Cannot Exceed 20 Characters."],
	},
	issue: {
		type: String,
		required: [true, "Please Add Your Issue."],
		trim: true,
	},
});

export default models.Issue || model("Issue", IssueSchema);
