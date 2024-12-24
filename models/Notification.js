const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const {format, register} = require("timeago.js")
const {localeFunc} = require("../services/timeAgo")

register("my-locale", localeFunc);

const notificationSchema = new Schema({
    type: {
      type: String,
      enum: ["Friend Request", "New Review", "New Offer", "User Purchased"],
      required: true
    },
    description: {
      type: String, 
      required: true
    },
    url: {
      type: String,
      required: true
    },
    userFrom: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    },
    userTo: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    },
    listing: {
      type: Schema.ObjectId,
      ref: "Listing"
    },
    timeCreated: {
      type: Date,
      required: true
    }
  })

notificationSchema.virtual("timeAgo").get(function() {
  return format(this.timeCreated, "my-locale");
})

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = {Notification}