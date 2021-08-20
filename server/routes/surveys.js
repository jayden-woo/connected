const express = require("express");
const router = express.Router();
const controller = require("../controllers/surveys");

router.get("/", (req, res) => controller.getAllSurveys(req, res));
router.get("/:id", (req, res) => controller.getSurveyByID(req, res));
router.post("/", (req, res) => controller.addSurvey(req, res));
router.put("/:id", (req, res) => controller.updateSurvey(req, res));

module.exports = router;
