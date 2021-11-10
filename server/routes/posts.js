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
router.put("/:id/edit", validateObjectId, (req, res) =>
  controller.editPost(req, res)
);
router.put("/:id/comment", validateObjectId, (req, res) =>
  controller.addComments(req, res)
);
router.put("/:id/comments/:cid", validateObjectId, (req, res) =>
  controller.editComment(req, res)
);
router.delete("/:id", validateObjectId, (req, res) =>
  controller.deletePost(req, res)
);
router.delete("/:id/comments/:cid", validateObjectId, (req, res) =>
  controller.deleteComment(req, res)
);

module.exports = router;
