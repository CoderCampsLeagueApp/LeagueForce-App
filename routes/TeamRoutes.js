var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var jwt = require('express-jwt');

var auth = jwt({
	userProperty: 'payload',
	secret: '_secret_sauce'
});
//test edit
//------------Params----------------------
router.param('id', function(req, res, next, id) {
	req._id = id;
	Team.findOne({_id: id})
	.exec(function(err, team) {
		if(err) return res.status(500).send({err: "Error inside the server"});
		if(!team) return res.status(400).send({err: "That team does not exist"});
		req.team = team;
		next();
	});
});

//------------Getting a Team------------
router.get('/:id', function(req, res) {
	Team.findOne({_id: req._id})
	.populate({
		path: 'players',
		model: 'Player',
		select: 'position name user'
	});
	res.send(req.team)
});

router.get('/', function(req, res) {
	Team.find({})
	.exec(function(err, team) {
		if(err) return res.status(500).send({err: "Error getting all teams"});
		if(!team) return res.status(400).send({err: "Teams do not exist"});
		res.send(team);
	});
});

//------------Creating a Team-----------

router.post('/', auth, function(req, res) {
	var team = new Team(req.body);
	team.save(function(err, team) {
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!team) return res.status(400).send({err: "Could not create a team"});
		res.send();
	});
});

//------------Editing a Team------------
router.put('/:id', function(req, res) {
	Team.update({_id: req._id}, req.body)
	.exec(function(err, team) {
		if(err) return res.status(500).send({err: "Error getting team to edit"});
		if(!team) return res.status(400).send({err: "Team to edit does not exist"});
		res.send(team);
	});
});

//------------Deleting a Team-----------
router.delete('/:id', function(req, res) {
	Team.remove({_id: req._id})
	.exec(function(err, team) {
		if(err) return res.status(500).send({err: "Error with deleting the team"});
		if(!team) return res.status(400).send({err: "Team does not exist"});
		res.send();
	});
});


module.exports = router;