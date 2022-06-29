var express = require("express");
var router =express.Router();
var Recipe =require("../models/recipe");
var middleware =require("../middleware")
const Zutat = require("../models/zutat");
const Zutaten = [];


//NEw show form to create new recipe
router.get("/new", middleware.isLoggedIn, (req, res) => {
	
// Zutat.find({}, (err, zutaten) => {
res.render("recipes/neu", {Zutaten: Zutaten});

});



//Index Show all recipes
router.get("/", function(req, res){
	if(req.isAuthenticated()){
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all recipes from DB
        recipe.find({title: regex}, function(err, allRecipes){
           if(err){
               console.log(err);
           } else {
              if(allRecipes.length < 1) {
                  req.flash("error", "No recipes match that query, please try again.");
				  return res.redirect("back");
						
              }
			  
              res.render("recipes/index",{recipes:allRecipes});
           }
        });
    } else {	
	Recipe.find({$or:[{isOnline: true}, {"author.id": req.user._id}]} , function(err, allRecipes){
				  if(err){
		console.log(err);}else {
					res.render("recipes/index", {recipes:allRecipes});
}
								  });
	}
} else {
		  if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all recipes from DB
        Recipe.find({title: regex}, function(err, allRecipes){
           if(err){
               console.log(err);
           } else {
              if(allRecipes.length < 1) {
                  req.flash("error", "No recipes match that query, please try again.");
				  return res.redirect("back");
						
              }
			  
              res.render("recipes/index",{recipes:allRecipes});
           }
        });
    } else {	
	Recipe.find({isOnline: true} , function(err, allRecipes){
				  if(err){
		console.log(err);}else {
					res.render("recipes/index", {recipes:allRecipes});
}
								  });
	} 
		   }	
	
});
// router.post("/", middleware.isLoggedIn,  function(req, res){
// 	var name = req.body.name;
// 	var price = req.body.price;
// 	var image = req.body.image;
// 	var desc= req.body.description;
// 	var author = {
// 		id:req.user._id,
// 		username: req.user.username
// 	}
// 	var newrecipe = {name: name, image: image, description: desc, author:author}
// 	recipe.create(newrecipe, function(err, newlyCreated){
// 					  if(err){
// 						  console.log(newrecipe);
// 		console.log(err);
// 	} else {
// 		res.render("/recipes");
// 		}
//
// 					  });
// });
// create add a new recipe

//Show Route shows more info about recipes
router.get("/:id", function(req, res){
	Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
		if(err){
			console.log(err);
			} else {
				//console.log(foundrecipe);
				res.render("recipes/show2", {recipe: foundRecipe});
			}
	});
	});
//EDIT
router.get("/:id/edit", middleware.checkRecipeOwnership, function(req, res){	
		Recipe.findById(req.params.id, function(err, foundRecipe){
			res.render("recipes/edit", {recipe:foundRecipe});
			});
	});

//UPDATE 
router.put("/:id", middleware.checkRecipeOwnership, function(req, res){
	//find and update the correct recipes
	Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedRecipe){
		if(err){
			res.redirect("/recipe")
		} else {
			res.redirect("/recipes/" + req.params.id)
		}
	})
})
// //recipe delete
// router.delete("/:id",async(req, res) => {
//   try {
//     let foundrecipe = await recipe.findById(req.params.id);
//     await foundrecipe.remove();
//     res.redirect("/recipes");
//   } catch (error) {
// //     console.log(error.message);
// //     res.redirect("/recipes");
//   }
// });
// //Destroy recipes
router.delete("/:id", middleware.checkRecipeOwnership, function(req, res){
	Recipe.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/recipes")
		} else {
			req.flash("success", "recipe deleted")
			res.redirect("/recipes")
		}
	});
});
//POST METHOD Zutat

//POST METHOD


// function newElement() {
// 	var zutat = document.createElement('li'); 
// 	zutat.innerText = document.getElementById("menge").value +" "+ document.getElementById("einheit").value + " "+ document.getElementById("name").value; 
// 	document.getElementById("zutaten").appendChild(zutat)
// 	const newzutat = {
// 		name: document.querySelector('#name').value,
// 		menge: document.querySelector('#menge').value,
// 		einheit: document.querySelector('#einheit').value
// 	}
// 	Zutaten.push(newzutat)
// }


router.post("/",middleware.isLoggedIn, function(req, res,){
		
	let zutaten =[];
	var title = req.body.title;
	var shortdescription =req.body.shortdescription
	for (let i= 0; i<req.body.name.length; i++){
		let zutat = {	
					name: req.body.name[i],
				 	menge: req.body.menge[i],
					einheit: req.body.einheit[i]
	}
		zutaten.push(zutat)
		};
	var image = req.body.image;
	var dauer = req.body.dauer
	var schritte= req.body.schritte
	var kategorie = req.body.kategorie;
	var schwierigkeit = req.body.schwierigkeit;
	var aktivearbeitszeit =req.body.aktivearbeitszeit
	var kennzeichen= {
		
		vegetarisch: Boolean(req. body.vegetarisch),
		vegan: Boolean(req.body.vegan)
			};
	var isOnline = Boolean(req.body.isOnline)
	var author = {
		id:req.user._id,
		username: req.user.username
	};
	var newRecipe = {title: title, zutaten:zutaten, image: image, author:author, dauer:dauer, schritte:schritte, kategorie:kategorie, kennzeichen:kennzeichen, shortdescription:shortdescription, schwierigkeit: schwierigkeit, aktivearbeitszeit: aktivearbeitszeit, isOnline:isOnline}
	Recipe.create(newRecipe, function(err, newlyCreated){
					  if(err){
						 
		console.log(err);
						  
	} else {
		res.redirect("/recipes");
		console.log(newRecipe)
		}

					  });
});

//middleware

	// } else {
	// 	res.send("You need to be logged in")
	// }
	
	// };
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
//Rangebar Zeitaufwand Display


module.exports = router;