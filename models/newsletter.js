var mongoose = require('mongoose');

var NewsletterSchema = new mongoose.Schema({
	body: String,
	title: String,
	created: Date,
	image: String,
	leagueName: {type: mongoose.Schema.Types.ObjectId, ref: "League"},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comments"}],
	username: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

mongoose.model('Newsletter', NewsletterSchema);