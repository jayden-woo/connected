const getAllSubmissions = (req, res) => {
  res.send("all submissions");
};

const getSubmissionByID = (req, res) => {
  res.send(`Submission of id ${req.params.id}`);
};

const addSubmission = (req, res) => {
  res.send("add a Submission");
};

module.exports = { getAllSubmissions, getSubmissionByID, addSubmission };
