const express = require("express")
const auth = require("../controllers/authController")
const bookmarks = require("../controllers/bookmarksController")
const { handleAsync } = require("../errors/ExpressError")

//prefix: /users/{user_id}/bookmarks
const router = express.Router({mergeParams: true})

router.route("/")
    .post(auth.isAuthorized, handleAsync(bookmarks.create))
    .delete(auth.isAuthorized, handleAsync(bookmarks.destroy))

module.exports = {router}