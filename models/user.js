var mongoose =require("mongoose");
var passportLocalMongoose =require("passport-local-mongoose");

var UserSchema =new mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
	username: String,
	email: String,
	password: String,
	avatar: String,
	firstName: String,
	lastName: String,
	isAdmin: {type: Boolean, default: false},
	friend: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String},
	allergene: {
		a_nr: String,
		a_name: String,
	},
	bio: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("User", UserSchema);