const { Submission, validate } = require("../models/submission");

const getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find();
  res.send(submissions);
};

const getSubmissionByID = async (req, res) => {
  const submission = await Submission.findById(req.params.id);

  if (!submission)
    res.status(404).send("The submission with the given ID was not found.");

  res.send(submission);
};

const addSubmission = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0]);

  const submission = new Submission({
    survey: req.body.survey,
    responses: req.body.responses,
  });
  await submission.save();

  res.send(submission);
};

module.exports = { getAllSubmissions, getSubmissionByID, addSubmission };
