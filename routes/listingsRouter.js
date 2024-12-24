const express = require("express");
const { handleAsync } = require("../errors/ExpressError");
const listings = require("../controllers/listingsController");
const auth = require("../controllers/authController");
const validator = require("../validations");
const {storage} = require("../firebase");

const multer = require("multer")
const upload = multer({storage});

const router = express.Router({ mergeParams: true });

//Show all listings
//Create listing
router
  .route("/")
  .get(handleAsync(listings.index))
  .post(auth.isAuthorized,
    upload.array('photos'),
    validator('listing'),
    handleAsync(listings.create));

//Search for listings
router.get("/search", handleAsync(listings.search));

//Create a listing
router.get("/create",auth.isAuthorized, handleAsync(listings.createForm));

//Show one listing
router
  .route("/:id")
  .get(handleAsync(listings.show))
  .put(validator("listing"),handleAsync(listings.edit))
  .delete(handleAsync(listings.destroy));



module.exports = { router };
