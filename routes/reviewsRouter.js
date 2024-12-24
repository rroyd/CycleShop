const express = require("express")

const router = express.Router({mergeParams: true})
const reviews = require("../controllers/reviewsController");
const auth = require("../controllers/authController")
const { handleAsync } = require("../errors/ExpressError");
const validator = require("./../validations")

const {checkReviewOwnership} = require("./../middleware")


router.route("/")
    .post(auth.isAuthorized,validator('review'),handleAsync(reviews.create))

router.route("/:reviewId")
    .all(auth.isAuthorized, checkReviewOwnership)
    .put(handleAsync(reviews.edit))
    .delete(handleAsync(reviews.destroy))

module.exports = {router}