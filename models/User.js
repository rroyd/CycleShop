const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const {Review} = require("./Review");
const {Notification} = require("./Notification");
const Schema = mongoose.Schema;

const geometrySchema = new Schema({
  type: {
    type: String
  },
  coordinates: [Number]
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  geometry: geometrySchema,
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phoneAlt: {
    type: String,
  },
  bookmarks: {
    type: [Schema.ObjectId],
    ref: "Listing",
    default: []
  },
  profilePic: {
    type: String

  }
});

userSchema.plugin(passportLocalMongoose);

// //Middleware
// userSchema.post("findOneAndUpdate", function(elem, next) {
//   console.log(elem);
//   return next();
// })

//Instance methods


const User = mongoose.model("User", userSchema);

module.exports = { User };
