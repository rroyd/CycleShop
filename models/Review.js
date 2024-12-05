const { required, not } = require("joi");
const mongoose = require("mongoose");
const {Notification} = require("../models/Notification")
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1, 
        max: 5,
        default: 1,
        required: true,
    },
    body: {
        type: String
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
    }
})

//Middleware for notifications
reviewSchema.post("save", async function(review, next) {
    review = await review.populate("userFrom")

    const notification = new Notification({
        type: "New Review",
        description: `New review on your profile by "${review.userFrom.username}"`,
        url: `/${review.userTo}/profile#${review._id}`,
        userFrom: review.userFrom._id,
        userTo: review.userTo
    })

    await notification.save();

    return next();
});


const Review = mongoose.model("Review", reviewSchema);

module.exports = {Review}