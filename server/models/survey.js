const Joi = require('joi');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	index: {
		type: Number,
		required: true,
	},
	questionType: {
		type: String,
		enum: ['short answer', 'single choice', 'multiple choice'],
		required: true,
		default: 'short answer',
	},
	question: {
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
		subTitle: {
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
		index: Joi.number().min(0).required(),
		questionType: Joi.string()
			.required()
			.valid('short answer', 'single choice', 'multiple answer'),
		question: Joi.string().required().min(5).max(100),
		choices: Joi.alternatives().conditional('questionType', {
			is: 'short answer',
			then: Joi.forbidden(),
			otherwise: Joi.array().items(Joi.string()).min(2).required(),
		}),
		image: Joi.string(),
	});

	const surveySchema = Joi.object({
		creator: Joi.string().required(),
		title: Joi.string().required().min(5).max(100),
		subTitle: Joi.string().min(5).max(100),
		thumbnail: Joi.string(),
		questions: Joi.array().required().items(questionSchema).min(1),
	});

	const updateSchema = Joi.object({
		creator: Joi.string(),
		title: Joi.string().min(5).max(100),
		subTitle: Joi.string().min(5).max(100),
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
