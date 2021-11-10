const mongoose = require("mongoose");
const Joi = require("joi");
const { commentSchema, commentValidationSchema } = require("./comment");
const { historySchema, historyValidationSchema } = require("./history");

const authorSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		required: true,
	},
});

const postSchema = new mongoose.Schema(
	{
		author: {
			type: authorSchema,
			required: true,
		},
		title: {
			type: String,
			required: true,
			min: 5,
			max: 100,
		},
		content: {
			type: String,
			required: true,
			min: 5,
			max: 1000,
		},
		views: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		solved: {
			type: Boolean,
			required: true,
			default: false,
		},
		followers: {
			type: [String],
			default: [],
		},
		comments: {
			type: [commentSchema],
			default: [],
		},
		history: {
			type: [historySchema],
			default: [],
		},
	},
	{
		timestamps: true,
	},
);

const Post = mongoose.model("Posts", postSchema);

function validatePost(post, update = false) {
	const creationSchema = Joi.object({
		author: Joi.object({
			uid: Joi.string().required(),
			name: Joi.string().required(),
			picture: Joi.string().required(),
		}).required(),
		title: Joi.string().required().min(5).max(100),
		content: Joi.string().required().min(5).max(1000),
	});

	const updateSchema = Joi.object({
		author: Joi.object({
			uid: Joi.string().required(),
			name: Joi.string().required(),
			picture: Joi.string().required(),
		}),
		title: Joi.string().min(5).max(100),
		content: Joi.string().min(5).max(1000),
		views: Joi.number().min(0),
		solved: Joi.boolean(),
		followers: Joi.array().items(Joi.string()),
		comments: Joi.array().items(commentValidationSchema),
		history: Joi.array().items(historyValidationSchema),
	});

	if (update) return updateSchema.validate(post);

	return creationSchema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;
