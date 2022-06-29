var express = require("express");
var router =express.Router();
var passport =require("passport");
var User =require("../models/user");
var Recipe = require("../models/recipe");
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
		res.redirect("/recipes")
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
								{successRedirect: "/recipes",
								 failureRedirect: "/login"
								}),function(req, res){
	
});
//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/");
});

router.get("/rezepte/:id", middleware.isLoggedIn, function(req, res){
Recipe.find({"author.id": req.user._id} , function(err, allRecipes){
	res.render("users/meinerezepte", {recipes:allRecipes})
	
});
});

// Update Profil
router.put("/users/:id", middleware.checkProfileOwnership, function(req, res){
	//find and update the correct recipes
	User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedProfil){
		if(err){
			res.redirect("/recipes")
		} else {
			res.redirect("/users/" + req.params.id)
		}
	})
})


router.get("/users/:id", middleware.checkProfileOwnership, middleware.isLoggedIn, function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    Recipe.find().where('author.id').equals(foundUser._id).exec(function(err, recipes) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/show", {user: foundUser, recipes: recipes});
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
    Recipe.find().where('author.id').equals(foundUser._id).exec(function(err, recipes) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/private", {user: foundUser, recipes: recipes});
    })
  });
});

router.get("/feed/:id", function(req, res){
    res.render("feed");
	});

module.exports = router;