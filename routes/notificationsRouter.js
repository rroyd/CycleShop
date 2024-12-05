const express = require("express");
const { handleAsync } = require("../errors/ExpressError");
const notifications = require("../controllers/notificationsController")

const router = express.Router({mergeParams: true});

router.route("/")
    .delete(handleAsync(notifications.destroy));

router.route("/:id")
    .delete(handleAsync(notifications.deleteOne))

module.exports = {router}