const express = require("express");
const {
  getPosts,
  registerPost,
  allowed,
  getPostById,
} = require("../controller/postController");
const verfyToken = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(getPosts);
router.route("/registerpost").post(verfyToken, registerPost);
router.route("/allowed").get(verfyToken, allowed);
router.route("/:id").get(verfyToken, getPostById);

module.exports = router;
