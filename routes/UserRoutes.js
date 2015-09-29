var express = require('express') ;
var router = express.Router() ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;
var passport = require('passport') ;

router.post('/register', function (req, res) {

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

// Goes to passport module in config.
// router.post('/login', function(req, res, next) {
// 	console.log(req.body);

// 	// Calling from passport
// 	passport.authenticate('local', function(err, user, info) {
// 		if(!user) return res.status(400).send(info) ;

// 		// generate a token when we find a user in the collection
// 		res.send({ token: user.generateJWT() }) ;
// 	}) (req, res, next) ;
// }) ;
router.post('/login', function(req, res, next) { 
	console.log(req.body);
	// calling from passport
	passport.authenticate('local', function(err, user, info){ 
		if(!user) return res.status(400).send(info);

		// generate a token when we find a user in the collection
		res.send({token: user.generateJWT()}); 
	}) (req, res, next);
});

module.exports = router ;