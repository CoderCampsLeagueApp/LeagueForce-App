var passport = require('passport') ;

// Strategy for local database authentication
var LocalStrategy = require('passport-local').Strategy ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;

// Called from password authenticate in UserRoutes.js
// DEBUG: Need to fix this for email instead of username
// passport.use(new LocalStrategy(function(username, password, done) {

// 	// find the username / email in the model.
// 	User.findOne({ username : username })
// 	.exec(function(err, user) {
// 		if(err) return done({ err: "Server has issues." }) ;
// 		if(!user) return done({ err: "User does not exist" }) ;
// 		if(!user.checkPassword(password)) return done({ err: "Invalid username / email and password combination." }) ;
// 		return done(null, user) ;
// 	}) ;
// })) ;
passport.use(new LocalStrategy(function(username, password, done) {
	// find the username in the model
	User.findOne({username: username})
	.exec(function(err, user) {
		if(err) return done({err: "Server has issues."});
		if(!user) return done({err: "User does not exist"});
		if(!user.checkPassword(password)) return done({err: "Invalid username and password combination."});
		return done(null, user);
	});
}));