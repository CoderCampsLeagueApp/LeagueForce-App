(function() {
	'use strict';
	angular.module('app')
	.factory('LeagueFactory', LeagueFactory);

	LeagueFactory.$inject = ['$http', '$q'];

	function LeagueFactory($http, $q) {
		var o = {};

		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};
		

		//-----------League CRUD-------------------------------
		o.createLeague = function(league) {
			var q = $q.defer();
			$http.post('api/league/', league, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getLeagues = function() {
			var q = $q.defer();
			$http.get('/api/league/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getLeague = function(id) {
			var q = $q.defer();
			$http.get('/api/league/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		o.editLeague = function(oldLeague, league) {
			var q = $q.defer();
			$http.put('/api/league/' + oldLeague._id, league).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.deleteLeague = function(league) {
			var q = $q.defer();
			console.log(league);
			$http.delete('/api/league/' + league).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};


		//-----------Player CRUD-------------------------------
		o.createPlayer = function(player) {
			var q = $q.defer();
			$http.post('api/player/', player, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getPlayers = function() {
			var q = $q.defer();
			$http.get('/api/player/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getPlayer = function(id) {
			var q = $q.defer();
			$http.get('/api/player/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		o.editPlayer = function(oldPlayer, player) {
			var q = $q.defer();
			$http.put('/api/player/' + oldPlayer._id, player).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.deletePlayer = function(player) {
			var q = $q.defer();
			$http.delete('/api/player/' + player).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//-----------Team CRUD-------------------------------
		o.createTeam = function(team) {
			var q = $q.defer();
			$http.post('api/team/', team, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getTeams = function() {
			var q = $q.defer();
			$http.get('/api/team/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getTeam = function(id) {
			var q = $q.defer();
			$http.get('/api/team/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		o.editTeam = function(oldTeam, team) {
			var q = $q.defer();
			$http.put('/api/team/' + oldTeam._id, team).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.deleteTeam = function(team) {
			var q = $q.defer();
			$http.delete('/api/team/' + team).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};


		return o;
	}
})();