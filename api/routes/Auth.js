const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  profile,
} = require("../controller/userAuthController");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").get(logoutUser);
router.route("/profile").get(profile);

module.exports = router;
