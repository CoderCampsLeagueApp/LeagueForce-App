var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
	created: Date,
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	body: String,
	news: {type: mongoose.Schema.Types.ObjectId, ref: 'Newsletter'},
	reply: [{
		user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
		body: String,
		created: Date
	}]
});

mongoose.model('Comments', CommentsSchema);