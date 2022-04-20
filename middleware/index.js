
var Recipe = require("../models/recipe");
var Comment =require("../models/comment");
var User =require("../models/user")
var middlewareObj ={};
middlewareObj.checkRecipeOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Recipe.findById(req.params.id, function(err, foundRecipe){
			if(err){
				req.flash("error", "recipe not found")
				res.redirect("back");
			} else {
			
				if(foundRecipe.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
				}else {
					req.flash("error", "You dont have permission to do that")
					res.redirect("back");
				}
			}
		});
	}else {
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
	}
	
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found")
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
				}else {
					req.flash("error", "You don't have Permission to do that")
					res.redirect("back");
				}
			}
		});
	}else {
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that")
	res.redirect("/login");
}

middlewareObj.checkProfileOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		User.findById(req.params.id, function(err, foundUser){
			if(err){
				req.flash("error", "User not found")
				res.redirect("back");
			} else {
			
				if(foundUser._id.equals(req.user._id) || req.user.isAdmin){
					next();
				}else {
					req.flash("error", "You dont have permission to do that, this is the public Profile")
console.log(req.user._id);
console.log(foundUser._id);
					
res.redirect("/profile/:id");
				}
			}
		});
	}else {
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
	}
	
}

module.exports = middlewareObj;
