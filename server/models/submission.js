const mongoose = require("mongoose");

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
  response: {
    type: [responseSchema],
    required: true,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = { Submission };
