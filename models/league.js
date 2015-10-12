var mongoose = require('mongoose')

var LeagueSchema = new mongoose.Schema({
	division: String,  //U5-U19
	name: String, //league name
	description: String, //description about the league
	features: Array, //list of features the leahue offers.
	logo: String, //bson or img url.
	images: Array, //bson or img url.
	teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
	recentMatches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Week'}],
	weeks: [{
		weekNumber: Number,
		matches : [{
			team1: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
			team2: {type: mongoose.Schema.Types.ObjectId, ref: 'team'},
			date: Date,
			team1score: Number,
			team2score: Number
		}],
	}],
	newsletter: [{
		body: String,
		title: String,
		isPublished: Boolean,
		created: Date,
		image: String,
		comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comments"}],
		username: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
	}],
	googleLocation: {
		latitude: String,
		longitude: String
	},
	matches: {type: mongoose.Schema.Types.ObjectId, ref: 'Week'},
	admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},//Admin
	isDisplay: Boolean
});

mongoose.model('League', LeagueSchema);