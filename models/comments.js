var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
	created: Date,
	username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	body: String,
	images: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
	news: {type: mongoose.Schema.Types.ObjectId, ref: 'News'}
});

mongoose.model('Comments', CommentsSchema);