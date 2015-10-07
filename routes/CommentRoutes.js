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

//---------------Finding a single --------

router.get('/comment/:commentsId', function(req, res) {
	res.send(req.Comment)
});	


router.get('/:id', function(req, res) {
	res.send(req.comment) 
});

//-----------Get Calls--------------

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

router.get('/', function(req, res) {
	Comment.find({})
	.populate({
		path: "user",
		model: "User",
		select: "username name facebook.photo images"
	})
	.exec(function(err, comment) {
		if(err) return res.status(500).send({err: "error getting all comments"});
		if(!comment) return res.status(400).send({err: "comments do not exist"});
		res.send(comment);
	});
});


//---------------edit comment-----------
router.put('/:id', function(req, res) {
	console.log(req.body);
	Comment.update({_id: req.body.id}, req.body)
	.exec(function(err, comment) {
		if(err) return res.status(500).send({err: "error getting comment to edit"});
		if(!comment) return res.status(400).send({err: "Comment to edit doesn't exist"});
		res.send(comment);
	});
});

//delete a comment
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
						})
				})
		})
});

module.exports = router;