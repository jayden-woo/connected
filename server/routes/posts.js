const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", (req, res) => controller.getAllPosts(req, res));
router.get("/:id", validateObjectId, (req, res) =>
  controller.getPostByID(req, res)
);
router.post("/", (req, res) => controller.addPost(req, res));
router.put("/:id", validateObjectId, (req, res) =>
  controller.updatePost(req, res)
);
router.delete("/:id", validateObjectId, (req, res) =>
  controller.deletePost(req, res)
);

module.exports = router;
