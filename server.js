var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer') ;
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var passport = require('passport') ;

require('./models/User');
require('./models/Inbox');
require('./models/League');
require('./models/Team');
require('./models/Comments');
require('./models/Newsletter');
require('./config/passport') ;

mongoose.connect('mongodb://localhost/league');

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(passport.initialize());
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var userRoutes = require('./routes/UserRoutes');
var inboxRoutes = require('./routes/InboxRoutes');
var leagueRoutes = require('./routes/LeagueRoutes');
var teamRoutes = require('./routes/TeamRoutes');
var commentRoutes = require('./routes/CommentRoutes');
var newsletterRoutes = require('./routes/NewsletterRoutes');

// Configure SMTP server details.
// SMTP is the mail server responsible for sending and retrieving email

var smtpTransport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "leagueforceapp@gmail.com",
		pass: "leagueforce2015"
	}
}) ;
var rand, mailOptions, host, link ;

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/send',function(req, res) {
	rand = Math.floor((Math.random() * 100) + 54) ;
	host = req.get('host') ;
	link = "http://" + req.get('host') + "/verify?id=" + rand ;
	mailOptions = {
		to : req.query.to,
		subject : "Please confirm your Email account",
		html : "Hello, <br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>" 
	}
	console.log(mailOptions) ;
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if(error) {
			console.log(error) ;
			res.end("error") ;
		} else {
			console.log("Message sent: " + response.message) ;
			res.end("sent") ;
		}
	});
});



app.get('/verify', function(req, res) {
	console.log(req.protocol + ":/" + req.get('host')) ;
	if((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
		console.log("Domain matched. Information from Authentic email") ;
		if(req.query.id == rand) {
			console.log("Email verified") ;
			res.end("<h1>Email " + mailOptions.to + " has been successfully verified") ;
		} else {
			console.log("Email is not verified") ;
			res.end("<h1>Bad Request</h1>") ;
		}
	} else {
		res.end("<h1>Request is from unknown source</h1>") ;
	}
});



app.use('/api/user', userRoutes);
app.use('/api/inbox', inboxRoutes);
app.use('/api/league', leagueRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/newsletter', newsletterRoutes);

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});