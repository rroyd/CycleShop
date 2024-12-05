const {getApp, initializeApp} = require("firebase/app")
const {getStorage} = require("firebase/storage");
const { firebaseConfig } = require("../config");
require("dotenv").config()

initializeApp(firebaseConfig)

const firebaseApp = getApp();

const storage = getStorage(firebaseApp, process.env.FIREBASE_URL)

module.exports = {storage}