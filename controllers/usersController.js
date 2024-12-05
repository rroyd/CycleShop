const { User } = require("../models/User");
const { Notification } = require("../models/Notification");
const { Listing } = require("../models/Listing");
const { Review } = require("../models/Review");
const { Connection } = require("../models/Connection");


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