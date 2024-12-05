const express = require("express");
const connections = require("./../controllers/connectionsController")
const auth = require("./../controllers/authController")
const { handleAsync } = require("../errors/ExpressError");

const router =  express.Router({mergeParams: true});

//Send connections
router.route("/")
    .post(auth.isAuthorized, handleAsync(connections.create))

//Cancel/Reject/Delete connections
router.route("/:id")
    .delete(auth.isAuthorized, handleAsync(connections.destroy))

module.exports = {router}