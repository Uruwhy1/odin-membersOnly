const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.signupForm);
router.post("/signup", authController.signup);
router.get("/login", authController.loginForm);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/member", authController.membershipForm);
router.post("/member", authController.getMembership);

module.exports = router;
