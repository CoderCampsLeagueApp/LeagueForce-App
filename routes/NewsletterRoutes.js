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

//----------------Push User ID into News addedBy property-------
// router.param('newsId', function(req, res, next, id) {
// 	req._id = id;
// 	News.findOne({_id: id})
// 	.populate({ path: "comments"})
// 	.exec(function(err, comments) {
// 		News.populate(comments, {
// 			path: 'username', 
// 			model: 'User',
// 			select: "username images"
// 		}, function (err, news) {
// 			if(err) return res.status(500).send({err: "Error inside the server."});
// 			if(!news) return res.status(400).send({err: "That news does not exist"});
// 			req.News = news;
// 			next();
// 		});

// 	});
// });

//-----------------Post News-------------------
router.post('/', auth, function(req, res) {
	var news = new News(req.body);
	news.username = req.payload.id;
	console.log(news);
	news.save(function(err, newsResult) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!newsResult) return res.status(400).send({err: "Could not post news"});
		res.send();
	});
});

//---------------------Getting News------------------
router.get('/', function(req, res) {
	//console.log(news);
	News.find({})
	.populate({
		path: 'username', 
		model: 'User',
		select: "username name"
	})
	.exec(function(err, news) {
		if(err) return res.status(500).send({err: "error getting all news"});
		if(!news) return res.status(400).send({err: "news do not exist"});
		res.send(news);
	});
});

router.get('/news/:id', function(req, res) {
	res.send(req.News)
});

//edit News
router.put('/:id', function(req, res) {
	News.update({_id: req.body.id}, req.body)
	.exec(function(err, news) {
		if(err) return res.status(500).send({err: "error getting news to edit"});
		if(!news) return res.status(400).send({err: "News to edit aren't existing"});
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