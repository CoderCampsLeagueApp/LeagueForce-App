var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('Newsletter');
var League = mongoose.model('League');
var passport = require('passport');
var jwt = require('express-jwt');

//News is a property of League

var auth = jwt({
	userProperty: 'payload',
	secret: '_secret_sauce'
});

//-----------------Post News-------------------
router.post('/', auth, function(req, res) {
	var news = new News(req.body);
	news.user = req.payload.id;
	console.log(news);
	news.save(function(err, newsResult) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!newsResult) return res.status(400).send({err: "Could not post news"});
		res.send();
	});
});

//---------------------Getting News------------------
router.get('/', function(req, res) {
	News.find({})
	.populate({
		path: 'user', 
		model: 'User',
		select: "username name pic"
	})
	.exec(function(err, news) {
		if(err) return res.status(500).send({err: "error getting all news"});
		if(!news) return res.status(400).send({err: "news do not exist"});
		res.send(news);
	});
});

var newsId = "";

router.get('/:id', function(req,res){
	var newsId = req.params.id;
	News.findOne({_id: newsId})
	.populate({
		path: 'user',
		model: 'User',
		select : 'username name pic'
	})
	.populate({
		path: 'comments',
		model: 'Comments',
		select: 'reply user news body created'
	})
	.exec(function(err, result){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Could not get the newsletter."});
		res.send(result);
	});
});


//edit News
router.put('/:id', function(req, res) {
	News.update({_id: req.body._id}, req.body)
	.exec(function(err, news) {
		if(err) return res.status(500).send({err: "error getting news to edit"});
		if(!news) return res.status(400).send({err: "News to edit don't exist"});
		res.send(news);
	});
});



//delete a News
router.delete('/:id', function(req, res) {
	News.remove({_id: req.params.id})
	.exec(function(err, news) {
		console.log(err);
		if(err) return res.status(500).send({err: "Error with deleting the posts"});
		if(!news) return res.status(400).send({err: "News does not exist!"});
		res.send();
	});
});

module.exports = router;