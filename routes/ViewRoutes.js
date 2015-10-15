var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var League = mongoose.model('League');
var Team = mongoose.model('Team');
var User = mongoose.model('User') ;
var jwt = require('express-jwt');

router.get('/league', function(req, res) {
	League.find({})
	.populate({
		path: 'admin',
		model: 'User',
		select: 'name username'
	})
	.exec(function(err, league) {
		if(err) return res.status(500).send({err: "Error getting all leagues"});
		if(!league) return res.status(400).send({err: "Leagues do not exist"});
		res.send(league);
	});
});

router.get('/league/:id', function(req, res) {
	var leagueId = req.params.id;
	League.findOne({_id: leagueId})
	.populate({
		path: 'teams',
		model: 'Team',
		select: 'name logo'
	})
	.exec(function(err, league){
		if(err) return res.status(500).send({err: "Error inside the server"});
		if(!league) return res.status(400).send({err: "That league does not exist"});
		res.send(league);
	});
});

router.get('/team/:id', function(req, res) {
	Team.findOne({_id: req.params.id})
	.populate('matches')
	.exec(function(err, team) {
		console.log(team);
		if(err) return res.status(500).send({err: 'Error inside server for finding a team'});
		if(!team) return res.status(400).send({err: "That team does not exist!"});
		res.send(team);
	})
})


module.exports = router;