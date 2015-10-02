var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
	created: Date,
	username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	body: String,
	images: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
	newsletter: {type: mongoose.Schema.Types.ObjectId, ref: 'League'}
});

mongoose.model('Comments', CommentsSchema);