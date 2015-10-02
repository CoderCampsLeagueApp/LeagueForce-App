var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var jwt = require('express-jwt'); 

var auth = jwt({
	userProperty: 'payload',
	secret: '_secret_sauce'
});
//test edit
//------------Params----------------------
router.param('id', function(req, res, next, id) {
	req._id = id;
	Player.findOne({_id: id})
	.exec(function(err, player) {
		if(err) return res.status(500).send({err: "Error inside the server"});
		if(!player) return res.status(400).send({err: "That player does not exist"});
		req.player = player;
		next();
	});
});

//------------Getting a Player------------
router.get('/:id', function(req, res) {
	res.send(req.player);
});

router.get('/', function(req, res) {
	Player.find({})
	.exec(function(err, player) {
		if(err) return res.status(500).send({err: "Error getting all players"});
		if(!player) return res.status(400).send({err: "Players do not exist"});
		res.send(player);
	});
});

//------------Creating a Player-----------

router.post('/', auth, function(req, res) {
	var player = new Player(req.body);
	player.save(function(err, player) {
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!player) return res.status(400).send({err: "Could not create a player"});
		res.send();
	});
});

//------------Editing a Player------------
router.put('/:id', function(req, res) {
	Player.update({_id: req._id}, req.body)
	.exec(function(err, player) {
		if(err) return res.status(500).send({err: "Error getting player to edit"});
		if(!player) return res.status(400).send({err: "Player to edit does not exist"});
		res.send(player);
	});
});

//------------Deleting a Player-----------
router.delete('/:id', function(req, res) {
	Player.remove({_id: req._id})
	.exec(function(err, player) {
		if(err) return res.status(500).send({err: "Error with deleting the player"});
		if(!player) return res.status(400).send({err: "Player does not exist"});
		res.send();
	});
});


module.exports = router;