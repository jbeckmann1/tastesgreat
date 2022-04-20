//Import MongoDB Atlas url
if (process.env.NODE_ENV !== "production"){
	require('dotenv').config({ path: './.env' })
	
}
const dbUrl = process.env.DB_URL
//import libraries
var express = require("express"),
app = express(),
bodyParser =require("body-parser"),
mongoose = require('mongoose'),
flash =require("connect-flash"),

passport =require("passport"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override"),
//Import mongoose Models
Campground =require("./models/campground"),
Comment =require("./models/comment"),
User= require("./models/user")
//Import Routes
var commentRoutes =require("./routes/comments"),
	campgroundRoutes =require("./routes/campgrounds"),
	indexRoutes =require("./routes/index")
app.use(flash());
const session = require("express-session")
const MongoStore = require('connect-mongo');
const store = new MongoStore({
	mongoUrl: process.env.DB_URL,
	secret:"Beste App du weisst",
	touchAfter: 24 * 60 * 60,
})
store.on("error",function (e) {
	console.log("Session store error")
})
//Passport Configuration
app.use(session({
store,

		secret: "Beste App du weisst",
		resave: false,
		saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
	res.locals.currentUser =req.user;
	res.locals.error =req.flash("error");
	res.locals.success =req.flash("success");
	next();
});
// mongodb://localhost:27017/yelp-camp
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
	console.log("Server startet auf Port 3000")
});