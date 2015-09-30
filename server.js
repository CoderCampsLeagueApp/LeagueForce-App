var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var passport = require('passport') ;


require('./models/User');
require('./models/Inbox');
require('./models/League');
require('./models/Team');
require('./models/Player');
require('./models/Schedule');
require('./config/passport') ;

mongoose.connect('mongodb://localhost/league');

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
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
var playerRoutes = require('./routes/PlayerRoutes');
var scheduleRoutes = require('./routes/ScheduleRoutes');

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});


app.use('/api/user', userRoutes);
app.use('/api/inbox', inboxRoutes);
app.use('/api/league', leagueRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/schedule', scheduleRoutes);

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});