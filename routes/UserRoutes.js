var express = require('express') ;
var router = express.Router() ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;
var jwt = require('jsonwebtoken') ;
var passport = require('passport') ;

router.post('/register', function (req, res) {

	// Set created date
	req.body.created = new Date() ;
	console.log(req.body)
	// Bring in request, and add document from schema
	var user = new User(req.body) ;

	// run model function, which encrypts password
	user.setPassword(req.body.password) ;

	// save user to collection
	user.save(function(err, result) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if(!result) return res.status(400).send({ err: "Server unable to understand request. Maybe request malformed." }) ;

		// Complete post
		res.send() ;
	}) ;
}) ;


router.post('/login', function(req, res, next) { 
	console.log(req.body);
	// calling from passport
	passport.authenticate('local', function(err, user, info){ 
		if(!user) return res.status(400).send(info);

		// generate a token when we find a user in the collection
		res.send({token: user.generateJWT()}); 
	}) (req, res, next);
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


module.exports = router ;