var express = require('express') ;
var router = express.Router() ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;
var jwt = require('jsonwebtoken') ;
var passport = require('passport') ;
var cloudinary = require('cloudinary');
var multiparty = require('multiparty');
var nodemailer = require('nodemailer') ;



router.post('/register', function (req, res) {
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "leagueforceapp@gmail.com",
			pass: "leagueforce2015"
		}
	}) ;
	var rand, mailOptions, host, link ;

	rand = Math.floor((Math.random() * 100) + 54) ;

	// Set created date
	req.body.created = new Date() ;

	console.log(req.body);

	// Bring in request, and add document from schema
	var user = new User(req.body) ;

	// User is not valid until his email is verified.
	user.isValidated = false ;

	user.rand = rand ;

	// run model function, which encrypts password
	user.setPassword(req.body.password) ;

	// save user to collection
	user.save(function(err, result) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if(!result) return res.status(400).send({ err: "Server unable to understand request. Maybe request malformed." });


		// Nodemailer code
		// rand = Math.floor((Math.random() * 100) + 54) ;
		host = req.get('host') ;
		console.log('DEBUG: UserRoutes.js: host: ') ;
		console.log(host) ;
		link = "http://" + req.get('host') + "/api/user/verify?id=" + rand + "&email=" + user.username;
		mailOptions = {
		to : user.username, // req.query.to,
		subject : "Please confirm your Email account",
		// html : 'Hello, <br> Please Click on the link to verify your email.<br><a href="' + link + '">Click here to verify</a>"' 
		html : 'Hello, <br> Please Click on the link to verify your email.<br><a href="' + link + '">Click here to verify</a>' 
	}
	console.log(mailOptions) ;
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if(error) {
			console.log(error) ;
			res.end("error") ;
		} else {
			console.log("Message sent: " + response.message) ;
			res.end("sent") ;
		}
	});
		// Complete post
		// res.send() ;
	}) ;


}) ;

// router.get('/verify', function(req, res) {
// 	console.log(req.protocol + ":/" + req.get('host')) ;
// 	if((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
// 		console.log("Domain matched. Information from Authentic email") ;
// 		// get rand from the database
// 		if(req.query.id == rand) {
// 			console.log("Email verified") ;
// 			res.end("<h1>Email " + mailOptions.to + " has been successfully verified") ;
// 		} else {
// 			console.log("Email is not verified") ;
// 			res.end("<h1>Bad Request</h1>") ;
// 		}
// 	} else {
// 		res.end("<h1>Request is from unknown source</h1>") ;
// 	}
// });

router.get('/verify', function(req, res) {
	// Gets rand and email from URL.
	var rand = req.query.id ;
	var email = req.query.email ;
	console.log("DEBUG: UserRoutes.js router.get(verify): id:") ;
	console.log(rand) ;
	console.log("DEBUG: UserRoutes.js router.get(verify): email:") ;
	console.log(email) ;


	// Need to find username on db
	// if rand on username document matches rand,
	// set isValidated on document to true

	User.findOne({ username : email }, function(err, user) {
		if(rand == user.rand) {
			console.log("DEBUG: UserRoutes: router verify: Rand matched.") ;
			// Now need to set isValidated to true.
			user.isValidated = true ;
			console.log("DEBUG: UserRoutes: router verify: " + user.isValidated) ;


			User.update({ _id : user.id }, user)
			.exec(function(err, user) {
				if(err) return res.status(500).send({ err: "error getting user to edit" }) ;
				if(!user) return res.status(400).send({ err: "user profile doesn't exist" }) ;
				res.send('You have been validated. Please login <a href="http://localhost:3000">here</a>') ; 
			}) ;
		} else {
			res.send("Cannot verify. Token did not match.") ;
		}
	}) ;
}) ;


