var mongoose = require("mongoose")
//Schema Setup



var campgroundSchema = new mongoose.Schema({
	name: String, 
	zutaten: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "Zutat"
		},
		name: String,
		einheit: String,
		menge: String,
		kategorie: String,		
	},
	image: String,
	description: {
		schritt_1: String,
		schritt_2: String,
		schritt_3: String,
		schritt_4: String,
		schritt_5: String,
		schritt_6: String,
	},
	dauer: String,
	kategorie: String,
	nährwerte: {
		kcal: String,
		kohlenhydrate: String,
		proteine: String,
		fette: String,
		ballaststoffe: String,
		},
	kennzeichen:{
		koscher: Boolean,
		halal: Boolean,
		vegetarisch: Boolean,
		vegan: Boolean,
	},
		author: {
			id:{
				type:mongoose.Schema.Types.ObjectId,
				ref: "User"
		},
		username: String
	},
	comments: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}
	]
});


module.exports = mongoose.model("Campground", campgroundSchema);