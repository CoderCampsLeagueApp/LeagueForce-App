var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var League = mongoose.model('League');
var Team = mongoose.model('Team');
var jwt = require('express-jwt');

var auth = jwt({
	userProperty: 'payload',
	secret: '_secret_sauce'
});



//------------Params----------------------
// router.param('id', function(req, res, next, id) {
// 	req._id = id;
// 	League.findOne({admin: id})
// 	.exec(function(err, league) {
// 		if(err) return res.status(500).send({err: "Error inside the server"});
// 		if(!league) return res.status(400).send({err: "That league does not exist"});
// 		req.league = league;
// 		next();
// 	});  
// });

//------------Getting a League------------
router.get('/:id', function(req, res) {
	League.findOne({admin: req.params.id})
	.exec(function(err, league){
		if(err) return res.status(500).send({err: "Error inside the server"});
		if(!league) return res.status(400).send({err: "That league does not exist"});
		res.send(league);
	})
	
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

router.post('/', auth, function(req, res) {
	var league = new League(req.body);
	league.admin = req.payload.id;
	console.log(league);

	league.save(function(err, league) {
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!league) return res.status(400).send({err: "Could not create a league"});
		res.send();
	});
});

//------------Editing a League------------
router.put('/:id', function(req, res) {
	console.log(req.body);
	League.update({_id: req.body._id}, req.body)
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

//----------TEAM!!--------------------

router.post('/team', function(req, res) {
	var team = new Team(req.body);

	team.save(function(err, result) {
		console.log(result);
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!result) return res.status(400).send({err: "Could not create a league"}); 
		
		League.update({_id: team.league}, {$push: {teams: result._id}} , function(err, result){ console.log('hi');res.send()} );
});
});




module.exports = router;