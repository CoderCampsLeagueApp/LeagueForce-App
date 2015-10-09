 var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
	name: String,
	images: Array, //or bson
	logo: String, //or bson
	teamMembers: [{
		name: String,
		teamNumber: Number,
 		position: String,
 		pic: String,
 		dob: Date,  //date of birth
 		bio: String,
 		isCoach: Boolean,
 		isSubCoach: Boolean,
 		isPlayer: Boolean,
		Images: Array, //Bson or imgurl. posted by either the admin, coach, player.
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  //incase the player signs up
	stats: {
		display: Boolean,  //if the admin wants to display stats
		games: Number,     //goals/game = goals per game.
		goals: Number,
	}
	}],
	league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
	matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Week'}],
		// sponsors: Array  -- excess
	
	score: {   //getting the team rank by comparing win/losses ratio to all teams.
		wins: Number,
		losses: Number,
		ties: Number
	}
});

mongoose.model('Team', TeamSchema);