const Joi = require("joi");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  questionType: {
    type: String,
    enum: ["short answer", "multiple choice", "multiple answer"],
    required: true,
    default: "short answer",
  },
  question: {
    type: String,
    required: true,
  },
  choices: [String],
});

const surveySchema = new mongoose.Schema({
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
  questions: {
    type: [questionSchema],
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  visible: {
    type: Boolean,
    required: true,
    default: true,
  },
});

function validateSurvey(survey, update = false) {
  const questionSchema = Joi.object({
    index: Joi.number().min(0).required(),
    questionType: Joi.string()
      .required()
      .valid("short answer", "multiple choice", "multiple answer"),
    question: Joi.string().required().min(5).max(100),
    choices: Joi.alternatives().conditional("questionType", {
      is: "short answer",
      then: Joi.forbidden(),
      otherwise: Joi.array()
        .items(Joi.string(), Joi.number())
        .min(2)
        .required(),
    }),
  });

  const surveySchema = Joi.object({
    creator: Joi.string().required(),
    title: Joi.string().required().min(5).max(100),
    questions: Joi.array().required().items(questionSchema).min(1),
  });

  const updateSchema = Joi.object({
    creator: Joi.string(),
    title: Joi.string().min(5).max(100),
    questions: Joi.array().items(questionSchema).min(1),
    visible: Joi.bool(),
  });

  if (update) return updateSchema.validate(survey);

  return surveySchema.validate(survey);
}

const Survey = mongoose.model("Survey", surveySchema);

exports.Survey = Survey;
exports.validate = validateSurvey;
