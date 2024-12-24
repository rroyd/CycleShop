const { Listing } = require("../models/Listing");
const { Review } = require("../models/Review");

const {uploadImageToStorage, uploadImagesToStorage} = require("./../firebase")



//View all listings
module.exports.index = async (req, res) => {
  const listings = await Listing.find({});

  res.render("listings/index", { listings });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;

  //Load listing
  const listing = await Listing.findById(id).populate("seller");
  //Load all similar listings
  const listings = await Listing.find({});
  //Load seller reviews
  const reviews = await Review.find({userTo: listing.seller._id}).populate("userFrom")

  console.log(reviews)

  res.render("listings/show", {listings, listing, reviews});
};


module.exports.destroy = async (req,res) => {
  const {id} = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("info", "Listing deleted successfully");
  res.redirect("back");
}

module.exports.search = async (req, res) => {
  const {q, p} = req.query;

  res.send(`Search query: ${q}, Page: ${p}`)
}

module.exports.createForm =  (req,res) => {
  res.render("listings/create")
}

module.exports.create = async (req,res) => {
  const timeCreated = new Date();

  let urls;

  if(req.files) {
    try{
      urls = await uploadImagesToStorage(req.files, "listing")
    } catch(err){
      req.flash("error", "Error, can't create listing: " + err)
      return res.redirect("back");
    }
  }

  const listing = new Listing({...req.body.listing, seller: req.user._id, photos: urls, timeCreated});
  await listing.save()

  req.flash("success", "Listing posted successfully!")
  res.redirect('/listings');

}
