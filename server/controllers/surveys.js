const { Survey, validate } = require("../models/survey");

const getAllSurveys = async (req, res) => {
	const surveys = await Survey.find().select("-questions").sort("-updatedAt");
	res.send(surveys);
};

const getSurveyByID = async (req, res) => {
	const survey = await Survey.findById(req.params.id);

	if (!survey)
		return res
			.status(404)
			.send("The survey with the given ID was not found.");

	res.send(survey);
};

const addSurvey = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0]);

	const survey = new Survey({
		creator: req.body.creator,
		title: req.body.title,
		description: req.body.description,
		thumbnail: req.body.thumbnail,
		questions: req.body.questions,
	});
	await survey.save();

	res.send(survey);
};

const updateSurvey = async (req, res) => {
	const { error } = validate(req.body, true);
	if (error) return res.status(400).send(error.details[0]);

	const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	if (!survey)
		return res
			.status(404)
			.send("The survey with the given ID was not found.");

	res.send(survey);
};

module.exports = { getAllSurveys, getSurveyByID, addSurvey, updateSurvey };
