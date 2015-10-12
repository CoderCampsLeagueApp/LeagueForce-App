var express = require('express') ;
var router = express.Router() ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;
var jwt = require('jsonwebtoken') ;
var passport = require('passport') ;
var cloudinary = require('cloudinary');
var multiparty = require('multiparty');


router.post('/register', function (req, res) {

	// Set created date
	req.body.created = new Date() ;
	// Bring in request, and add document from schema
	var user = new User(req.body) ;

	// run model function, which encrypts password
	user.setPassword(req.body.password) ;

	// save user to collection
	user.save(function(err, result) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if(!result) return res.status(400).send({ err: "Server unable to understand request. Maybe request malformed." });

		// Complete post
		res.send() ;
	}) ;
}) ;


router.post('/login', function(req, res, next) { 
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