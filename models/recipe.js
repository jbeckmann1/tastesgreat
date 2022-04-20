var mongoose = require("mongoose")
//Schema Setup



var recipeSchema = new mongoose.Schema({
	title: String, 
	zutaten: [{
		name: String,
		einheit: String,
		menge: String,
		
	}],
	isOnline:Boolean,
	Sharedwith:[{id:{
				type:mongoose.Schema.Types.ObjectId,
				ref: "User"
		},
		username: String}],
	image: String,
	schritte: Array,
	dauer: String,
	aktivearbeitszeit: String,
	schwierigkeit: String,
	shortdescription: String,
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


module.exports = mongoose.model("Recipe", recipeSchema);