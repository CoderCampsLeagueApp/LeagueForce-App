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


// For local login
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


// Generates url for Facebook photo of size height x width
function generateFacebookPhotoUrl(id, accessToken, height, width) {
	var picUrl = "https://graph.facebook.com/" ;
	picUrl += id ;
	picUrl += "/picture?width=" ;
	picUrl += width ;
	picUrl += "&height=" ;
	picUrl += height ;
	picUrl += "&access_token=" ;
	picUrl += accessToken ;
	return picUrl ;
}


// For Facebook login
passport.use(new FacebookStrategy({
	clientID: configAuth.facebookAuth.clientID,
	clientSecret: configAuth.facebookAuth.clientSecret,
	callbackURL: configAuth.facebookAuth.callbackURL,
	// profileFields: ['id', 'name', 'emails', 'photos', 'picture.type(large)']
	// Sending picture.type(large).  This returns photo 200x200.
	// Without this, default profile photo is 50x50.
	profileFields: ['id', 'name', 'emails', 'picture.type(large)']
},
function(accessToken, refreshToken, profile, done) {
	// process.nextTick is a Node.js function for asynchronous
	// Waits for data to come back before continuing.
	console.log("DEBUG: passport.js: Contents from profile") ;
	console.log(profile) ;
	process.nextTick(function() {
		// Information for accessing our database
		// Whatever is returned will be stored in profile.
		// Returns err if it cannot connect
		User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
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
				// Photo returned by Facebook is 200x200 because of picture.type(large) 
				// in profileFields above.
				newUser.facebook.photo = profile.photos[0].value ;
				
				// Getting bigger photo URL from Facebook
				// Sending size 300x300.
				newUser.pic = generateFacebookPhotoUrl(profile.id, accessToken, 300, 300) ;

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


// Change Google photo url to url with a bigger picture (size x size).
// Maybe max size 9980
function generateGooglePhotoUrl(photoUrl, size) {
	var img = photoUrl ;
	var index = img.indexOf("50") ;
	var s = img.split("") ;

	s.splice(index, 2) ;
	s = s.join("") ;
	s += size ;
	return s ;
}


// For Google login
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
			// console.log("DEBUG: Contents of profile:") ;
			// console.log(profile) ;
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
				newUser.google.email = profile.emails ? profile.emails[0].value : profile.username + "@google.com";
				// Setting username to email from Facebook
				newUser.username = newUser.google.email ;

				// Photo
				newUser.google.photo = profile.photos[0].value ;

				// Get bigger photo URL from Google. Sending size = 300
				newUser.pic = generateGooglePhotoUrl(newUser.google.photo, 1000) ;
				

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