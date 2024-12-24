const express = require("express");
const users = require("../controllers/usersController");
const { handleAsync } = require("../errors/ExpressError");
const auth = require("../controllers/authController");
const validator = require("../validations");

const Multer = require("multer")

const router = express.Router({ mergeParams: true });

const upload = Multer({storage: Multer.memoryStorage()})

//Show users,Show users register form, Create a new user
router
  .route("/")
  .get(handleAsync(users.index))
  .get(handleAsync(users.createForm))
  .post(handleAsync(auth.register));

//Show user, edit user, delete user
router
  .route("/:id")
  .get(handleAsync(users.show))
  .put(auth.isAuthorized,upload.single("profilePicture"),handleAsync(users.edit))
  .delete(auth.isAuthorized,handleAsync(users.destroy));

router.get("/:id/profile", handleAsync(users.showProfile))

router.get("/:id/manage",auth.isAuthorized, handleAsync(users.manage))

module.exports = { router };
