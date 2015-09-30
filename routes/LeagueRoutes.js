var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var League = mongoose.model('League');
var jwt = require('express-jwt');

// var LeagueSchema = new mongoose.Schema({
// 	division: String,  //U5-U19
// 	name: String, //league name
// 	about: String, //description about the league
// 	features: Array, //list of features the leahue offers.
// 	images: Array, //bson or img url.
// 	teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
// 	matches: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
// 	admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} //Admin
// });

//add teams as array on league, can populate

var auth = jwt({
	userProperty: 'payload',
	secret: 'secretsauce'
});

//------------Params----------------------
router.param('id', function(req, res, next, id) {
	req._id = id;
	League.findOne({_id: id})
	.exec(function(err, league) {
		if(err) return res.status(500).send({err: "Error inside the server"});
		if(!league) return res.status(400).send({err: "That league does not exist"});
		req.league = league;
		next();
	});
});

//------------Getting a League------------
router.get('/:id', function(req, res) {
	League.findOne({_id: req._id})
	.populate(
		path: 'teams',
		model: 'Team',
		select: 'logo name'
		)
	res.send(req.league)
});

router.get('/', function(req, res) {
	League.find({})
	.exec(function(err, league) {
		if(err) return res.status(500).send({err: "Error getting all leagues"});
		if(!league) return res.status(400).send({err: "Leagues do not exist"});
		res.send(league);
	});
});

//------------Creating a League-----------
//add auth later
router.post('/', function(req, res) {
	var league = new League(req.body);
	league.save(function(err, league) {
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!league) return res.status(400).send({err: "Could not create a league"});
		res.send();
	});
});

//------------Editing a League------------
router.put('/:id', function(req, res) {
	League.update({_id: req._id}, req.body)
	.exec(function(err, league) {
		if(err) return res.status(500).send({err: "Error getting league to edit"});
		if(!league) return res.status(400).send({err: "League to edit does not exist"});
		res.send(league);
	});
});

//------------Deleting a League-----------
router.delete('/:id', function(req, res) {
	League.remove({_id: req._id})
	.exec(function(err, league) {
		if(err) return res.status(500).send({err: "Error with deleting the league"});
		if(!league) return res.status(400).send({err: "League does not exist"});
		res.send();
	});
});



module.exports = router;