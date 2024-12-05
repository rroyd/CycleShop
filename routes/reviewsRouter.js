const express = require("express")

const router = express.Router({mergeParams: true})
const reviews = require("../controllers/reviewsController");
const auth = require("../controllers/authController")
const { handleAsync } = require("../errors/ExpressError");
const validator = require("./../validations")


router.route("/")
    .post(auth.isAuthorized,validator('review'),handleAsync(reviews.create))

module.exports = {router}