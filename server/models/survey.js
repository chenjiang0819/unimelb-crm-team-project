const Joi = require("joi");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: [
			"text",
			"radiogroup",
			"checkbox",
			"dropdown",
			"ranking",
			"boolean",
			"rating",
			"comment",
			"image",
			"html",
		],
		required: true,
		default: "text",
	},
	title: {
		type: String,
	},
	isRequired: Boolean,
	placeHolder: String,
	inputType: {
		type: String,
		enum: [
			"text",
			"email",
			"time",
			"date",
			"datetime",
			"week",
			"month",
			"password",
			"number",
			"tel",
			"range",
			"color",
			"url",
		],
		default: "text",
	},
	colCount: {
		type: Number,
		min: 1,
		max: 5,
	},
	choices: {
		type: [String],
		default: void 0,
	},
	label: String,
	labelTrue: String,
	labelFalse: String,
	showTitle: Boolean,
	rateMin: Number,
	rateMax: Number,
	rateStep: Number,
	minRateDescription: String,
	maxRateDescription: String,
	html: String,
	imageFit: String,
	imageHeight: Number,
	imageWidth: Number,
	imageLink: String,
});

const surveySchema = new mongoose.Schema(
	{
		creator: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			min: 5,
			max: 100,
		},
		description: {
			type: String,
			min: 5,
			max: 1000,
		},
		thumbnail: {
			type: String,
		},
		questions: {
			type: [questionSchema],
			required: true,
		},
		visible: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

function validateSurvey(survey, update = false) {
	const questionSchema = Joi.object({
		name: Joi.string().required(),
		type: Joi.string()
			.required()
			.valid(
				"text",
				"radiogroup",
				"checkbox",
				"dropdown",
				"ranking",
				"boolean",
				"rating",
				"comment",
				"image",
				"html",
			),
		title: Joi.alternatives().conditional("type", {
			is: Joi.string().valid("image", "html", "boolean"),
			then: Joi.string().allow(""),
			otherwise: Joi.string().min(5).max(100).required(),
		}),
		isRequired: Joi.bool().required(),
		placeHolder: Joi.alternatives().conditional("type", {
			is: Joi.string().valid("text", "comment"),
			then: Joi.string().allow(""),
			otherwise: Joi.forbidden(),
		}),
		inputType: Joi.alternatives().conditional("type", {
			is: "text",
			then: Joi.string()
				.required()
				.valid(
					"text",
					"email",
					"time",
					"date",
					"datetime",
					"week",
					"month",
					"password",
					"number",
					"tel",
					"range",
					"color",
					"url",
				),
			otherwise: Joi.forbidden(),
		}),
		colCount: Joi.alternatives().conditional("type", {
			is: Joi.string().valid("radiogroup", "checkbox"),
			then: Joi.number().required().min(1).max(5),
			otherwise: Joi.forbidden(),
		}),
		choices: Joi.alternatives().conditional("type", {
			is: Joi.string().valid(
				"radiogroup",
				"checkbox",
				"dropdown",
				"ranking",
			),
			then: Joi.array().items(Joi.string()).min(2).required(),
			otherwise: Joi.forbidden(),
		}),
		label: Joi.alternatives().conditional("type", {
			is: "boolean",
			then: Joi.string().min(1).max(100).required(),
			otherwise: Joi.forbidden(),
		}),
		labelTrue: Joi.alternatives().conditional("type", {
			is: "boolean",
			then: Joi.string().min(1).max(50).required(),
			otherwise: Joi.forbidden(),
		}),
		labelFalse: Joi.alternatives().conditional("type", {
			is: "boolean",
			then: Joi.string().min(1).max(50).required(),
			otherwise: Joi.forbidden(),
		}),
		showTitle: Joi.alternatives().conditional("type", {
			is: "boolean",
			then: Joi.bool().required(),
			otherwise: Joi.forbidden(),
		}),
		rateMin: Joi.alternatives().conditional("type", {
			is: "rating",
			then: Joi.number().required(),
			otherwise: Joi.forbidden(),
		}),
		rateMax: Joi.alternatives().conditional("type", {
			is: "rating",
			then: Joi.number().required().greater(Joi.ref("rateMin")),
			otherwise: Joi.forbidden(),
		}),
		rateStep: Joi.alternatives().conditional("type", {
			is: "rating",
			then: Joi.number().required().min(1),
			otherwise: Joi.forbidden(),
		}),
		minRateDescription: Joi.alternatives().conditional("type", {
			is: "rating",
			then: Joi.string().required().max(50),
			otherwise: Joi.forbidden(),
		}),
		maxRateDescription: Joi.alternatives().conditional("type", {
			is: "rating",
			then: Joi.string().required().max(50),
			otherwise: Joi.forbidden(),
		}),
		imageLink: Joi.alternatives().conditional("type", {
			is: "image",
			then: Joi.string().required(),
			otherwise: Joi.forbidden(),
		}),
		imageHeight: Joi.alternatives().conditional("type", {
			is: "image",
			then: Joi.number().required(),
			otherwise: Joi.forbidden(),
		}),
		imageWidth: Joi.alternatives().conditional("type", {
			is: "image",
			then: Joi.number().required(),
			otherwise: Joi.forbidden(),
		}),
		imageFit: Joi.alternatives().conditional("type", {
			is: "image",
			then: Joi.string()
				.required()
				.valid("none", "contain", "cover", "fill"),
			otherwise: Joi.forbidden(),
		}),
		html: Joi.alternatives().conditional("type", {
			is: "html",
			then: Joi.string().required(),
			otherwise: Joi.forbidden(),
		}),
	});

	const surveySchema = Joi.object({
		creator: Joi.string().required(),
		title: Joi.string().required().min(5).max(100),
		description: Joi.string().min(5).max(1000),
		thumbnail: Joi.string(),
		questions: Joi.array().required().items(questionSchema).min(1),
	});

	const updateSchema = Joi.object({
		creator: Joi.string(),
		title: Joi.string().min(5).max(100),
		description: Joi.string().min(5).max(1000),
		thumbnail: Joi.string(),
		questions: Joi.array().items(questionSchema).min(1),
		visible: Joi.bool(),
	});

	if (update) return updateSchema.validate(survey);

	return surveySchema.validate(survey);
}

const Survey = mongoose.model("Survey", surveySchema);

exports.Survey = Survey;
exports.validate = validateSurvey;
