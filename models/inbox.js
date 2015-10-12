var mongoose = require('mongoose');

var InboxSchema = new mongoose.Schema({
	isdeleted: Boolean,
	user1: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	user2: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	messages: [{
		body: String,
		created: Date,
		sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
	}]
});

mongoose.model('Inbox', InboxSchema);