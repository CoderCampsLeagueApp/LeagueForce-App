var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
	body: String,
	subject: String,
	created: Date,
	image: String,
	comments: {type: mongoose.Schema.Types.ObjectId, ref: "Comments"},
	username: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

mongoose.model('News', NewsSchema);