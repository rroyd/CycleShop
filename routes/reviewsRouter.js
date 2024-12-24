const express = require("express")

const router = express.Router({mergeParams: true})
const reviews = require("../controllers/reviewsController");
const auth = require("../controllers/authController")
const { handleAsync } = require("../errors/ExpressError");
const validator = require("./../validations")

const {checkReviewOwnership} = require("./../middleware")


router.route("/")
    .post(auth.isAuthorized,validator('review'),handleAsync(reviews.create))

router.route("/:id")
    .put(auth.isAuthorized, validator('review'), handleAsync(reviews.edit))
    .delete(auth.isAuthorized, checkReviewOwnership, handleAsync(reviews.destroy))

module.exports = {router}