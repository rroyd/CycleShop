const {Review} = require("../models/Review")

module.exports.create = async (req,res) => { 
    const {userId: userTo} = req.params;

    const {id} = req.body;

    const {rating = 1, body} = req.body.review
    const review = new Review({rating, body, userFrom: req.user._id, userTo, timeCreated: Date.now()});

    await review.save();

    req.flash("success", "Posted new review successfully")
    res.redirect("back");
}
//Edit review
module.exports.edit = async (req,res) => {
    const {reviewId} = req.params;
    const {body} = req.body.review;

    await Review.findByIdAndUpdate(reviewId, { $set: { body } });

    req.flash("success", "Review updated successfully");
    res.redirect('back')
}
//Delete review
module.exports.destroy = async (req,res) => {
    const {reviewId} = req.params;

    await Review.findByIdAndDelete(reviewId);

    req.flash("info", "Review deleted successfully");

    res.redirect('back')
}