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
  questions: {
    type: [questionSchema],
    required: true,
    validate: [arraySize, "Invalid number of questions"],
  },
});

const arraySize = (arr) => {
  return arr.length > 0;
};

const Survey = mongoose.model("Survey", surveySchema);

module.exports = { Survey };
