const express = require("express");
const auth = require("../controllers/authController");
const { handleAsync } = require("../errors/ExpressError");
const passport = require("passport");
const { authConfig } = require("../config");

const router = express.Router({ mergeParams: true });

//Register
router.route("/register").get(handleAsync(auth.registerForm));
//Login form
router
  .route("/login")
  .get(handleAsync(auth.loginForm))
  .post(passport.authenticate("local", authConfig), handleAsync(auth.login));

router.get("/logout", auth.logout)

module.exports = { router };
