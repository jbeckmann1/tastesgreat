var express = require("express"),
app = express(),
bodyParser =require("body-parser"),
mongoose = require('mongoose'),
	flash =require("connect-flash"),
passport =require("passport"),
LocalStrategy =require("passport-local"),
	methodOverride = require("method-override"),

Campground =require("./models/campground"),
Comment =require("./models/comment"),
User= require("./models/user")
// seedDB =require("./seeds")

var commentRoutes =require("./routes/comments"),
	campgroundRoutes =require("./routes/campgrounds"),
	indexRoutes =require("./routes/index")
app.use(flash());
//seedDB();
//Passport Configuration
app.use(require("express-session")({
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

mongoose.connect('mongodb://localhost/yelp_campv12', {
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