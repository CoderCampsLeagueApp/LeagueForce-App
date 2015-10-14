var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var League = mongoose.model('League');
var Team = mongoose.model('Team');
var User = mongoose.model('User') ;
var jwt = require('express-jwt');


var auth = jwt({
	userProperty: 'payload',
	secret: '_secret_sauce'
});



// Middleware checks if user is admin.
router.use('/', auth, function(req, res, next) {
	User.findOne({
		_id : req.payload.id
	}, function(err, user) {
		req.user = user ;
		if(user.admin) {
			next() ;
		} ;
	}) ;
}) ;



//------------Getting a League------------
router.get('/:id', auth, function(req, res) {
	League.findOne({admin: req.params.id})
	.populate({
		path: 'teams',
		model: 'Team',
		select: 'name'
	})
	.populate({
		path: 'weeks.matches.team1 weeks.matches.team2',
		model: 'Team',
		select: 'name'
	})
	.exec(function(err, league){
		if(err) return res.status(500).send({err: "Error inside the server"});
		if(!league) return res.status(400).send({err: "That league does not exist"});
		res.send(league);
	});
});

router.get('/', auth, function(req, res) {
	League.find({})
	.exec(function(err, league) {
		if(err) return res.status(500).send({err: "Error getting all leagues"});
		if(!league) return res.status(400).send({err: "Leagues do not exist"});
		res.send(league);
	});
});

//------------Creating a League-----------
router.post('/', auth, function(req, res) {
	var league = new League(req.body);
	league.admin = req.payload.id;
	league.isDisplay = false;
	league.save(function(err, league) {
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!league) return res.status(400).send({err: "Could not create a league"});
		console.log(league);
		res.send(league);
	});
});

//------------Editing a League------------
router.put('/:id', auth, function(req, res) {
	console.log(req.body);
	League.update({_id: req.body._id}, req.body)
	.exec(function(err, league) {
		console.log('put---------------------------------------------');
		if(err) return res.status(500).send({err: "Error getting league to edit"});
		if(!league) return res.status(400).send({err: "League to edit does not exist"});
		res.send(req.body);
	});
});

//------------Deleting a League-----------
router.delete('/:id', auth, function(req, res) {
	League.remove({_id: req._id})
	.exec(function(err, league) {
		if(err) return res.status(500).send({err: "Error with deleting the league"});
		if(!league) return res.status(400).send({err: "League does not exist"});
		res.send();
	});
});

//----------TEAM!!--------------------

router.post('/team', auth, function(req, res) {
	var team = new Team(req.body);

	team.save(function(err, result) {
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!result) return res.status(400).send({err: "Could not create a league"}); 
		
		League.update({_id: team.league}, {$push: {teams: {_id: result._id}}} , function(err, result){ console.log('hi');res.send()} );
	});
});

//deletes the team and the ref on teams array
router.put('/team/delete/:id', auth, function(req, res){
	var id = req.params.id;
	var leagueId = req.body.league;
	Team.remove({_id: id})
	.exec(function(err, result){
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!result) return res.status(400).send({err: "Could not remove team"}); 
		League.findOneAndUpdate({_id: leagueId}, {$pull: {teams : id}},
			function(err, result){
				if(err) return res.status(500).send({err: "Issues with the server"});
				if(!result) return res.status(400).send({err: "Could not remove id from league"}); 
				res.send();
			});
	});
});

router.put('/team/edit', auth, function(req, res){
	var team  = req.body;	
	Team.update({_id: team._id}, team)
	.exec(function(err, result){
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!result) return res.status(400).send({err: "Could not remove team"});
		res.send(); 
	})
});

//----------Adding Matches and Weeks---------------
router.post('/match', auth, function(req, res) {
	var x = {};
	var match = req.body;
	var idx = 0;
	League.findOne({_id: match.leagueWeek.leagueId}, function(err, League) { //attempt to find correct week
		if(err) return res.status(500).send({err: "Issues with server for finding league"});
		if(!League) return res.status(400).send({err: "Could not find League"});
		for(var i = 0; i < League.weeks.length; i++) {
			if(League.weeks[i]._id.toString() === match.leagueWeek.weekId) {
				idx = i;
				console.log(i);
			}
		};
		

		var  x = League;
		x.weeks[idx].matches = match.matches;
		
		// for(var i = 0; i < x.weeks.length; i++){
		// 	console.log(x.weeks[i].matches);
		// }
		res.send(x);


	});
});

module.exports = router;