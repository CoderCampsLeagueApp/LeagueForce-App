var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('Newsletter');
var passport = require('passport');
var jwt = require('express-jwt');
var Comment = mongoose.model('Comments');

var auth = jwt({
	userProperty: 'payload',
	secret: '_secret_sauce'
});

router.post('/', auth, function(req, res) {
	var news = req.body.news;
	var comment = new Comment(req.body);
	comment.created = new Date();
	comment.user = req.payload.id;
	console.log(comment);
	comment.save(function(err, commentResult) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!commentResult) return res.status(400).send({err: "Could not post comment"});
		News.update({_id: news}, {$push: {comments: {_id: commentResult._id}}}, 
			function(err, result) {
				User.update({_id: comment.user}, {$push: {comments: {_id: commentResult._id}}},
					function(err, result) {
						res.send();
					})
			})
	})
});

router.get('/:id', function(req, res) {
	Comment.find({news: req.params.id})
	.populate({
		path: "user reply.user",
		model: "User",
		select: "username name pic images"
	})
	.exec(function(err, comment) {
		if(err) return res.status(500).send({err: "error getting all comments"});
		if(!comment) return res.status(400).send({err: "comments do not exist"});
		res.send(comment);
	});
});


//--------------------------Edit comment------------------------------
router.put('/:id', function(req, res) {
	Comment.update({_id: req.body._id}, req.body)
	.exec(function(err, comment) {
		if(err) return res.status(500).send({err: "error getting comment to edit"});
		if(!comment) return res.status(400).send({err: "comment to edit don't exist"});
		res.send(comment);
	});
});


//------------------------Delete a comment--------------------------
router.put("/delete/:id", auth, function(req, res) {
	var commentId = req.params.id;
	var newsId = req.body.newsId;
	Comment.remove({_id: commentId}, 
		function(err, comment) {
			if(err) return res.status(500).send({err: "Error deleting the comment"});
			if(!comment) return res.status(400).send({err: "Comment does not exist"});
			
			News.findOneAndUpdate({_id: newsId}, {$pull: {comments: commentId}},
				function(err, result) {
					if(err) return res.status(500).send({err: "Issues with the server"});
					if(!result) return res.status(400).send({err: "Could not delete comment from newsletter"}); 
					User.findOneAndUpdate({_id: req.payload.id}, {$pull: {comments: commentId}},
						function(err, result) {
							if(err) return res.status(500).send({err: "Issues with the server"});
							if(!result) return res.status(400).send({err: "Could not delete comment from user"});
							res.send(); 
						});
				});
		});
});

//------------Replies---------------


router.post('/reply', auth, function(req, res) {
	var reply = req.body;
	reply.created = new Date();
	reply.user = req.payload.id;
	console.log(reply);
	Comment.update({_id: reply.comment}, {$push: {reply: reply}})
	.populate({
		path: 'reply.user',
		model: 'User',
		select: 'username name pic images'
	})
	.exec(function(err, result) {
		if(err) return res.status(500).send({err: "Issues with server, re: reply"});
		if(!result) return res.status(400).send({err: "Could not post reply"});
		res.send(reply);
	})
})
module.exports = router;