// Login router
router.post('/login', function(req, res, next) { 

	console.log("DEBUG: UserRoutes: router.post login: req.body: ") ;
	console.log(req.body);
	console.log("Username from req.body: " + req.body.username) ;
	var email = req.body.username ;

	var isUserValidated ;

	// Check if user has been validated.
	User.findOne({ username : email }, function(err, user) {
		console.log("DEBUG: UserRoutes: router.post /login: user from User.findOne(): ") ;
		console.log(user) ;
		if(!user.isValidated) {
			isUserValidated = false ;
			return res.send("Please confirm email to continue") ;

		}
		loginUser() ;
	}) ;

	function loginUser() {	


	// calling from passport
	passport.authenticate('local', function(err, user, info) { 
		if(!user) return res.status(400).send(info);

		// generate a token when we find a user in the collection
		res.send({ token: user.generateJWT() }); 
	}) (req, res, next);
}
});


// Getting an individual user
router.param('id', function(req, res, next, id) {
	User.findOne({
		_id : id
	}, function(err, user) {
		if(err) return next({
			err : err,
			type : 'client'
		}) ;
			req.user = user ;
			next() ;
		}) ;
}) ;


// Get /users
router.get('/', function(req, res) {
	var users = res ;
	User.find({})
	.exec(function(err, users) {
		if(err) return res.status(500).send({ err: "Error inside the server" }) ;
		if(!users) return res.status(400).send({ err: "Users aren't here." }) ;
		res.send(users) ;
	}) ;
}) ;


// Get user
router.get('/:id', function(req, res) {
	res.send(req.user) ;
}) ;


// Following is from Isaiah's app
// May need it for generating JWT token
// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'], display: 'touch' })) ;


// router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: "/#/" }), function(req, res) {
// 	if(req.user) {
// 		var token = { token : req.user.generateJWT() } ;
// 		res.redirect('/#/auth/token' + token.token) ;
// 	} else {
// 		res.send("you are not authenticated") ;
// 	}
// })

// From http://passportjs.org/docs/facebook
// Facebook authentication URL will be: 
// /api/user/auth/facebook
// Callback url: http://localhost:3000/api/user/auth/facebook/callback
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

router.get('/auth/facebook',
	passport.authenticate('facebook', { scope: ['email']})) ;

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

// DEBUG: This router works
// router.get('/auth/facebook/callback', 
// 	passport.authenticate('facebook', { failureRedirect: '/login' }),
// 	function(req, res) {
// 		res.redirect('/');
// 	});

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	function(req, res) {
		if(req.user) {
			console.log("DEBUG: router callback called.  generating token...") ;
			var token = { token : req.user.generateJWT() }
			res.redirect("/#/auth/token/" + token.token) ;
		} else {
			res.send("You are not authenticated") ;
		}
	}) ;


// For Google Authentication
router.get('/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email']})) ;

// Google callback
router.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function(req, res) {
		if(req.user) {
			console.log("DEBUG: router callback called.  generating token...") ;
			var token = { token : req.user.generateJWT() }
			res.redirect("/#/auth/token/" + token.token) ;
		} else {
			res.send("You are not authenticated") ;
		}
	}) ;


router.put('/:id', function(req, res) {
	var userProfile = req.body ;
	User.update({ _id: req.body._id }, userProfile)
	.exec(function(err, user) {
		if(err) return res.status(500).send({ err: "error getting user to edit" }) ;
		if(!user) return res.status(400).send({ err: "user profile doesn't exist" }) ;
		res.send(user) ;
	}) ;
}) ;

router.get('/profile/:id', function(req, res){
	User.findOne({_id: req.params.id})
	.exec(function(err, user) {
		console.log('user');
		if(err) return res.status(500).send({ err: "error getting user to edit" }) ;
		if(!user) return res.status(400).send({ err: "user profile doesn't exist" }) ;
		res.send(user) ;
	}) ;
})



//--------Cloudinary-------------
cloudinary.config({
  cloud_name: 'josemedina760',
  api_key: '276662693546377',
  api_secret: 'A7GxUka_ZvG2NHNFU54GcDcO_Rw'
});


router.post('/profilePicUpload', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, data, fileObject){
  	
    cloudinary.uploader.upload(fileObject.file[0].path, function(picInfo){
      console.log(picInfo.url);
      User.update({_id: data.userId[0]}, {pic: picInfo.url})
      .exec(function(err, user){
        if(err) return res.status(500).send({err:"Server Issues"});
        if(!user) return res.status(500).send({err:"Could not find the users"});
        res.send(picInfo.url);
      });
    });
  });
});



module.exports = router ;