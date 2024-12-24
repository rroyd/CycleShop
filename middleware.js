module.exports.checkReviewOwnership = (req,res,next) => {
    if(req.user._id.equals(req.body.userFrom) || req.user._id.equals(req.body.userTo)) {
        return next();
    }
    req.flash("info", "Unauthorized to change review")
    res.redirect("/")
}