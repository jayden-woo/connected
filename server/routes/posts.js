const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");

router.get("/", (req, res) => controller.getAllPosts(req, res));
router.get("/:id", (req, res) => controller.getPostByID(req, res));
router.post("/", (req, res) => controller.addPost(req, res));
router.put("/:id", (req, res) => controller.updatePost(req, res));
router.delete("/:id", (req, res) => controller.deletePost(req, res));

module.exports = router;
