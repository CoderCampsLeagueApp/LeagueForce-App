 var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
	name: String,
	position: String,
	Images: Array, //Bson or imgurl. posted by either the admin, coach, player.
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  //incase the player signs up
	stats: {
		display: Boolean,  //if the admin wants to display stats
		games: Number,     //goals/game = goals per game.
		goals: Number,
	},
	Team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
	League: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
	Schedule: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}]
});

mongoose.model('Player', PlayerSchema);