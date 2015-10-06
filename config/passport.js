var passport = require('passport') ;

// Strategy for local database authentication
var LocalStrategy = require('passport-local').Strategy ;

// Strategy for Facebook authentication
var FacebookStrategy = require('passport-facebook') ; 

// Strategy for Google authentication
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;

// For Facebook authorization
var configAuth = require('./auth') ;


passport.serializeUser(function(user, done) {
	done(null, user) ;
}) ;

passport.deserializeUser(function(obj, done) {
	done(null, obj) ;
}) 


passport.use(new LocalStrategy(function(username, password, done) {
	// find the username, which is email, in the model
	User.findOne({username: username})
	.exec(function(err, user) {
		if(err) return done({err: "Server has issues."});
		if(!user) return done({err: "User does not exist"});
		if(!user.checkPassword(password)) return done({err: "Invalid username and password combination."});
		return done(null, user);
	});
}));




passport.use(new FacebookStrategy({
	clientID: configAuth.facebookAuth.clientID,
	clientSecret: configAuth.facebookAuth.clientSecret,
	callbackURL: configAuth.facebookAuth.callbackURL,
	profileFields: ['id', 'name', 'emails', 'photos']
},
function(accessToken, refreshToken, profile, done) {
	// process.nextTick is a Node.js function for asynchronous
	// Waits for data to come back before continuing.
	process.nextTick(function() {
		// Information for accessing our database
		// Whatever is returned will be stored in profile.
		// Returns err if it cannot connect
		User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
			console.log("DEBUG: Contents of profile:") ;
			console.log(profile) ;
			if(err) {
				console.log('DEBUG: Error connecting') ;
				return done(err) ;
			}
			if(user) {
				console.log('DEBUG: Current user') ;
				return done(null, user) ;
			}
			// Else no user is found. We need to create a new user.
			else {
				console.log("DEBUG: New User.") ;
				console.log(profile.id) ;
				
				var newUser = new User() ;
				newUser.facebook.id = profile.id ;
				newUser.facebook.token = accessToken ;

				// According to the Facebook API, the name is in 
				// givenName and familyName
				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName ;

				// Setting name in Schema to name from Facebook
				newUser.name = newUser.facebook.name ;

				// According to Facebook API, emails come back as an array
				// So, need the first element of the array.
				newUser.facebook.email = profile.emails ? profile.emails[0].value : profile.username + "@facebook.com";
				// Setting username to email from Facebook
				newUser.username = newUser.facebook.email ;

				// Photo
				newUser.facebook.photo = profile.photos[0].value ;
				console.log("DEBUG: passport.js profile photo: " + newUser.facebook.photo) ;

				// Created. Stores date created in the database.
				newUser.created = new Date() ;
				
				// Save the newUser to the database.
				newUser.save(function(err) {
					if(err)
						throw err ;
					// Otherwise return done, no error and newUser.
					return done(null, newUser) ;
				})
			}
		}) ;
}) ;
}
)) ;


passport.use(new GoogleStrategy({
	clientID: configAuth.googleAuth.clientID,
	clientSecret: configAuth.googleAuth.clientSecret,
	callbackURL: configAuth.googleAuth.callbackURL
	// profileFields: ['id', 'name', 'emails', 'photos']
},
function(accessToken, refreshToken, profile, done) {
	// process.nextTick is a Node.js function for asynchronous
	// Waits for data to come back before continuing.
	process.nextTick(function() {
		// Information for accessing our database
		// Whatever is returned will be stored in profile.
		// Returns err if it cannot connect
		User.findOne({ 'google.id' : profile.id }, function(err, user) {
			console.log("DEBUG: Contents of profile:") ;
			console.log(profile) ;
			if(err) {
				console.log('DEBUG: Error connecting') ;
				return done(err) ;
			}
			if(user) {
				console.log('DEBUG: Current user') ;
				return done(null, user) ;
			}
			// Else no user is found. We need to create a new user.
			else {
				console.log("DEBUG: New User.") ;
				console.log(profile.id) ;
				
				var newUser = new User() ;
				newUser.google.id = profile.id ;
				newUser.google.token = accessToken ;

				// According to the Google API, the name is in 
				// displayName
				newUser.google.name = profile.displayName ;

				// Setting name in Schema to name from Facebook
				newUser.name = newUser.google.name ;

				// According to Google API, emails come back as an array
				// So, need the first element of the array.
				newUser.google.email = profile.emails ? profile.emails[0].value : profile.username + "@facebook.com";
				// Setting username to email from Facebook
				newUser.username = newUser.google.email ;

				// Photo
				newUser.google.photo = profile.photos[0].value ;
				console.log("DEBUG: passport.js profile photo: " + newUser.facebook.photo) ;

				// Created stores date created in the database.
				newUser.created = new Date() ;
				
				// Save the newUser to the database.
				newUser.save(function(err) {
					if(err)
						throw err ;
					// Otherwise return done, no error and newUser.
					return done(null, newUser) ;
				})
			}
		}) ;
}) ;
}
)) ;




// Following is from Isaiah's example	
// passport.serializeUser(function(user, done) {
// 	done(null, user) ;
// }) ;

// passport.deserializeUser(function(obj, done) {
// 	done(null, obj) ;
// }) ;

// passport.use(new FacebookStrategy({
// 	clientID: "DEBUG: Needs to be filled out",
// 	clientSecret: "DEBUG: Needs to be filled out",
// 	callbackURL: "DEBUG: This URL needs to be filled out",
// 	passReqToCallback: true,
// 	profileFields: ['id', 'name', 'emails', 'photos']
// },
// function(req, accessToken, refreshToken, profile, done) {
// 	User.findOne({ facebookId : profile.id }, function(err, user) {
// 		if(err) return done(err, null) ;
// 		if(user) {
// 			console.log("Current User, Logging In") ;
// 			return done(null, user) ;
// 		} else {
// 			console.log("New User, Registering and Logging In") ;
// 			var userModel = new User() ;
// 			if(profile.emails) {
// 				userModel.username = profile.emails[0].value ;
// 			} else {
// 				userModel.username = profile.username + "@facebook.com" ;
// 			}
// 			userModel.facebookId = profile.id ;
// 			userModel.name = profile.name.givenName + " " + profile.name.familyName ;
// 			userModel.save(function(err, userSaved) {
// 				if(err) {
// 					return err ;
// 				}
// 				return(err, userSaved) ;
// 			})
// 		}
// 	}) ;
// }
// )) ;

