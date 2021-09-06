const Joi = require('joi');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ['text', 'radiogroup', 'checkbox'],
		required: true,
		default: 'text',
	},
	title: {
		type: String,
		required: true,
	},
	choices: {
		type: [String],
		default: void 0,
	},
	image: {
		type: String,
	},
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
			max: 100,
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
		type: Joi.string().required().valid('text', 'radiogroup', 'checkbox'),
		title: Joi.string().required().min(5).max(100),
		choices: Joi.alternatives().conditional('type', {
			is: 'text',
			then: Joi.forbidden(),
			otherwise: Joi.array().items(Joi.string()).min(2).required(),
		}),
		image: Joi.string(),
	});

	const surveySchema = Joi.object({
		creator: Joi.string().required(),
		title: Joi.string().required().min(5).max(100),
		description: Joi.string().min(5).max(100),
		thumbnail: Joi.string(),
		questions: Joi.array().required().items(questionSchema).min(1),
	});

	const updateSchema = Joi.object({
		creator: Joi.string(),
		title: Joi.string().min(5).max(100),
		description: Joi.string().min(5).max(100),
		thumbnail: Joi.string(),
		questions: Joi.array().items(questionSchema).min(1),
		visible: Joi.bool(),
	});

	if (update) return updateSchema.validate(survey);

	return surveySchema.validate(survey);
}

const Survey = mongoose.model('Survey', surveySchema);

exports.Survey = Survey;
exports.validate = validateSurvey;
