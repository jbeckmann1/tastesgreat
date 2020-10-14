var mongoose =require("mongoose");
var passportLocalMongoose =require("passport-local-mongoose");

var UserSchema =new mongoose.Schema({
	username: String,
	password: String,
	avatar: String,
	firstName: String,
	lastName: String,
	isAdmin: {type: Boolean, default: false},
	friend: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "Friend"
		},
		username: String},
	allergene: {
		a_nr: String,
		a_name: String,
	},
	profilbeschreibung: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("User", UserSchema);