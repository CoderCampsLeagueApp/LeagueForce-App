 var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
	Coach: String,
	name: String,
	images: String, //or bson
	players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
	league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
	matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}],
	tournaments: [{type: mongoose.Schema.Types.ObjectId, ref: 'League'}],
	// sponsors: Array  -- excess
	score: {   //getting the team rank by comparing win/losses ratio to all teams.
		wins: Number,
		losses: Number,
		ties: Number
	}
});

mongoose.model('Team', TeamSchema);