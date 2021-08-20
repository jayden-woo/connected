const getAllSurveys = (req, res) => {
  res.send("all surveys");
};

const getSurveyByID = (req, res) => {
  res.send(`survey of id ${req.params.id}`);
};

const addSurvey = (req, res) => {
  res.send("add a Survey");
};

const updateSurvey = (req, res) => {
  res.send(`update survey ${req.params.id}`);
};

module.exports = { getAllSurveys, getSurveyByID, addSurvey, updateSurvey };
