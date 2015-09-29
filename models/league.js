var mongoose = require('mongoose')

var LeagueSchema = new mongoose.Schema({
	division: String,  //U5-U19
	name: String, //league name
	about: String, //description about the league
	features: Array, //list of features the leahue offers.
	images: Array, //bson or img url.
	teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
	matches: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
	admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} //Admin
});

mongoose.model('League', LeagueSchema);