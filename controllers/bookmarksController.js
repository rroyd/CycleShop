const { User, Listing } = require("../models")

module.exports.create = async (req,res) => {
    const {userId} = req.params;

    const {id} = req.body.bookmark;
    const bookmark = await Listing.findById(id);
    const user = await User.findByIdAndUpdate(userId, {$addToSet: {bookmarks: bookmark}});

    req.flash("success", `Added ${bookmark.name} to your bookmarks`)
    res.redirect(`/listings/${id}`)
}

module.exports.destroy = async (req,res) => {
    const {userId} = req.params;

    const {id} = req.body.bookmark;
    const bookmark = await Listing.findById(id);

    const user = await User.findByIdAndUpdate(userId, {$pull: {bookmarks: {$in: [bookmark]}}});

    console.log(user)

    req.flash("info", `Removed ${bookmark.name} from your bookmarks`)
    res.redirect(`/listings/${id}`)
}