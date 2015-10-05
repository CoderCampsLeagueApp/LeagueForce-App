var mongoose = require('mongoose') ;
var crypto = require('crypto') ;
var jwt = require('jsonwebtoken') ;



var UserSchema = new mongoose.Schema({
	name: {type:String, lowercase:true, unique:true},
	username: {type:String, lowercase:true, unique:true},
	images: Array, //array of images either bson or img url.
	bio: String,
	passwordHash: String,
	salt: String,
	created: String, //date user created.
	leagueSubscribed: [{type: mongoose.Schema.Types.ObjectId, ref: 'League'}],
	teamSubscribed: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
	Comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}],
	inbox: [{type: mongoose.Schema.Types.ObjectId, ref: 'Inbox'}],
	admin: Boolean, //check the server -- midleware.
	league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'} //admin
});

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 36500);
	return jwt.sign({
		id : this._id,
		username : this.username,
		exp: exp.getTime() / 1000
	}, "_secret_sauce");
}

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(64).toString('hex');
	this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

UserSchema.methods.checkPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return hash === this.passwordHash;
};


mongoose.model('User', UserSchema) ;