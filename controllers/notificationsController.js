const {Notification} = require("./../models/Notification")

module.exports.index = async (req,res,next) => {
    res.locals.userNotifications = await Notification.find({userTo: req.user}).populate("userTo").populate("userFrom")
    console.log(res.locals.userNotifications)
    return next();
}

//Clear all notifications
module.exports.destroy = async(req,res) => {
    await Notification.deleteMany({});

    res.redirect(`/users/${req.user._id}/manage`)
}

//Clear one notification
module.exports.deleteOne = async (req,res) => {
    const {id} = req.params;

    await Notification.findByIdAndDelete(id);

    // req.flash("success", "Cleared notification");
    res.redirect(`/users/${req.user._id}/manage`)
}