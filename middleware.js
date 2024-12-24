const { Review } = require("./models/Review");

module.exports.checkReviewOwnership = async (req,res,next) => {
    const { reviewId } = req.params
    const review = await Review.findById(reviewId);

    if(req.user._id.equals(review.userFrom._id) || req.user._id.equals(review.userTo._id)) {
        return next();
    }
    
    req.flash("info", "Unauthorized to change review")
    res.redirect("/")
}