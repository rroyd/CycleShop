const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  type: {
    type: String
  },
  coordinates: [Number],
});

const offerSchema = new Schema({
  from: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  body: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  }
})

const listingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
  },  
  arrivalType: {
    type: String,
    enum: ["Self Pickup", "Ship to home", "Ship to Point"]
  },
  visibility: {
    type: String,
    enum: ["Active", "Sold", "Private"]
  },
  category: {
    type: [String],
    length: 2
  },
  sold: {
    type: Boolean,
    default: false,
  },
  seller: {
    type: Schema.ObjectId,
    ref: "User",
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  photos: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 0
  },
  offers: [offerSchema],
  geometry: {
    type: locationSchema,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = { Listing };
