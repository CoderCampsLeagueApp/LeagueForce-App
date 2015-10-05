var mongoose = require('mongoose')

var LeagueSchema = new mongoose.Schema({
	division: String,  //U5-U19
	name: String, //league name
	description: String, //description about the league
	features: Array, //list of features the leahue offers.
	logo: String, //bson or img url.
	images: Array, //bson or img url.
	teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
	recentMatches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}],
	newsletter: [{
		body: String,
		title: String,
		created: Date,
		image: String,
		comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comments"}],
		username: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
	}],
	matches: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
	admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},//Admin
	isDisplay: Boolean
});

mongoose.model('League', LeagueSchema);