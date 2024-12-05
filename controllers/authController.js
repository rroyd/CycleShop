const { User } = require("../models/User");

//Render register form
module.exports.registerForm = (req, res) => {
  console.log("Hello");
  res.render("auth/register");
};
//Render login form
module.exports.loginForm = async (req, res) => {
  res.render("auth/login");
};
//Login user (after authentication)
module.exports.login = async (req, res) => {
  console.log(req.user)
  req.flash("info", "Welcome back, " + req.user.username);
  res.redirect("/");
};
//Register user
module.exports.register = async (req, res) => {
  const geometry = {
    type: "Point",
    coordinates: [50,50]
  }

  const {user, password} = req.body

  const userRegistered = await User.register({...user, geometry}, password)

  req.login(userRegistered, function(err) {
    if(err) {
      return next(err);
    }

    req.flash("success", "Successfully registered to CycleShop")
    res.redirect("/")
  });
};

module.exports.logout = (req,res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }

    req.flash("info", "Successfully logged out from CycleShop")
    res.redirect("/")
  })
}

module.exports.isAuthorized = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.flash("info", "You must be signed in to continue");
  res.redirect("/login");
};
