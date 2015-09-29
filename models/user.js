var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	name: {type:String, lowercase:true, unique:true},
	email: {type:String, lowercase:true, unique:true},
	images: Array, //array of images either bson or img url.
	bio: String,
	cell: String,
	passwordHash: String,
	salt: String,
	created: Date, //date user created.
	leagueSubscribed: [{type: mongoose.Schema.Types.ObjectId, ref: 'League'}],
	teamSubscribed: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
	Comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}],
	inbox: [{type: mongoose.Schema.Types.ObjectId, ref: 'Inbox'}],
	admin: Boolean, //check the server -- midleware.
	league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'} //admin
});

mongoose.model('User', UserSchema);

