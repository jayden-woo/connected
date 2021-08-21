const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const responseSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  response: {
    type: String,
    required: true,
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
    index: Joi.number().required().min(0),
    response: Joi.string().required().min(0).max(200),
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
