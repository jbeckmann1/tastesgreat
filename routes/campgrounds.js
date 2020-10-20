var express = require("express");
var router =express.Router();
var Campground =require("../models/campground");
var middleware =require("../middleware")

//NEw show form to create new Campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});


//Index Show all campgrounds
router.get("/", function(req, res){

    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              if(allCampgrounds.length < 1) {
                  req.flash("error", "No campgrounds match that query, please try again.");
				  return res.redirect("back");
						
              }
              res.render("campgrounds/index",{campgrounds:allCampgrounds});
           }
        });
    } else {	
	Campground.find({}, function(err, allCampgrounds){
				  if(err){
		console.log(err);}else {
					res.render("campgrounds/index", {campgrounds:allCampgrounds});
}
								  });
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
// 	var newCampground = {name: name, image: image, description: desc, author:author}
// 	Campground.create(newCampground, function(err, newlyCreated){
// 					  if(err){
// 						  console.log(newCampground);
// 		console.log(err);
// 	} else {
// 		res.render("/campgrounds");
// 		}
//
// 					  });
// });
// create add a new Campground
router.post("/", middleware.isLoggedIn,  function(req, res){
	var name = req.body.name;
	var dauer = req.body.dauer;
	var image = req.body.image;
	var desc= {
		schritt_1: req.body.schritt_1,
		schritt_2: req.body.schritt_2,
		schritt_3: req.body.schritt_3,
		schritt_4: req.body.schritt_4,
		schritt_5: req.body.schritt_5,
		schritt_6: req.body.schritt_6,
		schritt_7: req.body.schritt_7,
	}
	var kategorie = req.body.kategorie;
	var nährwerte= {
		kcal: req.body.kcal,
		kohlenhydrate: req.body.kohlenhydrate,
		proteine: req.body.proteine,
		fette: req.body.fette,
		ballaststoffe: req.body.ballaststoffe,
		}
	var kennzeichen= {
		koscher: Boolean(req.body.koscher),
		halal: Boolean(req.body.halal),
		vegetarisch: Boolean(req. body.vegetarisch),
		vegan: Boolean(req.body.vegan)
			};
	
	var author = {
		id:req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, author:author, dauer:dauer, description:desc, kategorie:kategorie, nährwerte:nährwerte, kennzeichen:kennzeichen}
	Campground.create(newCampground, function(err, newlyCreated){
					  if(err){
						 
		console.log(err);
						   console.log(newCampground)
	} else {
		res.redirect("/campgrounds");
		console.log(newCampground)
		}

					  });
});
//Show Route shows more info about campgrounds
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
			} else {
				//console.log(foundCampground);
				res.render("campgrounds/show", {campground: foundCampground});
			}
	});
	});
//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){	
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground:foundCampground});
			});
	});

//UPDATE 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campgrounds
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campground")
		} else {
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})
// //Campground delete
// router.delete("/:id",async(req, res) => {
//   try {
//     let foundCampground = await Campground.findById(req.params.id);
//     await foundCampground.remove();
//     res.redirect("/campgrounds");
//   } catch (error) {
// //     console.log(error.message);
// //     res.redirect("/campgrounds");
//   }
// });
// //Destroy campgrounds
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds")
		} else {
			req.flash("success", "Campground deleted")
			res.redirect("/campgrounds")
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