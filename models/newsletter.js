var mongoose = require('mongoose');

var NewsletterSchema = new mongoose.Schema({
	body: String,
	title: String,
	created: Date,
	image: String,
	isPublished: Boolean,
	hasImage: Boolean,
	leagueName: {type: mongoose.Schema.Types.ObjectId, ref: "League"},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comments"}],
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

mongoose.model('Newsletter', NewsletterSchema);