var mongoose = require("mongoose")
//Schema Setup


var campgroundSchema = new mongoose.Schema({
	name: String,
	zutaten: {
		name: String,
		einheit: String,
		menge: String,
		kategorie: String,		
	},
	image: String,
	description: String,
	dauer: String,
	kategorie: String,
	naehrwerte:{
		kcal: String,
		kohlenhydrate: String,
		proteine: String,
		fette: String,
		ballaststoffe: String,
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