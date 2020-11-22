var express = require("express");
var router =express.Router();
var Campground =require("../models/campground");
var middleware =require("../middleware")
const Zutat = require("../models/zutat");
const Zutaten = [];


//NEw show form to create new Campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	
// Zutat.find({}, (err, zutaten) => {
res.render("campgrounds/neu", {Zutaten: Zutaten});

});



//Index Show all campgrounds
router.get("/", function(req, res){
	

    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({title: regex}, function(err, allCampgrounds){
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
	Campground.find({isOnline: true, "author.id": req.user._id} , function(err, allCampgrounds){
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

//Show Route shows more info about campgrounds
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
			} else {
				//console.log(foundCampground);
				res.render("campgrounds/show2", {campground: foundCampground});
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
	var newCampground = {title: title, zutaten:zutaten, image: image, author:author, dauer:dauer, schritte:schritte, kategorie:kategorie, kennzeichen:kennzeichen, shortdescription:shortdescription, schwierigkeit: schwierigkeit, aktivearbeitszeit: aktivearbeitszeit, isOnline:isOnline}
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