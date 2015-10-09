 var mongoose = require('mongoose')

 var WeekSchema = new mongoose.Schema({
 	League: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
 	team1: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
 	team2: {type: mongoose.Schema.Types.ObjectId, ref: 'team'},
 	date: Date
	// location: {latitude & longitude} //google maps
});

 mongoose.model('Week', WeekSchema);