const mongoose = require("mongoose");

const { Listing } = require("./Listing");
const { User } = require("./User");

function connectDB() {
  const db = mongoose
    .connect("mongodb://localhost:27017/cycleshop")
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log("DB Error: " + e));

  return db;
}

module.exports = { connectDB, Listing, User };
