var express = require("express");
var router =express.Router();
var passport =require("passport");
var User =require("../models/user");
var Campground = require("../models/campground");
var middleware =require("../middleware")

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/search", function(req, res){

    res.render("search");
});
//show register form
router.get("/register", function(req, res){
    res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
              });

	if(req.body.adminCode === "secretcode123"){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user){
	if(err){	
		req.flash("error", err.message);
		res.redirect("/register")
	}
	passport.authenticate("local")(req, res, function(){
		req.flash("success", "Welcome to TastesGreat " + user.username);
		res.redirect("/campgrounds")
	});
});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
	req.flash("error", "You have to be logged in");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
								{successRedirect: "/campgrounds",
								 failureRedirect: "/login"
								}),function(req, res){
	
});
//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/");
});

router.get("/users/:id", middleware.checkProfileOwnership, function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/show", {user: foundUser, campgrounds: campgrounds});
    })
  });
});

router.get("/profile/:id",  function(req, res) {
	console.log
  User.findById(req.user._id, function(err, foundUser) {
    if(err) {
		console.log(req);
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/private", {user: foundUser, campgrounds: campgrounds});
    })
  });
});

router.get("/feed/:id", function(req, res){
    res.render("feed");
	});

module.exports = router;