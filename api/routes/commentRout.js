const express = require("express");

const verfyToken = require("../middleware/verifyToken");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controller/commentController");
const router = express.Router();

router.route("/addcomment").post(verfyToken, addComment);
router.route("/:id").get(verfyToken, getComments);
router.route("/:id").delete(verfyToken, deleteComment);

module.exports = router;
