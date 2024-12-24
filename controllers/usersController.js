const { User } = require("../models/User");
const { Notification } = require("../models/Notification");
const { Listing } = require("../models/Listing");
const { Review } = require("../models/Review");
const { Connection } = require("../models/Connection");

const {uploadImageToStorage} = require("./../firebase")


//Show all users
module.exports.index = async (req, res) => {
  const users = await User.find({});

  res.render("users/index", { users });
};

//Show specific user
module.exports.show = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.render("users/show", { user });
};

//Manage user logged page
module.exports.manage = async (req,res) => { 
  const {p = "notifications"} = req.query;

  const notifs = await Notification.find({notified: req.user._id});
  const listings = await Listing.find({seller: req.user._id})

  const userPopulated = await User.findById(req.user._id).populate("bookmarks");
  const bookmarks = userPopulated.bookmarks

  res.render("users/manage", {p, notifs, listings, bookmarks});
}

module.exports.showProfile = async (req,res) => {
  const {id} = req.params;

  const user = await User.findById(id)

  const userListings = await Listing.find({seller: id})

  const userReviews = await Review.find({userFrom: id}).populate("userFrom")

  let userFriends = await Connection.find({$and: [ { pair: { $all: [req.user._id] } }, {status: "Yes"} ] }).populate("pair");

  //Filter to only friends
  userFriends = userFriends.filter(c => {
    if(c.pair[0]._id.equals(req.user._id)) {
      c.pair = req.user
    }
    else c.pair = c.pair[1];
  })

  res.render("users/profile", {user, userListings, userReviews, userFriends});
}

//Edit user profile
module.exports.edit = async (req,res) => {
  const currentUser = await User.findById(req.user._id);

  const {biography} = req.body.user;
  const {showMap} = req.body;

  currentUser.biography = biography;

  if(req.file) {
    try{
      const url = await uploadImageToStorage(req.file, "userProfilePicture");
      currentUser.profilePic = url;

    } catch(err){
      req.flash("error", "Error updating profile: " + err)
      res.redirect(`/users/${req.user._id}/manage?p=editProfile`);
    }
  }
      
  await currentUser.save();
  req.flash("success", "Profile has been updated")
  res.redirect(`/users/${req.user._id}/manage?p=editProfile`);
}