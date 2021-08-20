const express = require("express");
const router = express.Router();
const controller = require("../controllers/submissions");

router.get("/", (req, res) => controller.getAllSubmissions(req, res));
router.get("/:id", (req, res) => controller.getSubmissionByID(req, res));
router.post("/", (req, res) => controller.addSubmission(req, res));

module.exports = router;
