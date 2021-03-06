(function() {
	'use strict';
	angular.module('app')
	.factory('AdminFactory', AdminFactory);

	AdminFactory.$inject = ['$http', '$q'];

	function AdminFactory($http, $q) {
		var o = {};

		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};

		o.createLeague = function(league){
			var q = $q.defer();
			$http.post('/api/league/l/', league, getAuth()).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};
		o.getLeague = function(id) {
			var q = $q.defer();
			$http.get('/api/league/' + id, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}
		o.getLeagues = function() {
			var q = $q.defer();
			$http.get('/api/league/', getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.editLeague = function(league) {
			var q = $q.defer();
			$http.put('/api/league/' + league._id, league, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		//---------------------team--------------------------
		o.createTeam = function(team){
			var q = $q.defer();
			$http.post('/api/league/team', team, getAuth()).success(function(res) {
				q.resolve();
			});
			return q.promise;
		};

		o.editTeam = function(team){
			var q = $q.defer();
			$http.put('/api/league/team/edit', team, getAuth()).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}

		o.deleteTeam = function(team){
			var q = $q.defer();
			var leagueId = {league: team.league };
			$http.put('/api/league/team/delete/' + team._id, leagueId, getAuth()).success(function(res){
				q.resolve();
			});
			return q.promise;
		};

		//-------------------newsletter---------------------
		o.getNewsletters = function() { 
			var q = $q.defer();
			$http.get('/api/newsletter/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getNewsletter = function(id) {
			var q = $q.defer();
			$http.get('/api/newsletter/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.postNewsletter = function(newsletter) {
			var q = $q.defer();
			$http.post('/api/newsletter/', newsletter, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise
		};

		o.editNewsletter = function(newsletter) {
			var q = $q.defer();
			$http.put('/api/newsletter/' + newsletter._id, newsletter).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.deleteNewsletter = function(newsletter) {
			var q = $q.defer();
			$http.delete('/api/newsletter/' + newsletter._id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		//-------------------Weeks---------------------------
		o.getWeek = function(id) {
			var q = $q.defer();
			$http.get('/api/league/week', id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//-------------------Matches-------------------------
		o.getMatches = function(id) {
			var q = $q.defer();
			$http.get('api/league/match', id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		o.createMatch = function(matches, leagueWeek) {
			var q = $q.defer();
			var match = {matches, leagueWeek}
			$http.post('/api/league/match/', match, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise
		} 

		return o;
	}
})();