const express = require("express");
const {
  registerUser,
  LoginUser,
  verifyOtp,
  updateProfile,
  getUserAllData,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("hello");
});

router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/otp/verify").post(verifyOtp);
router.route("/update/profile").patch(isAuthenticated, updateProfile);
router.route("/getuserinfo/:id").get(isAuthenticated, getUserAllData);
router;

module.exports = router;
