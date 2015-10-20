// The following is for local login only.

// module.exports = {
// 	'facebookAuth' : {
// 		'clientID': '1505739546402847',
// 		'clientSecret': '2bb564141585751b8b802c88e79e1894',
// 		'callbackURL': 'http://localhost:3000/api/user/auth/facebook/callback'
// 	},

// 	'googleAuth' : {
// 		'clientID': '292506933241-cblnt3jliavfenqn43mlqiop0nsa1s70.apps.googleusercontent.com',
// 		'clientSecret': 'xBlb0_dkARcoksHR_7z69CJC',
// 		'callbackURL': 'http://localhost:3000/api/user/auth/google/callback'
// 	}
// }

// For Heroku deployment.
// module.exports = {
// 	'facebookAuth' : {
// 		'clientID': '1505739546402847',
// 		'clientSecret': '2bb564141585751b8b802c88e79e1894',
// 		'callbackURL': 'https://salty-wave-3423.herokuapp.com/api/user/auth/facebook/callback'
// 	},

// 	'googleAuth' : {
// 		'clientID': '292506933241-cblnt3jliavfenqn43mlqiop0nsa1s70.apps.googleusercontent.com',
// 		'clientSecret': 'xBlb0_dkARcoksHR_7z69CJC',
// 		'callbackURL': 'https://salty-wave-3423.herokuapp.com/api/user/auth/google/callback'
// 	}
// }

//leagueforce.us
module.exports = {
	'facebookAuth' : {
		'clientID': '1505739546402847',
		'clientSecret': '2bb564141585751b8b802c88e79e1894',
		'callbackURL': 'leagueforce.us/api/user/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID': '292506933241-cblnt3jliavfenqn43mlqiop0nsa1s70.apps.googleusercontent.com',
		'clientSecret': 'xBlb0_dkARcoksHR_7z69CJC',
		'callbackURL': 'leagueforce.us/api/user/auth/google/callback'
	}
}