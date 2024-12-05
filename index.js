if(process.env.NODE_ENV !== "production") {
   require("dotenv").config();
} 

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const ejsMate = require("ejs-mate");

const cookieParser = require("cookie-parser")
const session = require("express-session");
const flash = require("connect-flash");

const methodOverride = require("method-override");

//Passport for user authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");

//Config objects
const { sess } = require("./config");

const { connectDB, Listing, User } = require("./models");
const { router: listingRouter } = require("./routes/listingsRouter");
const { router: usersRouter } = require("./routes/usersRouter");
const { router: authRouter } = require("./routes/authRouter");
const { router: reviewRouter } = require("./routes/reviewsRouter");
const { router: bookmarksRouter } = require("./routes/bookmarksRouter")
const {router: notificationsRouter} = require("./routes/notificationsRouter")
const {router: connectionRouter} = require("./routes/connectionRouter")

const { ExpressError } = require("./errors/ExpressError");

const notifications = require("./controllers/notificationsController")

const app = express();

//Connect to database
connectDB();

//for template rendering engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

//MIDDLEWARE
//Logging requests to console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}
//Reading urlencoded form requests and multiform data
app.use(express.urlencoded({ extended: true }));
//Serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
//Session
app.use(session(sess));
app.use(cookieParser("thisismysecret"))
//Flash messages (req.flash))
app.use(flash());
//Passport
app.use(passport.initialize());
app.use(passport.session())
//User authentication passport
passport.use(new LocalStrategy(User.authenticate()));
//Session handling
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Attaching user and flashes to response object
app.use((req, res, next) => {
  res.locals.userLogged = req.user;
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  res.locals.success = req.flash("success")
  next();
});

app.use((req,res,next) => {
    if(req.baseUrl !== "/connections") { 
      req.redirectTo = req.originalUrl;
    }
    next()
})

//Get notifications
app.use(notifications.index)

//Home route
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", authRouter);

app.use("/users", usersRouter);

app.use("/listings", listingRouter);

app.use("/users/:userId/reviews", reviewRouter)

app.use("/users/:userId/bookmarks", bookmarksRouter)

app.use("/notifications", notificationsRouter)

app.use("/connections", connectionRouter)

//Error catching
//Page not found
app.use((req, res) => {
  throw new ExpressError("Page not found", 404);
});
//Redirecting to home page
app.use((err, req, res, next) => {
  const { message, status = 500 } = err;

  req.flash("error", message, status);
  res.status(status).redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
