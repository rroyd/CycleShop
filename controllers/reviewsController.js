const {Review} = require("../models/Review")

module.exports.create = async (req,res) => { 
    const {userId: userTo} = req.params;

    const {rating = 1, body} = req.body.review
    const review = new Review({rating, body, userFrom: req.user._id, userTo});

    await review.save();

    req.flash("success", "Posted new review successfully")
    res.redirect(`/`);
}