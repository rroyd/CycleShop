const MongoStore = require("connect-mongo");
const {v4: uuidv4} = require("uuid")

module.exports = {
  //Session object
  sess: {
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: false,
    expires: Date.now() + 60 * 60 * 24 * 7,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/cycleshop",
      touchAfter: 60 * 60 * 24 * 7,
      crypto: {
        secret: "thisisabadsecret"
      }
    })
  },
  //Authentication object
  authConfig: {
    failureRedirect: "/login",
    failureFlash: true,
  },
  firebaseConfig: {
      bucketName: 'cycleshop',
      nameSuffix: uuidv4(),
      public: true
  }
};
