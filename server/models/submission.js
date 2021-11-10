const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const responseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	response: {
		type: mongoose.Schema.Types.Mixed,
	},
});

const submissionSchema = new mongoose.Schema({
	survey: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Survey",
	},
	responses: {
		type: [responseSchema],
		required: true,
	},
});

function validateSubmission(submission) {
	const responseSchema = Joi.object({
		name: Joi.string().required(),
		response: Joi.alternatives().try(
			Joi.string(),
			Joi.number(),
			Joi.bool(),
			Joi.array().items(Joi.string()),
		),
	});

	const submissionSchema = Joi.object({
		survey: Joi.objectId().required(),
		responses: Joi.array().items(responseSchema).required().min(1),
	});

	return submissionSchema.validate(submission);
}

const Submission = mongoose.model("Submission", submissionSchema);

exports.Submission = Submission;
exports.validate = validateSubmission;
